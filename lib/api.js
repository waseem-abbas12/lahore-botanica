// lib/api.js - REST API shared by the local server (server.js) and Vercel (api/[...path].js)
const crypto = require('node:crypto');
const { query, one } = require('./db.js');
const auth = require('./auth.js');

const ORDER_STATUSES = ['Pending', 'Confirmed', 'Dispatched', 'Delivered', 'Cancelled'];
const LEAD_STATUSES = ['New Lead', 'Contacted', 'Site Visit Scheduled', 'Proposal Sent', 'Won', 'In Progress', 'Completed', 'Lost'];
const PROJECT_CATEGORIES = ['residential', 'farmhouse', 'commercial', 'society', 'institutional', 'rooftop', 'maintenance'];
const PAYMENT_METHODS = ['cod', 'bank_transfer', 'jazzcash', 'easypaisa', 'whatsapp'];
const LEAD_SOURCES = ['consultation', 'calculator', 'estimator', 'maintenance', 'institutional', 'membership', 'city_page', 'whatsapp', 'other'];
const PUBLIC_SETTINGS = ['store_name', 'tagline', 'phone', 'whatsapp', 'email', 'address', 'office_hours',
  'stat_years', 'stat_projects', 'stat_acres', 'instagram', 'facebook', 'delivery_fee', 'free_delivery_min'];

class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

// ---------- helpers ----------
function send(res, status, data, headers = {}) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    ...headers
  });
  res.end(JSON.stringify(data));
}

async function readBody(req) {
  // Vercel pre-parses JSON bodies into req.body
  if (req.body !== undefined) {
    if (typeof req.body === 'string') { try { return JSON.parse(req.body || '{}'); } catch { throw new HttpError(400, 'Invalid JSON'); } }
    if (Buffer.isBuffer(req.body)) { try { return JSON.parse(req.body.toString() || '{}'); } catch { throw new HttpError(400, 'Invalid JSON'); } }
    return req.body || {};
  }
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1024 * 1024) { reject(new HttpError(413, 'Payload too large')); req.destroy(); }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try { resolve(JSON.parse(body)); } catch { reject(new HttpError(400, 'Invalid JSON')); }
    });
    req.on('error', reject);
  });
}

function str(v, max = 500) {
  if (v === undefined || v === null) return '';
  return String(v).trim().slice(0, max);
}

function int(v, def = 0, min = 0, max = 100000000) {
  const n = parseInt(v, 10);
  if (Number.isNaN(n)) return def;
  return Math.min(max, Math.max(min, n));
}

// Normalise Pakistani phone numbers to 92XXXXXXXXXX for matching
function normPhone(p) {
  let d = String(p || '').replace(/\D/g, '');
  if (d.startsWith('0092')) d = d.slice(2);
  if (d.startsWith('0') && d.length === 11) d = '92' + d.slice(1);
  if (d.length === 10 && d.startsWith('3')) d = '92' + d;
  return d;
}

function validPhone(p) {
  const d = normPhone(p);
  return d.length >= 10 && d.length <= 15;
}

function clientIp(req) {
  return (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
}

// Simple in-memory rate limit for public write endpoints (per instance)
const hits = new Map();
function rateLimit(req, key, limit, windowMs) {
  const id = `${key}:${clientIp(req)}`;
  const now = Date.now();
  const rec = hits.get(id) || { n: 0, t: now };
  if (now - rec.t > windowMs) { rec.n = 0; rec.t = now; }
  rec.n += 1;
  hits.set(id, rec);
  if (rec.n > limit) throw new HttpError(429, 'Bohat zyada requests. Thori dair baad try karein.');
}

function requireAdmin(req) {
  if (!auth.isAdmin(req)) throw new HttpError(401, 'Admin login required');
}

function parsePlant(r) {
  let images = [], variants = {};
  try { images = JSON.parse(r.images_json || '[]'); } catch {}
  try { variants = JSON.parse(r.variants_json || '{}'); } catch {}
  return { ...r, images, variants };
}

function parseOrder(o) {
  let items = [], history = [];
  try { items = JSON.parse(o.items_json || '[]'); } catch {}
  try { history = JSON.parse(o.history_json || '[]'); } catch {}
  return { ...o, lahore_area: o.city_area, items, history };
}

function parseProject(r) {
  let images = [];
  try { images = JSON.parse(r.images_json || '[]'); } catch {}
  return { ...r, images };
}

function projectInput(data) {
  const title = str(data.title, 150);
  if (!title) throw new HttpError(400, 'Project title zaroori hai');
  let images = data.images;
  if (typeof images === 'string') images = images.split(/[\n,]/);
  images = (Array.isArray(images) ? images : []).map(u => str(u, 1000)).filter(u => /^(https:\/\/|\/)/.test(u)).slice(0, 12);
  const category = PROJECT_CATEGORIES.includes(data.category) ? data.category : 'residential';
  return [title, category, str(data.location, 150), str(data.year, 10), str(data.area, 60), str(data.scope, 300),
    str(data.description, 4000), JSON.stringify(images), data.featured ? 1 : 0,
    data.active === undefined || data.active ? 1 : 0, int(data.sort_order, 0, -1000, 1000)];
}

async function getSettings() {
  const rows = await query('SELECT key, value FROM settings');
  const s = {};
  rows.forEach(r => { s[r.key] = r.value; });
  return s;
}

function plantInput(data) {
  const name = str(data.name, 150);
  const price = int(data.price, -1, 0);
  if (!name || price < 0) throw new HttpError(400, 'Plant name and a valid price are required');
  let images = data.images;
  if (typeof images === 'string') {
    try { images = JSON.parse(images); } catch { images = images.split(/[\n,]/); }
  }
  images = (Array.isArray(images) ? images : []).map(u => str(u, 1000)).filter(Boolean).slice(0, 8);
  let variants = data.variants;
  if (typeof variants === 'string') { try { variants = JSON.parse(variants); } catch { variants = {}; } }
  const cleanList = list => (Array.isArray(list) ? list : []).slice(0, 10).map(v => ({
    name: str(v.name, 120), price_delta: int(v.price_delta, 0, 0)
  })).filter(v => v.name);
  variants = { sizes: cleanList(variants?.sizes), pots: cleanList(variants?.pots) };
  return [
    name, str(data.botanical_name, 150), str(data.urdu_name, 150), str(data.category, 40) || 'indoor',
    price, int(data.stock, 20, 0, 100000), str(data.description, 4000),
    str(data.sunlight, 40) || 'full_sun', str(data.water, 40) || 'moderate', str(data.difficulty, 40) || 'Easy',
    data.pet_friendly ? 1 : 0, data.lahore_hardy === undefined || data.lahore_hardy ? 1 : 0,
    JSON.stringify(images), JSON.stringify(variants), data.featured ? 1 : 0,
    data.active === undefined || data.active ? 1 : 0
  ];
}

function newOrderNumber() {
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  return `LB-${ymd}-${crypto.randomBytes(3).toString('hex').toUpperCase().slice(0, 5)}`;
}

function csvEscape(v) {
  const s = v === null || v === undefined ? '' : v instanceof Date ? v.toISOString().replace('T', ' ').slice(0, 16) : String(v);
  // Prevent spreadsheet formula injection
  const safe = /^[=+\-@]/.test(s) ? `'${s}` : s;
  return `"${safe.replace(/"/g, '""')}"`;
}

function sendCsv(res, filename, rows, columns) {
  const lines = [columns.join(',')].concat(rows.map(r => columns.map(c => csvEscape(r[c])).join(',')));
  res.writeHead(200, {
    'Content-Type': 'text/csv; charset=utf-8',
    'Content-Disposition': `attachment; filename="${filename}"`,
    'Cache-Control': 'no-store'
  });
  res.end('﻿' + lines.join('\n'));
}

// ---------- route handlers ----------
async function route(req, res, url) {
  const p = url.pathname.replace(/\/+$/, '');
  const m = req.method;
  let match;

  // ===== Auth =====
  if (p === '/api/admin/login' && m === 'POST') {
    const ip = clientIp(req);
    if (auth.tooManyAttempts(ip)) throw new HttpError(429, 'Too many failed attempts. 15 minute baad try karein.');
    const { password } = await readBody(req);
    const result = auth.checkPassword(password);
    if (result.disabled) throw new HttpError(503, 'Admin login disabled: set ADMIN_PASSWORD environment variable on the server.');
    if (!result.ok) { auth.recordFailure(ip); throw new HttpError(401, 'Ghalat password'); }
    return send(res, 200, { success: true }, { 'Set-Cookie': auth.sessionCookie(req, auth.createToken()) });
  }
  if (p === '/api/admin/logout' && m === 'POST') {
    return send(res, 200, { success: true }, { 'Set-Cookie': auth.clearCookie() });
  }
  if (p === '/api/admin/me' && m === 'GET') {
    return send(res, 200, { success: true, admin: auth.isAdmin(req) });
  }

  // ===== Health =====
  if (p === '/api/health' && m === 'GET') {
    const db = await require('./db.js').getDb();
    return send(res, 200, { success: true, db: db.kind, durable: db.kind === 'postgres' || !process.env.VERCEL });
  }

  // ===== Plants =====
  if (p === '/api/plants' && m === 'GET') {
    const sp = url.searchParams;
    const showAll = sp.get('all') === '1' && auth.isAdmin(req);
    let sql = 'SELECT * FROM plants WHERE 1=1';
    const params = [];
    const add = (clause, val) => { params.push(val); sql += clause.replace('?', `$${params.length}`); };
    if (!showAll) sql += ' AND active = 1';
    const search = str(sp.get('search'), 100);
    if (search) {
      params.push(`%${search}%`);
      const i = params.length;
      sql += ` AND (name ILIKE $${i} OR botanical_name ILIKE $${i} OR urdu_name ILIKE $${i} OR description ILIKE $${i})`;
    }
    const category = str(sp.get('category'), 40);
    if (category && category !== 'all') add(' AND category = ?', category);
    const sunlight = str(sp.get('sunlight'), 40);
    if (sunlight) add(' AND sunlight = ?', sunlight);
    const water = str(sp.get('water'), 40);
    if (water) add(' AND water = ?', water);
    if (sp.get('pet_friendly') === '1') sql += ' AND pet_friendly = 1';
    const sort = sp.get('sort');
    sql += sort === 'price_asc' ? ' ORDER BY price ASC'
      : sort === 'price_desc' ? ' ORDER BY price DESC'
      : sort === 'newest' ? ' ORDER BY id DESC'
      : ' ORDER BY featured DESC, id ASC';
    const plants = (await query(sql, params)).map(parsePlant);
    return send(res, 200, { success: true, plants, total: plants.length });
  }

  if ((match = p.match(/^\/api\/plants\/(\d+)$/))) {
    const id = int(match[1]);
    if (m === 'GET') {
      const plant = await one('SELECT * FROM plants WHERE id = $1', [id]);
      if (!plant || (!plant.active && !auth.isAdmin(req))) throw new HttpError(404, 'Plant not found');
      return send(res, 200, { success: true, plant: parsePlant(plant) });
    }
    requireAdmin(req);
    if (m === 'PUT') {
      const v = plantInput(await readBody(req));
      const row = await one(
        `UPDATE plants SET name=$1, botanical_name=$2, urdu_name=$3, category=$4, price=$5, stock=$6,
          description=$7, sunlight=$8, water=$9, difficulty=$10, pet_friendly=$11, lahore_hardy=$12,
          images_json=$13, variants_json=$14, featured=$15, active=$16 WHERE id=$17 RETURNING id`,
        [...v, id]
      );
      if (!row) throw new HttpError(404, 'Plant not found');
      return send(res, 200, { success: true, message: 'Plant updated' });
    }
    if (m === 'DELETE') {
      await query('DELETE FROM plants WHERE id = $1', [id]);
      return send(res, 200, { success: true, message: 'Plant deleted' });
    }
  }

  if (p === '/api/plants' && m === 'POST') {
    requireAdmin(req);
    const v = plantInput(await readBody(req));
    const row = await one(
      `INSERT INTO plants (name, botanical_name, urdu_name, category, price, stock, description, sunlight,
        water, difficulty, pet_friendly, lahore_hardy, images_json, variants_json, featured, active)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING id`, v
    );
    return send(res, 201, { success: true, id: row.id, message: 'Plant created' });
  }

  // ===== Projects portfolio =====
  if (p === '/api/projects' && m === 'GET') {
    const all = url.searchParams.get('all') === '1' && auth.isAdmin(req);
    const rows = await query(`SELECT * FROM projects ${all ? '' : 'WHERE active = 1'} ORDER BY featured DESC, sort_order ASC, id DESC`);
    return send(res, 200, { success: true, projects: rows.map(parseProject) });
  }
  if (p === '/api/projects' && m === 'POST') {
    requireAdmin(req);
    const v = projectInput(await readBody(req));
    const row = await one(`INSERT INTO projects (title, category, location, year, area, scope, description, images_json, featured, active, sort_order)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id`, v);
    return send(res, 201, { success: true, id: row.id });
  }
  if ((match = p.match(/^\/api\/projects\/(\d+)$/))) {
    requireAdmin(req);
    const id = int(match[1]);
    if (m === 'PUT') {
      const v = projectInput(await readBody(req));
      const row = await one(`UPDATE projects SET title=$1, category=$2, location=$3, year=$4, area=$5, scope=$6, description=$7,
        images_json=$8, featured=$9, active=$10, sort_order=$11 WHERE id=$12 RETURNING id`, [...v, id]);
      if (!row) throw new HttpError(404, 'Project not found');
      return send(res, 200, { success: true });
    }
    if (m === 'DELETE') {
      await query('DELETE FROM projects WHERE id = $1', [id]);
      return send(res, 200, { success: true });
    }
  }

  // ===== Settings =====
  if (p === '/api/settings' && m === 'GET') {
    const s = await getSettings();
    const pub = {};
    PUBLIC_SETTINGS.forEach(k => { pub[k] = s[k] || ''; });
    return send(res, 200, { success: true, settings: pub });
  }
  if (p === '/api/settings' && m === 'PUT') {
    requireAdmin(req);
    const data = await readBody(req);
    for (const key of PUBLIC_SETTINGS) {
      if (data[key] === undefined) continue;
      let value = str(data[key], 300);
      if (key === 'whatsapp') value = normPhone(value);
      if (key === 'delivery_fee' || key === 'free_delivery_min') value = String(int(value, 0));
      if ((key === 'instagram' || key === 'facebook') && value && !/^https:\/\//i.test(value)) value = '';
      await query('INSERT INTO settings (key, value) VALUES ($1,$2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value', [key, value]);
    }
    return send(res, 200, { success: true, message: 'Settings saved' });
  }

  // ===== Orders =====
  if (p === '/api/orders' && m === 'POST') {
    rateLimit(req, 'order', 10, 10 * 60 * 1000);
    const data = await readBody(req);
    const name = str(data.customer_name, 120);
    const phone = str(data.customer_phone, 30);
    const address = str(data.customer_address, 500);
    if (!name || !validPhone(phone)) throw new HttpError(400, 'Naam aur sahi phone number zaroori hain');
    if (!address) throw new HttpError(400, 'Delivery address zaroori hai');
    if (!Array.isArray(data.items) || data.items.length === 0 || data.items.length > 50) {
      throw new HttpError(400, 'Cart khali hai');
    }
    const payment = PAYMENT_METHODS.includes(data.payment_method) ? data.payment_method : 'cod';

    // Recalculate every price on the server: never trust client prices
    const items = [];
    for (const it of data.items) {
      const plant = await one('SELECT * FROM plants WHERE id = $1 AND active = 1', [int(it.id)]);
      if (!plant) throw new HttpError(400, 'Cart mein aik plant ab available nahi. Cart refresh karein.');
      const { variants } = parsePlant(plant);
      const size = (variants.sizes || []).find(s => s.name === it.size) || (variants.sizes || [])[0];
      const pot = (variants.pots || []).find(s => s.name === it.pot) || (variants.pots || [])[0];
      const qty = int(it.quantity, 1, 1, 100);
      if (plant.stock < qty) throw new HttpError(409, `${plant.name}: sirf ${plant.stock} stock mein hain`);
      const unit = plant.price + (size?.price_delta || 0) + (pot?.price_delta || 0);
      items.push({
        id: plant.id, name: plant.name, urdu_name: plant.urdu_name,
        size: size?.name || 'Standard', pot: pot?.name || 'Standard',
        price: unit, quantity: qty, line_total: unit * qty
      });
    }

    const s = await getSettings();
    const subtotal = items.reduce((sum, i) => sum + i.line_total, 0);
    const deliveryFee = subtotal >= int(s.free_delivery_min, 3500) ? 0 : int(s.delivery_fee, 250);
    const total = subtotal + deliveryFee;
    const history = [{ status: 'Pending', at: new Date().toISOString(), note: 'Order received' }];

    let order = null;
    for (let attempt = 0; attempt < 5 && !order; attempt++) {
      try {
        order = await one(
          `INSERT INTO orders (order_number, customer_name, customer_phone, customer_address, city_area,
            payment_method, items_json, subtotal, delivery_fee, total, status, history_json, notes)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'Pending',$11,$12) RETURNING id, order_number`,
          [newOrderNumber(), name, normPhone(phone), address, str(data.lahore_area || data.city_area, 120) || 'Lahore',
            payment, JSON.stringify(items), subtotal, deliveryFee, total, JSON.stringify(history), str(data.notes, 1000)]
        );
      } catch (e) {
        if (!/unique|duplicate/i.test(e.message)) throw e;
      }
    }
    for (const i of items) {
      await query('UPDATE plants SET stock = GREATEST(stock - $1, 0) WHERE id = $2', [i.quantity, i.id]);
    }
    return send(res, 201, {
      success: true, order_id: order.id, order_number: order.order_number,
      items, subtotal, delivery_fee: deliveryFee, total,
      message: 'Order placed successfully!'
    });
  }

  if (p === '/api/orders/track' && m === 'GET') {
    rateLimit(req, 'track', 30, 10 * 60 * 1000);
    const q = str(url.searchParams.get('q'), 40).toUpperCase();
    const phone = normPhone(url.searchParams.get('phone'));
    if (!q && !phone) throw new HttpError(400, 'Order number ya phone number likhein');
    let rows;
    if (q && phone) {
      rows = await query('SELECT * FROM orders WHERE order_number = $1 AND customer_phone = $2', [q, phone]);
    } else if (q) {
      rows = await query('SELECT * FROM orders WHERE order_number = $1', [q]);
    } else {
      rows = await query('SELECT * FROM orders WHERE customer_phone = $1 ORDER BY id DESC LIMIT 5', [phone]);
    }
    // Only expose non-sensitive fields publicly
    const orders = rows.map(parseOrder).map(o => ({
      order_number: o.order_number, status: o.status, history: o.history,
      total: o.total, created_at: o.created_at,
      items: o.items.map(i => ({ name: i.name, quantity: i.quantity, size: i.size }))
    }));
    return send(res, 200, { success: true, orders });
  }

  if (p === '/api/orders' && m === 'GET') {
    requireAdmin(req);
    const orders = (await query('SELECT * FROM orders ORDER BY id DESC LIMIT 1000')).map(parseOrder);
    return send(res, 200, { success: true, orders });
  }

  if ((match = p.match(/^\/api\/orders\/(\d+)(\/status)?$/)) && m === 'PUT') {
    requireAdmin(req);
    const id = int(match[1]);
    const data = await readBody(req);
    const order = await one('SELECT * FROM orders WHERE id = $1', [id]);
    if (!order) throw new HttpError(404, 'Order not found');
    const { history } = parseOrder(order);
    let status = order.status;
    if (data.status !== undefined) {
      if (!ORDER_STATUSES.includes(data.status)) throw new HttpError(400, 'Invalid status');
      if (data.status !== order.status) {
        status = data.status;
        history.push({ status, at: new Date().toISOString(), note: str(data.note, 300) });
        // Return stock when an order is cancelled
        if (status === 'Cancelled') {
          for (const i of parseOrder(order).items) {
            await query('UPDATE plants SET stock = stock + $1 WHERE id = $2', [int(i.quantity), int(i.id)]);
          }
        }
      }
    }
    const adminNotes = data.admin_notes !== undefined ? str(data.admin_notes, 2000) : order.admin_notes;
    await query('UPDATE orders SET status=$1, history_json=$2, admin_notes=$3, updated_at=NOW() WHERE id=$4',
      [status, JSON.stringify(history), adminNotes, id]);
    return send(res, 200, { success: true, message: 'Order updated' });
  }

  // ===== Leads (landscaping CRM) =====
  if (p === '/api/leads' && m === 'POST') {
    rateLimit(req, 'lead', 8, 10 * 60 * 1000);
    const data = await readBody(req);
    const name = str(data.client_name, 150);
    const phone = str(data.client_phone, 30);
    if (!name || !validPhone(phone)) throw new HttpError(400, 'Naam aur sahi phone number zaroori hain');
    if (data.website) return send(res, 201, { success: true }); // honeypot field for bots
    const source = LEAD_SOURCES.includes(data.source) ? data.source : 'consultation';
    const row = await one(
      `INSERT INTO leads (source, client_name, client_phone, project_type, area_size, location, message, preferred_date, estimate, budget, timeline, email)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id`,
      [source, name, normPhone(phone), str(data.project_type, 120), str(data.area_size, 120), str(data.location, 200),
        str(data.message, 3000), str(data.preferred_date, 40), int(data.estimate, 0),
        str(data.budget, 60), str(data.timeline, 60), str(data.email, 150)]
    );
    return send(res, 201, {
      success: true, lead_id: row.id,
      message: 'Request mil gayi! Hamara landscape architect jald rabta karega.'
    });
  }

  if (p === '/api/leads' && m === 'GET') {
    requireAdmin(req);
    const leads = await query('SELECT * FROM leads ORDER BY id DESC LIMIT 1000');
    return send(res, 200, { success: true, leads });
  }

  if ((match = p.match(/^\/api\/leads\/(\d+)(\/status)?$/))) {
    requireAdmin(req);
    const id = int(match[1]);
    if (m === 'DELETE') {
      await query('DELETE FROM leads WHERE id = $1', [id]);
      return send(res, 200, { success: true });
    }
    if (m === 'PUT') {
      const data = await readBody(req);
      const lead = await one('SELECT * FROM leads WHERE id = $1', [id]);
      if (!lead) throw new HttpError(404, 'Lead not found');
      const status = data.status !== undefined ? data.status : lead.status;
      if (!LEAD_STATUSES.includes(status)) throw new HttpError(400, 'Invalid status');
      await query('UPDATE leads SET status=$1, admin_notes=$2, estimate=$3, updated_at=NOW() WHERE id=$4', [
        status,
        data.admin_notes !== undefined ? str(data.admin_notes, 3000) : lead.admin_notes,
        data.estimate !== undefined ? int(data.estimate, 0) : lead.estimate,
        id
      ]);
      return send(res, 200, { success: true, message: 'Lead updated' });
    }
  }

  // ===== Reviews (moderated) =====
  if (p === '/api/reviews' && m === 'GET') {
    const all = url.searchParams.get('all') === '1' && auth.isAdmin(req);
    const reviews = await query(
      all ? 'SELECT * FROM reviews ORDER BY id DESC LIMIT 500'
        : 'SELECT id, name, area, rating, comment, created_at FROM reviews WHERE approved = 1 ORDER BY id DESC LIMIT 30'
    );
    return send(res, 200, { success: true, reviews });
  }
  if (p === '/api/reviews' && m === 'POST') {
    rateLimit(req, 'review', 3, 60 * 60 * 1000);
    const data = await readBody(req);
    const name = str(data.name, 80);
    const comment = str(data.comment, 1000);
    if (!name || comment.length < 5) throw new HttpError(400, 'Naam aur review likhein');
    await query('INSERT INTO reviews (name, area, rating, comment) VALUES ($1,$2,$3,$4)',
      [name, str(data.area, 80), int(data.rating, 5, 1, 5), comment]);
    return send(res, 201, { success: true, message: 'Shukriya! Approval ke baad review show hoga.' });
  }
  if ((match = p.match(/^\/api\/reviews\/(\d+)$/))) {
    requireAdmin(req);
    const id = int(match[1]);
    if (m === 'PUT') {
      const { approved } = await readBody(req);
      await query('UPDATE reviews SET approved = $1 WHERE id = $2', [approved ? 1 : 0, id]);
      return send(res, 200, { success: true });
    }
    if (m === 'DELETE') {
      await query('DELETE FROM reviews WHERE id = $1', [id]);
      return send(res, 200, { success: true });
    }
  }

  // ===== Dashboard stats =====
  if (p === '/api/stats' && m === 'GET') {
    requireAdmin(req);
    const c = async (sql) => (await one(sql)).v;
    const stats = {
      total_plants: await c('SELECT COUNT(*)::int AS v FROM plants'),
      low_stock: await c('SELECT COUNT(*)::int AS v FROM plants WHERE stock <= 5 AND active = 1'),
      total_orders: await c('SELECT COUNT(*)::int AS v FROM orders'),
      pending_orders: await c("SELECT COUNT(*)::int AS v FROM orders WHERE status IN ('Pending','Confirmed')"),
      total_revenue: await c("SELECT COALESCE(SUM(total),0)::int AS v FROM orders WHERE status = 'Delivered'"),
      pipeline_revenue: await c("SELECT COALESCE(SUM(total),0)::int AS v FROM orders WHERE status IN ('Pending','Confirmed','Dispatched')"),
      total_leads: await c('SELECT COUNT(*)::int AS v FROM leads'),
      new_leads: await c("SELECT COUNT(*)::int AS v FROM leads WHERE status = 'New Lead'"),
      won_leads: await c("SELECT COUNT(*)::int AS v FROM leads WHERE status IN ('Won','In Progress','Completed')"),
      pending_reviews: await c('SELECT COUNT(*)::int AS v FROM reviews WHERE approved = 0'),
      total_projects: await c('SELECT COUNT(*)::int AS v FROM projects'),
      pipeline_value: await c("SELECT COALESCE(SUM(estimate),0)::int AS v FROM leads WHERE status NOT IN ('Completed','Lost')"),
      won_value: await c("SELECT COALESCE(SUM(estimate),0)::int AS v FROM leads WHERE status IN ('Won','In Progress','Completed')")
    };
    return send(res, 200, { success: true, stats });
  }

  // ===== CSV exports =====
  if (p === '/api/export/orders.csv' && m === 'GET') {
    requireAdmin(req);
    const rows = (await query('SELECT * FROM orders ORDER BY id DESC')).map(o => ({
      ...o, items: parseOrder(o).items.map(i => `${i.quantity}x ${i.name} (${i.size})`).join('; ')
    }));
    return sendCsv(res, 'orders.csv', rows, ['order_number', 'created_at', 'customer_name', 'customer_phone',
      'city_area', 'customer_address', 'payment_method', 'items', 'subtotal', 'delivery_fee', 'total', 'status']);
  }
  if (p === '/api/export/leads.csv' && m === 'GET') {
    requireAdmin(req);
    const rows = await query('SELECT * FROM leads ORDER BY id DESC');
    return sendCsv(res, 'leads.csv', rows, ['id', 'created_at', 'source', 'client_name', 'client_phone',
      'project_type', 'area_size', 'location', 'budget', 'timeline', 'email', 'message', 'estimate', 'status', 'admin_notes']);
  }

  throw new HttpError(404, 'Endpoint not found');
}

async function handleApi(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  try {
    await route(req, res, url);
  } catch (err) {
    const status = err.status || 500;
    if (status === 500) console.error('[api]', err);
    send(res, status, { success: false, error: status === 500 ? 'Server error. Thori dair baad try karein.' : err.message });
  }
}

module.exports = { handleApi, normPhone };
