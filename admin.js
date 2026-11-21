// admin.js - Full-featured Custom Admin CMS for Lahore Botanica
let adminPlants = [];
let adminOrders = [];
let adminLeads = [];

function toggleAdminView() {
  const store = document.getElementById('storefront-view');
  const admin = document.getElementById('admin-view');
  const btnLabel = document.getElementById('admin-btn-label');

  if (admin.classList.contains('hidden')) {
    store.classList.add('hidden');
    admin.classList.remove('hidden');
    btnLabel.innerText = 'Exit CMS';
    window.location.hash = 'admin';
    loadAdminDashboard();
  } else {
    showStorefront();
  }
}

function showStorefront() {
  document.getElementById('storefront-view').classList.remove('hidden');
  document.getElementById('admin-view').classList.add('hidden');
  document.getElementById('admin-btn-label').innerText = 'Admin CMS';
  window.location.hash = '';
  fetchPlants(); // refresh storefront
}

async function loadAdminDashboard() {
  await Promise.all([
    fetchAdminStats(),
    fetchAdminPlants(),
    fetchAdminOrders(),
    fetchAdminLeads()
  ]);
}

// Fetch Quick Metrics
async function fetchAdminStats() {
  try {
    const res = await fetch('/api/stats');
    const data = await res.json();
    if (data.success) {
      document.getElementById('stat-revenue').innerText = `Rs. ${data.stats.total_revenue.toLocaleString()}`;
      document.getElementById('stat-plants').innerText = data.stats.total_plants;
      document.getElementById('stat-orders').innerText = data.stats.total_orders;
      document.getElementById('stat-leads').innerText = data.stats.total_leads;
      document.getElementById('stat-new-leads').innerText = `${data.stats.new_leads} Pending Site Visits`;
    }
  } catch (err) {
    console.error('Stats error:', err);
  }
}

// Switch Tabs
function switchAdminTab(tabName) {
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.classList.remove('active', 'bg-forest-800', 'text-white');
    btn.classList.add('bg-slate-200', 'text-slate-700');
  });

  const activeBtn = document.getElementById(`tab-btn-${tabName}`);
  if (activeBtn) {
    activeBtn.classList.add('active', 'bg-forest-800', 'text-white');
    activeBtn.classList.remove('bg-slate-200', 'text-slate-700');
  }

  document.getElementById('admin-tab-plants').classList.toggle('hidden', tabName !== 'plants');
  document.getElementById('admin-tab-orders').classList.toggle('hidden', tabName !== 'orders');
  document.getElementById('admin-tab-leads').classList.toggle('hidden', tabName !== 'leads');
}

// ==================== PLANTS MANAGEMENT ====================
async function fetchAdminPlants() {
  try {
    const res = await fetch('/api/plants?sort=newest');
    const data = await res.json();
    if (data.success) {
      adminPlants = data.plants;
      renderAdminPlantsTable(adminPlants);
    }
  } catch (err) {
    console.error('Admin plants error:', err);
  }
}

function renderAdminPlantsTable(plants) {
  const tbody = document.getElementById('admin-plants-tbody');
  tbody.innerHTML = plants.map(p => {
    const img = p.images[0] || 'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=200';
    return `
      <tr class="hover:bg-slate-50 transition">
        <td class="p-3 flex items-center gap-3">
          <img src="${img}" alt="${p.name}" class="w-12 h-12 rounded-xl object-cover bg-slate-100">
          <div>
            <div class="font-bold text-slate-900">${p.name}</div>
            <div class="text-[10px] text-slate-500 italic">${p.botanical_name || ''} • <span class="font-semibold text-emerald-700">${p.urdu_name || ''}</span></div>
          </div>
        </td>
        <td class="p-3 capitalize font-medium text-slate-700">${p.category.replace('_', ' ')}</td>
        <td class="p-3 font-bold text-forest-900">Rs. ${p.price.toLocaleString()}</td>
        <td class="p-3 font-semibold ${p.stock < 10 ? 'text-amber-600' : 'text-slate-700'}">${p.stock}</td>
        <td class="p-3 text-[11px] text-slate-600">
          <div>${p.sunlight}</div>
          <div class="text-slate-400">${p.water} water</div>
        </td>
        <td class="p-3">
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${p.lahore_hardy ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}">
            ${p.lahore_hardy ? '✓ Hardy' : 'Moderate'}
          </span>
        </td>
        <td class="p-3 text-right space-x-2">
          <button onclick="editPlant(${p.id})" class="text-xs font-bold text-blue-600 hover:text-blue-800">Edit</button>
          <button onclick="deletePlant(${p.id})" class="text-xs font-bold text-red-600 hover:text-red-800">Delete</button>
        </td>
      </tr>
    `;
  }).join('');
}

function openAddPlantModal() {
  document.getElementById('admin-modal-title').innerText = 'Add New Plant to Nursery';
  document.getElementById('form-plant-id').value = '';
  document.getElementById('admin-plant-form').reset();
  document.getElementById('admin-plant-modal').classList.remove('hidden');
}

function closeAddPlantModal() {
  document.getElementById('admin-plant-modal').classList.add('hidden');
}

function editPlant(id) {
  const p = adminPlants.find(item => item.id === id);
  if (!p) return;

  document.getElementById('admin-modal-title').innerText = `Edit: ${p.name}`;
  document.getElementById('form-plant-id').value = p.id;
  document.getElementById('form-name').value = p.name;
  document.getElementById('form-urdu').value = p.urdu_name || '';
  document.getElementById('form-botanical').value = p.botanical_name || '';
  document.getElementById('form-category').value = p.category;
  document.getElementById('form-price').value = p.price;
  document.getElementById('form-stock').value = p.stock;
  document.getElementById('form-sunlight').value = p.sunlight;
  document.getElementById('form-water').value = p.water;
  document.getElementById('form-images').value = (p.images || []).join(', ');
  document.getElementById('form-desc').value = p.description || '';
  document.getElementById('form-pet').checked = !!p.pet_friendly;
  document.getElementById('form-hardy').checked = !!p.lahore_hardy;
  document.getElementById('form-featured').checked = !!p.featured;

  document.getElementById('admin-plant-modal').classList.remove('hidden');
}

async function savePlantForm(e) {
  e.preventDefault();
  const id = document.getElementById('form-plant-id').value;
  const name = document.getElementById('form-name').value.trim();
  const urdu = document.getElementById('form-urdu').value.trim();
  const botanical = document.getElementById('form-botanical').value.trim();
  const category = document.getElementById('form-category').value;
  const price = parseInt(document.getElementById('form-price').value, 10);
  const stock = parseInt(document.getElementById('form-stock').value, 10);
  const sunlight = document.getElementById('form-sunlight').value;
  const water = document.getElementById('form-water').value;
  const desc = document.getElementById('form-desc').value.trim();
  const pet = document.getElementById('form-pet').checked;
  const hardy = document.getElementById('form-hardy').checked;
  const featured = document.getElementById('form-featured').checked;

  const rawImages = document.getElementById('form-images').value;
  const images = rawImages ? rawImages.split(',').map(s => s.trim()).filter(Boolean) : [
    'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1000'
  ];

  const payload = {
    name,
    urdu_name: urdu,
    botanical_name: botanical,
    category,
    price,
    stock,
    sunlight,
    water,
    description: desc,
    pet_friendly: pet,
    lahore_hardy: hardy,
    featured: featured,
    images
  };

  try {
    let res;
    if (id) {
      res = await fetch(`/api/plants/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      res = await fetch('/api/plants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    const data = await res.json();
    if (data.success) {
      closeAddPlantModal();
      await fetchAdminPlants();
      await fetchAdminStats();
    } else {
      alert(`Save error: ${data.error}`);
    }
  } catch (err) {
    console.error('Save plant error:', err);
    alert('Failed to save plant.');
  }
}

async function deletePlant(id) {
  if (!confirm('Are you sure you want to delete this plant from the nursery catalog?')) return;

  try {
    const res = await fetch(`/api/plants/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      await fetchAdminPlants();
      await fetchAdminStats();
    }
  } catch (err) {
    console.error('Delete error:', err);
  }
}

// ==================== ORDERS MANAGEMENT ====================
async function fetchAdminOrders() {
  try {
    const res = await fetch('/api/orders');
    const data = await res.json();
    if (data.success) {
      adminOrders = data.orders;
      renderAdminOrdersTable(adminOrders);
    }
  } catch (err) {
    console.error('Admin orders error:', err);
  }
}

function renderAdminOrdersTable(orders) {
  const tbody = document.getElementById('admin-orders-tbody');
  if (orders.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="p-6 text-center text-slate-400">No orders placed yet.</td></tr>';
    return;
  }

  tbody.innerHTML = orders.map(o => {
    const itemsSummary = o.items.map(i => `${i.quantity}x ${i.name}`).join(', ');
    return `
      <tr class="hover:bg-slate-50 transition">
        <td class="p-3 font-mono font-bold text-forest-900">${o.order_number}</td>
        <td class="p-3">
          <div class="font-bold text-slate-900">${o.customer_name}</div>
          <div class="text-[10px] text-slate-500">${o.customer_phone}</div>
        </td>
        <td class="p-3 font-medium text-slate-700">${o.lahore_area}</td>
        <td class="p-3 text-[11px] text-slate-600 max-w-xs truncate" title="${itemsSummary}">${itemsSummary}</td>
        <td class="p-3 font-bold text-forest-900">Rs. ${o.total.toLocaleString()}</td>
        <td class="p-3">
          <select onchange="updateOrderStatus(${o.id}, this.value)" class="text-[11px] font-bold p-1 rounded-lg border border-slate-200 bg-white">
            <option value="Pending" ${o.status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Confirmed" ${o.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
            <option value="Dispatched" ${o.status === 'Dispatched' ? 'selected' : ''}>Dispatched</option>
            <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
            <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
        <td class="p-3">
          <a href="https://wa.me/${o.customer_phone.replace(/[^0-9]/g, '')}?text=Assalam-o-Alaikum%20${encodeURIComponent(o.customer_name)},%20regarding%20your%20order%20${o.order_number}%20from%20Lahore%20Botanica" target="_blank" class="text-xs font-bold text-emerald-600 hover:text-emerald-800">
            WhatsApp
          </a>
        </td>
      </tr>
    `;
  }).join('');
}

async function updateOrderStatus(id, newStatus) {
  try {
    await fetch(`/api/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    await fetchAdminStats();
  } catch (err) {
    console.error('Update status error:', err);
  }
}

// ==================== LANDSCAPING LEADS CRM ====================
async function fetchAdminLeads() {
  try {
    const res = await fetch('/api/leads');
    const data = await res.json();
    if (data.success) {
      adminLeads = data.leads;
      renderAdminLeadsTable(adminLeads);
    }
  } catch (err) {
    console.error('Admin leads error:', err);
  }
}

function renderAdminLeadsTable(leads) {
  const tbody = document.getElementById('admin-leads-tbody');
  if (leads.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="p-6 text-center text-slate-400">No landscaping leads yet.</td></tr>';
    return;
  }

  tbody.innerHTML = leads.map(l => {
    return `
      <tr class="hover:bg-slate-50 transition">
        <td class="p-3 font-bold text-slate-900">${l.client_name}</td>
        <td class="p-3 font-mono text-[11px] text-slate-600">${l.client_phone}</td>
        <td class="p-3">
          <div class="font-bold text-forest-900">${l.project_type}</div>
          <div class="text-[10px] text-slate-500">${l.area_size}</div>
        </td>
        <td class="p-3 font-medium text-slate-700">${l.location}</td>
        <td class="p-3 text-[11px] text-slate-500 max-w-xs truncate" title="${l.message || ''}">${l.message || 'Standard consultation'}</td>
        <td class="p-3">
          <select onchange="updateLeadStatus(${l.id}, this.value)" class="text-[11px] font-bold p-1 rounded-lg border border-slate-200 bg-white">
            <option value="New Lead" ${l.status === 'New Lead' ? 'selected' : ''}>New Lead</option>
            <option value="Site Visit Scheduled" ${l.status === 'Site Visit Scheduled' ? 'selected' : ''}>Site Visit Scheduled</option>
            <option value="Proposal Sent" ${l.status === 'Proposal Sent' ? 'selected' : ''}>Proposal Sent</option>
            <option value="In Progress" ${l.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
            <option value="Completed" ${l.status === 'Completed' ? 'selected' : ''}>Completed</option>
          </select>
        </td>
        <td class="p-3">
          <a href="https://wa.me/${l.client_phone.replace(/[^0-9]/g, '')}?text=Assalam-o-Alaikum%20${encodeURIComponent(l.client_name)},%20Lahore%20Botanica%20team%20here%20regarding%20your%20${encodeURIComponent(l.project_type)}%20landscaping%20inquiry." target="_blank" class="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold hover:bg-emerald-200 transition">
            Chat
          </a>
        </td>
      </tr>
    `;
  }).join('');
}

async function updateLeadStatus(id, newStatus) {
  try {
    await fetch(`/api/leads/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    await fetchAdminStats();
  } catch (err) {
    console.error('Update lead status error:', err);
  }
}
