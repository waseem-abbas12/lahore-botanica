// admin.js - Admin CMS: login, leads CRM, orders, catalog, reviews, settings
let adminPlants = [];
let adminOrders = [];
let adminLeads = [];
let adminReviews = [];

const ORDER_STATUSES = ['Pending', 'Confirmed', 'Dispatched', 'Delivered', 'Cancelled'];
const LEAD_STATUSES = ['New Lead', 'Contacted', 'Site Visit Scheduled', 'Proposal Sent', 'Won', 'In Progress', 'Completed', 'Lost'];
const LEAD_SOURCE_LABELS = {
  consultation: 'Consultation form', calculator: 'Cost calculator', institutional: 'Free plants (institution)',
  membership: 'Green patron', city_page: 'City page', other: 'Other'
};
const STATUS_COLORS = {
  'Pending': 'bg-amber-100 text-amber-800', 'Confirmed': 'bg-blue-100 text-blue-800', 'Dispatched': 'bg-indigo-100 text-indigo-800',
  'Delivered': 'bg-emerald-100 text-emerald-800', 'Cancelled': 'bg-slate-200 text-slate-600',
  'New Lead': 'bg-red-100 text-red-700', 'Contacted': 'bg-amber-100 text-amber-800', 'Site Visit Scheduled': 'bg-blue-100 text-blue-800',
  'Proposal Sent': 'bg-indigo-100 text-indigo-800', 'Won': 'bg-emerald-100 text-emerald-800', 'In Progress': 'bg-teal-100 text-teal-800',
  'Completed': 'bg-emerald-200 text-emerald-900', 'Lost': 'bg-slate-200 text-slate-600'
};

// ---------- utils ----------
function esc(v) {
  return String(v === null || v === undefined ? '' : v)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function rs(n) { return `Rs. ${Number(n || 0).toLocaleString()}`; }
function fmtDate(d) {
  if (!d) return '';
  const dt = new Date(d);
  return dt.toLocaleDateString('en-PK', { day: 'numeric', month: 'short' }) + ', ' +
    dt.toLocaleTimeString('en-PK', { hour: 'numeric', minute: '2-digit' });
}
function waLink(phone, text) {
  return `https://wa.me/${String(phone || '').replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
}
function storeName() {
  return (window.SITE_SETTINGS && window.SITE_SETTINGS.store_name) || 'Lahore Botanica';
}

async function adminApi(url, options = {}) {
  const res = await fetch(url, {
    credentials: 'same-origin',
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
  });
  let data = {};
  try { data = await res.json(); } catch {}
  if (res.status === 401) {
    showAdminLogin();
    throw new Error(data.error || 'Login required');
  }
  if (!res.ok || data.success === false) throw new Error(data.error || `Error ${res.status}`);
  return data;
}

// ---------- navigation ----------
function toggleAdminView() {
  const adminPage = document.getElementById('page-admin');
  if (adminPage && adminPage.classList.contains('hidden')) navigateToPage('admin');
  else showStorefront();
}

function showStorefront() {
  navigateToPage('shop');
  if (typeof fetchPlants === 'function') fetchPlants();
}

// ---------- auth ----------
function showAdminLogin() {
  document.getElementById('admin-login-gate')?.classList.remove('hidden');
  document.getElementById('admin-content')?.classList.add('hidden');
  setTimeout(() => document.getElementById('admin-password')?.focus(), 50);
}

function showAdminContent() {
  document.getElementById('admin-login-gate')?.classList.add('hidden');
  document.getElementById('admin-content')?.classList.remove('hidden');
}

async function adminLogin(e) {
  e.preventDefault();
  const errEl = document.getElementById('admin-login-error');
  errEl.classList.add('hidden');
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST', credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: document.getElementById('admin-password').value })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success) throw new Error(data.error || 'Login failed');
    document.getElementById('admin-password').value = '';
    showAdminContent();
    loadAdminDashboard();
  } catch (err) {
    errEl.textContent = err.message === 'Failed to fetch' ? 'Server se rabta nahi ho saka' : err.message;
    errEl.classList.remove('hidden');
  }
}

async function adminLogout() {
  await fetch('/api/admin/logout', { method: 'POST', credentials: 'same-origin' }).catch(() => {});
  showAdminLogin();
}

// Called by navigateToPage('admin') in app.js
async function loadAdminDashboard() {
  let me = { admin: false };
  try {
    me = await (await fetch('/api/admin/me', { credentials: 'same-origin' })).json();
  } catch {}
  if (!me.admin) return showAdminLogin();
  showAdminContent();
  initAdminFilters();
  if (!document.querySelector('.admin-tab-btn.active')) switchAdminTab('leads');
  fetch('/api/health').then(r => r.json()).then(h => {
    document.getElementById('admin-db-warning')?.classList.toggle('hidden', !!h.durable);
  }).catch(() => {});
  await Promise.allSettled([fetchAdminStats(), fetchAdminPlants(), fetchAdminOrders(), fetchAdminLeads(), fetchAdminReviews(), fillSettingsForm()]);
}

function initAdminFilters() {
  const lf = document.getElementById('leads-filter');
  if (lf && !lf.options.length) {
    lf.innerHTML = '<option value="">All statuses</option><option value="open">Open (active)</option>' +
      LEAD_STATUSES.map(s => `<option value="${esc(s)}">${esc(s)}</option>`).join('');
    lf.value = 'open';
  }
  const of = document.getElementById('orders-filter');
  if (of && !of.options.length) {
    of.innerHTML = '<option value="">All statuses</option>' + ORDER_STATUSES.map(s => `<option value="${s}">${s}</option>`).join('');
  }
}

function switchAdminTab(tabName) {
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    const on = btn.id === `tab-btn-${tabName}`;
    btn.classList.toggle('active', on);
    btn.classList.toggle('bg-forest-800', on);
    btn.classList.toggle('text-white', on);
    btn.classList.toggle('bg-slate-200', !on);
    btn.classList.toggle('text-slate-700', !on);
  });
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.toggle('hidden', t.id !== `admin-tab-${tabName}`));
}

// ---------- stats ----------
async function fetchAdminStats() {
  try {
    const { stats } = await adminApi('/api/stats');
    document.getElementById('stat-revenue').textContent = rs(stats.total_revenue);
    document.getElementById('stat-pipeline').textContent = `${rs(stats.pipeline_revenue)} in pipeline`;
    document.getElementById('stat-orders').textContent = stats.total_orders;
    document.getElementById('stat-pending-orders').textContent = `${stats.pending_orders} need action`;
    document.getElementById('stat-leads').textContent = stats.total_leads;
    document.getElementById('stat-new-leads').textContent = `${stats.new_leads} new • ${stats.won_leads} won`;
    document.getElementById('stat-plants').textContent = stats.total_plants;
    document.getElementById('stat-low-stock').textContent = `${stats.low_stock} low stock (≤5)`;
    const badge = document.getElementById('badge-reviews');
    badge.textContent = stats.pending_reviews;
    badge.classList.toggle('hidden', !stats.pending_reviews);
  } catch (err) {
    console.error('Stats error:', err);
  }
}

// ---------- plants ----------
async function fetchAdminPlants() {
  try {
    const data = await adminApi('/api/plants?all=1&sort=newest');
    adminPlants = data.plants;
    renderAdminPlantsTable();
  } catch (err) {
    document.getElementById('admin-plants-tbody').innerHTML = `<tr><td colspan="6" class="p-6 text-center text-red-600">${esc(err.message)}</td></tr>`;
  }
}

function renderAdminPlantsTable() {
  const tbody = document.getElementById('admin-plants-tbody');
  if (!adminPlants.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="p-6 text-center text-slate-400">Koi plant nahi. "+ Add Plant" se shuru karein.</td></tr>';
    return;
  }
  tbody.innerHTML = adminPlants.map(p => `
    <tr class="hover:bg-slate-50 ${p.active ? '' : 'opacity-50'}">
      <td class="p-3"><div class="flex items-center gap-3">
        <img src="${esc(p.images[0] || '')}" alt="" class="w-12 h-12 rounded-xl object-cover bg-slate-100">
        <div>
          <div class="font-bold text-slate-900">${esc(p.name)} ${p.featured ? '⭐' : ''}</div>
          <div class="text-[10px] text-slate-500 italic">${esc(p.botanical_name)} • <span class="text-emerald-700">${esc(p.urdu_name)}</span></div>
        </div></div></td>
      <td class="p-3 capitalize text-slate-700">${esc(String(p.category).replace('_', ' '))}</td>
      <td class="p-3 font-bold text-forest-900">${rs(p.price)}</td>
      <td class="p-3 font-semibold ${p.stock <= 5 ? 'text-red-600' : p.stock < 10 ? 'text-amber-600' : 'text-slate-700'}">${p.stock}</td>
      <td class="p-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${p.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}">${p.active ? 'Live' : 'Hidden'}</span></td>
      <td class="p-3 text-right space-x-2 whitespace-nowrap">
        <button onclick="editPlant(${p.id})" class="text-xs font-bold text-blue-600 hover:text-blue-800">Edit</button>
        <button onclick="deletePlant(${p.id})" class="text-xs font-bold text-red-600 hover:text-red-800">Delete</button>
      </td>
    </tr>`).join('');
}

function variantsToText(list) {
  return (list || []).map(v => `${v.name} | ${v.price_delta || 0}`).join('\n');
}
function textToVariants(text) {
  return String(text || '').split('\n').map(line => {
    const [name, delta] = line.split('|');
    return { name: (name || '').trim(), price_delta: parseInt((delta || '0').replace(/\D/g, ''), 10) || 0 };
  }).filter(v => v.name);
}

function openAddPlantModal() {
  document.getElementById('admin-modal-title').textContent = 'Add New Plant';
  document.getElementById('admin-plant-form').reset();
  document.getElementById('form-plant-id').value = '';
  document.getElementById('form-active').checked = true;
  document.getElementById('form-hardy').checked = true;
  document.getElementById('form-sizes').value = 'Standard | 0';
  document.getElementById('form-pots').value = 'Nursery Pot | 0';
  document.getElementById('plant-form-error').classList.add('hidden');
  document.getElementById('admin-plant-modal').classList.remove('hidden');
}

function closeAddPlantModal() {
  document.getElementById('admin-plant-modal').classList.add('hidden');
}

function editPlant(id) {
  const p = adminPlants.find(item => item.id === id);
  if (!p) return;
  openAddPlantModal();
  document.getElementById('admin-modal-title').textContent = `Edit: ${p.name}`;
  document.getElementById('form-plant-id').value = p.id;
  document.getElementById('form-name').value = p.name;
  document.getElementById('form-urdu').value = p.urdu_name || '';
  document.getElementById('form-botanical').value = p.botanical_name || '';
  document.getElementById('form-category').value = p.category;
  document.getElementById('form-price').value = p.price;
  document.getElementById('form-stock').value = p.stock;
  document.getElementById('form-sunlight').value = p.sunlight;
  document.getElementById('form-water').value = p.water;
  document.getElementById('form-images').value = (p.images || []).join('\n');
  document.getElementById('form-sizes').value = variantsToText(p.variants?.sizes);
  document.getElementById('form-pots').value = variantsToText(p.variants?.pots);
  document.getElementById('form-desc').value = p.description || '';
  document.getElementById('form-pet').checked = !!p.pet_friendly;
  document.getElementById('form-hardy').checked = !!p.lahore_hardy;
  document.getElementById('form-featured').checked = !!p.featured;
  document.getElementById('form-active').checked = !!p.active;
}

async function savePlantForm(e) {
  e.preventDefault();
  const id = document.getElementById('form-plant-id').value;
  const errEl = document.getElementById('plant-form-error');
  errEl.classList.add('hidden');
  const existing = adminPlants.find(p => String(p.id) === String(id));
  const payload = {
    name: document.getElementById('form-name').value.trim(),
    urdu_name: document.getElementById('form-urdu').value.trim(),
    botanical_name: document.getElementById('form-botanical').value.trim(),
    category: document.getElementById('form-category').value,
    price: parseInt(document.getElementById('form-price').value, 10),
    stock: parseInt(document.getElementById('form-stock').value, 10),
    sunlight: document.getElementById('form-sunlight').value,
    water: document.getElementById('form-water').value,
    difficulty: existing?.difficulty || 'Easy',
    description: document.getElementById('form-desc').value.trim(),
    pet_friendly: document.getElementById('form-pet').checked,
    lahore_hardy: document.getElementById('form-hardy').checked,
    featured: document.getElementById('form-featured').checked,
    active: document.getElementById('form-active').checked,
    images: document.getElementById('form-images').value.split(/[\n,]/).map(s => s.trim()).filter(Boolean),
    variants: {
      sizes: textToVariants(document.getElementById('form-sizes').value),
      pots: textToVariants(document.getElementById('form-pots').value)
    }
  };
  try {
    await adminApi(id ? `/api/plants/${id}` : '/api/plants', { method: id ? 'PUT' : 'POST', body: JSON.stringify(payload) });
    closeAddPlantModal();
    fetchAdminPlants();
    fetchAdminStats();
  } catch (err) {
    errEl.textContent = err.message;
    errEl.classList.remove('hidden');
  }
}

async function deletePlant(id) {
  const p = adminPlants.find(x => x.id === id);
  if (!confirm(`"${p ? p.name : 'Plant'}" ko hamesha ke liye delete karna hai? (Sirf chhupane ke liye Edit → "Website par show" hata dein)`)) return;
  try {
    await adminApi(`/api/plants/${id}`, { method: 'DELETE' });
    fetchAdminPlants();
    fetchAdminStats();
  } catch (err) { alert(err.message); }
}

// ---------- orders ----------
async function fetchAdminOrders() {
  try {
    adminOrders = (await adminApi('/api/orders')).orders;
    renderAdminOrdersTable();
  } catch (err) {
    document.getElementById('admin-orders-tbody').innerHTML = `<tr><td colspan="8" class="p-6 text-center text-red-600">${esc(err.message)}</td></tr>`;
  }
}

function renderAdminOrdersTable() {
  const tbody = document.getElementById('admin-orders-tbody');
  const q = (document.getElementById('orders-search')?.value || '').toLowerCase().trim();
  const f = document.getElementById('orders-filter')?.value || '';
  const list = adminOrders.filter(o =>
    (!f || o.status === f) &&
    (!q || [o.order_number, o.customer_name, o.customer_phone, o.city_area].join(' ').toLowerCase().includes(q))
  );
  if (!list.length) {
    tbody.innerHTML = '<tr><td colspan="8" class="p-6 text-center text-slate-400">Koi order nahi mila.</td></tr>';
    return;
  }
  tbody.innerHTML = list.map(o => {
    const items = o.items.map(i => `${i.quantity}x ${i.name} (${i.size})`).join(', ');
    const msg = `Assalam-o-Alaikum ${o.customer_name}, ${storeName()} se. Aapka order ${o.order_number} (${rs(o.total)}) ka status: ${o.status}.`;
    return `
      <tr class="hover:bg-slate-50 align-top">
        <td class="p-3"><div class="font-mono font-bold text-forest-900">${esc(o.order_number)}</div><div class="text-[10px] text-slate-400">${esc(fmtDate(o.created_at))}</div></td>
        <td class="p-3"><div class="font-bold text-slate-900">${esc(o.customer_name)}</div><div class="text-[10px] text-slate-500">${esc(o.customer_phone)}</div></td>
        <td class="p-3 max-w-[180px]"><div class="font-semibold text-slate-700">${esc(o.city_area)}</div><div class="text-[10px] text-slate-500">${esc(o.customer_address)}</div>${o.notes ? `<div class="text-[10px] text-amber-700 mt-1">📝 ${esc(o.notes)}</div>` : ''}</td>
        <td class="p-3 text-[11px] text-slate-600 max-w-[220px]">${esc(items)}</td>
        <td class="p-3 font-bold text-forest-900 whitespace-nowrap">${rs(o.total)}${o.delivery_fee ? `<div class="text-[10px] text-slate-400 font-normal">incl. ${rs(o.delivery_fee)} delivery</div>` : ''}</td>
        <td class="p-3 uppercase text-[10px] font-bold text-slate-500">${esc(o.payment_method)}</td>
        <td class="p-3">
          <select onchange="updateOrderStatus(${o.id}, this.value)" class="text-[11px] font-bold p-1 rounded-lg border border-slate-200 ${STATUS_COLORS[o.status] || ''}">
            ${ORDER_STATUSES.map(s => `<option value="${s}" ${o.status === s ? 'selected' : ''}>${s}</option>`).join('')}
          </select>
        </td>
        <td class="p-3"><a href="${esc(waLink(o.customer_phone, msg))}" target="_blank" rel="noopener" class="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold hover:bg-emerald-200 whitespace-nowrap">WhatsApp</a></td>
      </tr>`;
  }).join('');
}

async function updateOrderStatus(id, status) {
  let note = '';
  if (status === 'Dispatched') note = prompt('Rider ka naam / note (optional):') || '';
  try {
    await adminApi(`/api/orders/${id}`, { method: 'PUT', body: JSON.stringify({ status, note }) });
  } catch (err) { alert(err.message); }
  fetchAdminOrders();
  fetchAdminStats();
  if (status === 'Cancelled') fetchAdminPlants();
}

// ---------- leads CRM ----------
async function fetchAdminLeads() {
  try {
    adminLeads = (await adminApi('/api/leads')).leads;
    renderAdminLeadsTable();
  } catch (err) {
    document.getElementById('admin-leads-tbody').innerHTML = `<tr><td colspan="8" class="p-6 text-center text-red-600">${esc(err.message)}</td></tr>`;
  }
}

function renderAdminLeadsTable() {
  const tbody = document.getElementById('admin-leads-tbody');
  const q = (document.getElementById('leads-search')?.value || '').toLowerCase().trim();
  const f = document.getElementById('leads-filter')?.value || '';
  const closed = ['Completed', 'Lost'];
  const list = adminLeads.filter(l =>
    (!f || (f === 'open' ? !closed.includes(l.status) : l.status === f)) &&
    (!q || [l.client_name, l.client_phone, l.location, l.project_type].join(' ').toLowerCase().includes(q))
  );
  if (!list.length) {
    tbody.innerHTML = '<tr><td colspan="8" class="p-6 text-center text-slate-400">Koi lead nahi mili.</td></tr>';
    return;
  }
  tbody.innerHTML = list.map(l => {
    const msg = `Assalam-o-Alaikum ${l.client_name}, ${storeName()} team se. Aapki ${l.project_type || 'landscaping'} inquiry ke silsile mein rabta kar rahe hain. Site visit ke liye kab munasib rahega?`;
    return `
      <tr class="hover:bg-slate-50 align-top">
        <td class="p-3 text-[10px] text-slate-500 whitespace-nowrap">${esc(fmtDate(l.created_at))}<div class="mt-1 inline-block px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">${esc(LEAD_SOURCE_LABELS[l.source] || l.source)}</div></td>
        <td class="p-3"><div class="font-bold text-slate-900">${esc(l.client_name)}</div><div class="font-mono text-[10px] text-slate-500">${esc(l.client_phone)}</div></td>
        <td class="p-3"><div class="font-bold text-forest-900">${esc(l.project_type)}</div><div class="text-[10px] text-slate-500">${esc(l.area_size)} • ${esc(l.location)}</div>${l.preferred_date ? `<div class="text-[10px] text-blue-700">📅 ${esc(l.preferred_date)}</div>` : ''}</td>
        <td class="p-3 text-[11px] text-slate-600 max-w-[220px] whitespace-pre-line">${esc(l.message) || '<span class="text-slate-400">—</span>'}</td>
        <td class="p-3"><input type="number" min="0" value="${Number(l.estimate) || ''}" placeholder="0" onchange="updateLead(${l.id}, { estimate: this.value })" class="w-24 p-1 rounded border border-slate-200 text-[11px]"></td>
        <td class="p-3">
          <select onchange="updateLead(${l.id}, { status: this.value }, true)" class="text-[11px] font-bold p-1 rounded-lg border border-slate-200 ${STATUS_COLORS[l.status] || ''}">
            ${LEAD_STATUSES.map(s => `<option value="${esc(s)}" ${l.status === s ? 'selected' : ''}>${esc(s)}</option>`).join('')}
          </select>
        </td>
        <td class="p-3"><textarea rows="2" placeholder="Follow-up notes..." onchange="updateLead(${l.id}, { admin_notes: this.value })" class="w-40 p-1 rounded border border-slate-200 text-[11px]">${esc(l.admin_notes)}</textarea></td>
        <td class="p-3 space-y-1 whitespace-nowrap">
          <a href="${esc(waLink(l.client_phone, msg))}" target="_blank" rel="noopener" class="block text-center px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold hover:bg-emerald-200">WhatsApp</a>
          <a href="tel:+${esc(String(l.client_phone).replace(/\D/g, ''))}" class="block text-center px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold hover:bg-slate-200">Call</a>
          <button onclick="deleteLead(${l.id})" class="block w-full text-center text-[10px] text-red-500 hover:text-red-700">Delete</button>
        </td>
      </tr>`;
  }).join('');
}

async function updateLead(id, changes, rerender = false) {
  try {
    await adminApi(`/api/leads/${id}`, { method: 'PUT', body: JSON.stringify(changes) });
    const lead = adminLeads.find(l => l.id === id);
    if (lead) Object.assign(lead, changes);
    if (rerender) renderAdminLeadsTable();
    fetchAdminStats();
  } catch (err) { alert(err.message); }
}

async function deleteLead(id) {
  if (!confirm('Yeh lead hamesha ke liye delete karni hai?')) return;
  try {
    await adminApi(`/api/leads/${id}`, { method: 'DELETE' });
    adminLeads = adminLeads.filter(l => l.id !== id);
    renderAdminLeadsTable();
    fetchAdminStats();
  } catch (err) { alert(err.message); }
}

// ---------- reviews ----------
async function fetchAdminReviews() {
  try {
    adminReviews = (await adminApi('/api/reviews?all=1')).reviews;
    renderAdminReviews();
  } catch (err) { console.error(err); }
}

function renderAdminReviews() {
  const box = document.getElementById('admin-reviews-list');
  if (!adminReviews.length) {
    box.innerHTML = '<div class="p-6 text-center text-xs text-slate-400">Abhi koi review nahi.</div>';
    return;
  }
  box.innerHTML = adminReviews.map(r => `
    <div class="p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs ${r.approved ? '' : 'bg-amber-50/50'}">
      <div>
        <div class="font-bold text-slate-900">${esc(r.name)} <span class="font-normal text-slate-500">• ${esc(r.area)}</span> <span class="text-amber-500">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span></div>
        <p class="mt-1 text-slate-700">${esc(r.comment)}</p>
        <div class="mt-1 text-[10px] text-slate-400">${esc(fmtDate(r.created_at))}</div>
      </div>
      <div class="flex gap-2 shrink-0">
        ${r.approved
          ? `<button onclick="moderateReview(${r.id}, false)" class="px-3 py-1.5 rounded-lg bg-slate-100 font-bold text-slate-700">Hide</button>`
          : `<button onclick="moderateReview(${r.id}, true)" class="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold">Approve</button>`}
        <button onclick="deleteReview(${r.id})" class="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 font-bold">Delete</button>
      </div>
    </div>`).join('');
}

async function moderateReview(id, approved) {
  try {
    await adminApi(`/api/reviews/${id}`, { method: 'PUT', body: JSON.stringify({ approved }) });
    fetchAdminReviews();
    fetchAdminStats();
  } catch (err) { alert(err.message); }
}

async function deleteReview(id) {
  if (!confirm('Review delete karna hai?')) return;
  try {
    await adminApi(`/api/reviews/${id}`, { method: 'DELETE' });
    fetchAdminReviews();
    fetchAdminStats();
  } catch (err) { alert(err.message); }
}

// ---------- settings ----------
async function fillSettingsForm() {
  try {
    const { settings } = await adminApi('/api/settings');
    const form = document.getElementById('admin-settings-form');
    Object.entries(settings).forEach(([k, v]) => { if (form.elements[k]) form.elements[k].value = v; });
  } catch (err) { console.error(err); }
}

async function saveSettings(e) {
  e.preventDefault();
  const form = e.target;
  const payload = {};
  Array.from(form.elements).forEach(el => { if (el.name) payload[el.name] = el.value; });
  try {
    await adminApi('/api/settings', { method: 'PUT', body: JSON.stringify(payload) });
    const msg = document.getElementById('settings-saved-msg');
    msg.classList.remove('hidden');
    setTimeout(() => msg.classList.add('hidden'), 2500);
    if (typeof loadSiteSettings === 'function') loadSiteSettings();
    fillSettingsForm();
  } catch (err) { alert(err.message); }
}
