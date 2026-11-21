// server.js - Fast, zero-dependency Node.js HTTP server & REST API for Lahore Botanica
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { db, initDatabase } = require('./db.js');

// Initialize SQLite database
initDatabase();

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Helper to parse JSON request body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 5 * 1024 * 1024) { // 5MB limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

// Helper to send JSON response
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

// Request Handler
const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Handle CORS Preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  // API Endpoints
  if (pathname.startsWith('/api/')) {
    try {
      // 1. GET /api/plants - Search, Filter, Sort
      if (pathname === '/api/plants' && method === 'GET') {
        const search = parsedUrl.searchParams.get('search') || '';
        const category = parsedUrl.searchParams.get('category') || '';
        const sunlight = parsedUrl.searchParams.get('sunlight') || '';
        const water = parsedUrl.searchParams.get('water') || '';
        const petFriendly = parsedUrl.searchParams.get('pet_friendly');
        const sort = parsedUrl.searchParams.get('sort') || 'featured';

        let query = 'SELECT * FROM plants WHERE 1=1';
        const params = [];

        if (search) {
          query += ' AND (name LIKE ? OR botanical_name LIKE ? OR urdu_name LIKE ? OR description LIKE ?)';
          const term = `%${search}%`;
          params.push(term, term, term, term);
        }

        if (category && category !== 'all') {
          query += ' AND category = ?';
          params.push(category);
        }

        if (sunlight) {
          query += ' AND sunlight = ?';
          params.push(sunlight);
        }

        if (water) {
          query += ' AND water = ?';
          params.push(water);
        }

        if (petFriendly === '1') {
          query += ' AND pet_friendly = 1';
        }

        // Sorting
        if (sort === 'price_asc') {
          query += ' ORDER BY price ASC';
        } else if (sort === 'price_desc') {
          query += ' ORDER BY price DESC';
        } else if (sort === 'newest') {
          query += ' ORDER BY id DESC';
        } else {
          query += ' ORDER BY featured DESC, id ASC';
        }

        const stmt = db.prepare(query);
        const rows = stmt.all(...params);
        const parsedRows = rows.map(r => ({
          ...r,
          images: JSON.parse(r.images_json || '[]'),
          variants: JSON.parse(r.variants_json || '{}')
        }));
        return sendJson(res, 200, { success: true, plants: parsedRows, total: parsedRows.length });
      }

      // 2. GET /api/plants/:id
      const plantDetailMatch = pathname.match(/^\/api\/plants\/(\d+)$/);
      if (plantDetailMatch && method === 'GET') {
        const id = parseInt(plantDetailMatch[1], 10);
        const stmt = db.prepare('SELECT * FROM plants WHERE id = ?');
        const plant = stmt.get(id);
        if (!plant) {
          return sendJson(res, 404, { success: false, error: 'Plant not found' });
        }
        return sendJson(res, 200, {
          success: true,
          plant: {
            ...plant,
            images: JSON.parse(plant.images_json || '[]'),
            variants: JSON.parse(plant.variants_json || '{}')
          }
        });
      }

      // 3. POST /api/plants - Admin: Add plant
      if (pathname === '/api/plants' && method === 'POST') {
        const data = await parseBody(req);
        if (!data.name || !data.price) {
          return sendJson(res, 400, { success: false, error: 'Plant name and price are required' });
        }

        const insert = db.prepare(`
          INSERT INTO plants (
            name, botanical_name, urdu_name, category, price, stock, description,
            sunlight, water, difficulty, pet_friendly, lahore_hardy, images_json, variants_json, featured
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const imagesJson = typeof data.images === 'string' ? data.images : JSON.stringify(data.images || []);
        const variantsJson = typeof data.variants === 'string' ? data.variants : JSON.stringify(data.variants || {});

        const info = insert.run(
          data.name,
          data.botanical_name || '',
          data.urdu_name || '',
          data.category || 'indoor',
          parseInt(data.price, 10),
          parseInt(data.stock || 20, 10),
          data.description || '',
          data.sunlight || 'full_sun',
          data.water || 'moderate',
          data.difficulty || 'Easy',
          data.pet_friendly ? 1 : 0,
          data.lahore_hardy ? 1 : 0,
          imagesJson,
          variantsJson,
          data.featured ? 1 : 0
        );

        return sendJson(res, 201, { success: true, id: Number(info.lastInsertRowid), message: 'Plant created successfully' });
      }

      // 4. PUT /api/plants/:id - Admin: Update plant
      if (plantDetailMatch && method === 'PUT') {
        const id = parseInt(plantDetailMatch[1], 10);
        const data = await parseBody(req);

        const update = db.prepare(`
          UPDATE plants SET
            name = ?, botanical_name = ?, urdu_name = ?, category = ?, price = ?,
            stock = ?, description = ?, sunlight = ?, water = ?, difficulty = ?,
            pet_friendly = ?, lahore_hardy = ?, images_json = ?, variants_json = ?, featured = ?
          WHERE id = ?
        `);

        const imagesJson = typeof data.images === 'string' ? data.images : JSON.stringify(data.images || []);
        const variantsJson = typeof data.variants === 'string' ? data.variants : JSON.stringify(data.variants || {});

        update.run(
          data.name,
          data.botanical_name || '',
          data.urdu_name || '',
          data.category || 'indoor',
          parseInt(data.price, 10),
          parseInt(data.stock || 20, 10),
          data.description || '',
          data.sunlight || 'full_sun',
          data.water || 'moderate',
          data.difficulty || 'Easy',
          data.pet_friendly ? 1 : 0,
          data.lahore_hardy ? 1 : 0,
          imagesJson,
          variantsJson,
          data.featured ? 1 : 0,
          id
        );

        return sendJson(res, 200, { success: true, message: 'Plant updated successfully' });
      }

      // 5. DELETE /api/plants/:id - Admin: Delete plant
      if (plantDetailMatch && method === 'DELETE') {
        const id = parseInt(plantDetailMatch[1], 10);
        const del = db.prepare('DELETE FROM plants WHERE id = ?');
        del.run(id);
        return sendJson(res, 200, { success: true, message: 'Plant deleted' });
      }

      // 6. POST /api/orders - Store: Place an order
      if (pathname === '/api/orders' && method === 'POST') {
        const data = await parseBody(req);
        if (!data.customer_name || !data.customer_phone || !data.items || data.items.length === 0) {
          return sendJson(res, 400, { success: false, error: 'Name, phone, and cart items are required' });
        }

        const orderNumber = `LB-${Date.now().toString().slice(-6)}`;
        const subtotal = data.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const deliveryFee = subtotal >= 3500 ? 0 : 250;
        const total = subtotal + deliveryFee;

        const insertOrder = db.prepare(`
          INSERT INTO orders (
            order_number, customer_name, customer_phone, customer_address, lahore_area,
            payment_method, items_json, subtotal, delivery_fee, total, status, notes
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const info = insertOrder.run(
          orderNumber,
          data.customer_name,
          data.customer_phone,
          data.customer_address || 'Lahore',
          data.lahore_area || 'Lahore',
          data.payment_method || 'cod',
          JSON.stringify(data.items),
          subtotal,
          deliveryFee,
          total,
          'Pending',
          data.notes || ''
        );

        return sendJson(res, 201, {
          success: true,
          order_id: Number(info.lastInsertRowid),
          order_number: orderNumber,
          total,
          message: 'Order placed successfully!'
        });
      }

      // 7. GET /api/orders - Admin: View all orders
      if (pathname === '/api/orders' && method === 'GET') {
        const stmt = db.prepare('SELECT * FROM orders ORDER BY id DESC');
        const orders = stmt.all().map(o => ({
          ...o,
          items: JSON.parse(o.items_json || '[]')
        }));
        return sendJson(res, 200, { success: true, orders });
      }

      // 8. PUT /api/orders/:id/status - Admin: Update order status
      const orderStatusMatch = pathname.match(/^\/api\/orders\/(\d+)\/status$/);
      if (orderStatusMatch && method === 'PUT') {
        const id = parseInt(orderStatusMatch[1], 10);
        const { status } = await parseBody(req);
        const update = db.prepare('UPDATE orders SET status = ? WHERE id = ?');
        update.run(status, id);
        return sendJson(res, 200, { success: true, message: 'Status updated' });
      }

      // 9. POST /api/leads - Store: Landscaping consultation lead
      if (pathname === '/api/leads' && method === 'POST') {
        const data = await parseBody(req);
        if (!data.client_name || !data.client_phone) {
          return sendJson(res, 400, { success: false, error: 'Name and phone number are required' });
        }

        const insertLead = db.prepare(`
          INSERT INTO leads (client_name, client_phone, project_type, area_size, location, message, preferred_date, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, 'New Lead')
        `);

        const info = insertLead.run(
          data.client_name,
          data.client_phone,
          data.project_type || 'Villa Lawn',
          data.area_size || '1 Kanal',
          data.location || 'Lahore',
          data.message || '',
          data.preferred_date || ''
        );

        return sendJson(res, 201, {
          success: true,
          lead_id: Number(info.lastInsertRowid),
          message: 'Consultation request submitted! Our landscape architect will contact you shortly.'
        });
      }

      // 10. GET /api/leads - Admin: View all landscaping inquiries
      if (pathname === '/api/leads' && method === 'GET') {
        const stmt = db.prepare('SELECT * FROM leads ORDER BY id DESC');
        const leads = stmt.all();
        return sendJson(res, 200, { success: true, leads });
      }

      // 11. PUT /api/leads/:id/status - Admin: Update lead status
      const leadStatusMatch = pathname.match(/^\/api\/leads\/(\d+)\/status$/);
      if (leadStatusMatch && method === 'PUT') {
        const id = parseInt(leadStatusMatch[1], 10);
        const { status } = await parseBody(req);
        const update = db.prepare('UPDATE leads SET status = ? WHERE id = ?');
        update.run(status, id);
        return sendJson(res, 200, { success: true, message: 'Lead status updated' });
      }

      // 12. GET /api/stats - Admin: Dashboard stats
      if (pathname === '/api/stats' && method === 'GET') {
        const plantCount = db.prepare('SELECT COUNT(*) as count FROM plants').get().count;
        const orderCount = db.prepare('SELECT COUNT(*) as count FROM orders').get().count;
        const totalRevenue = db.prepare("SELECT COALESCE(SUM(total), 0) as total FROM orders WHERE status != 'Cancelled'").get().total;
        const leadCount = db.prepare('SELECT COUNT(*) as count FROM leads').get().count;
        const newLeads = db.prepare("SELECT COUNT(*) as count FROM leads WHERE status = 'New Lead'").get().count;

        return sendJson(res, 200, {
          success: true,
          stats: {
            total_plants: plantCount,
            total_orders: orderCount,
            total_revenue: totalRevenue,
            total_leads: leadCount,
            new_leads: newLeads
          }
        });
      }

      // 13. GET /api/settings
      if (pathname === '/api/settings' && method === 'GET') {
        const rows = db.prepare('SELECT key, value FROM settings').all();
        const settings = {};
        rows.forEach(r => { settings[r.key] = r.value; });
        return sendJson(res, 200, { success: true, settings });
      }

      return sendJson(res, 404, { success: false, error: 'Endpoint not found' });
    } catch (err) {
      console.error('API Error:', err);
      return sendJson(res, 500, { success: false, error: err.message });
    }
  }

  // Static File Serving
  let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);
  
  // Clean safety check against path traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end('Access denied');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA routes
      filePath = path.join(PUBLIC_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(404);
        return res.end('File not found');
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`🌿 Lahore Botanica & Landscaping Platform running at http://localhost:${PORT}`);
  console.log(`🛍️ Customer Store: http://localhost:${PORT}`);
  console.log(`📊 Admin Dashboard: http://localhost:${PORT}#admin`);
});
