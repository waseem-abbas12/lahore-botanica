// admin.js - The Living Garden staff portal: leads CRM, projects, reviews, settings
(function () {
  'use strict';

  const LEAD_STATUSES = ['New Lead', 'Contacted', 'Site Visit Scheduled', 'Proposal Sent', 'Won', 'In Progress', 'Completed', 'Lost'];
  const SOURCE_LABELS = {
    consultation: 'Site visit form', estimator: 'Cost estimator', calculator: 'Cost estimator', maintenance: 'Maintenance',
    institutional: 'Institution', membership: 'Membership', city_page: 'City page', whatsapp: 'WhatsApp', other: 'Other'
  };
  const CATEGORY_LABELS = {
    residential: 'Residential', farmhouse: 'Farmhouse', commercial: 'Commercial', society: 'Society & Parks',
    institutional: 'Institutional', rooftop: 'Rooftop & Vertical', maintenance: 'Maintenance'
  };
  const STATUS_COLORS = {
    'New Lead': 'bg-red-100 text-red-700', 'Contacted': 'bg-amber-100 text-amber-800', 'Site Visit Scheduled': 'bg-blue-100 text-blue-800',
    'Proposal Sent': 'bg-indigo-100 text-indigo-800', 'Won': 'bg-emerald-100 text-emerald-800', 'In Progress': 'bg-teal-100 text-teal-800',
    'Completed': 'bg-emerald-200 text-emerald-900', 'Lost': 'bg-slate-200 text-slate-600'
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = v => String(v === null || v === undefined ? '' : v)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const rs = n => `Rs. ${Number(n || 0).toLocaleString('en-PK')}`;
  const fmtDate = d => {
    if (!d) return '';
    const dt = new Date(d);
    return `${dt.toLocaleDateString('en-PK', { day: 'numeric', month: 'short' })}, ${dt.toLocaleTimeString('en-PK', { hour: 'numeric', minute: '2-digit' })}`;
  };
  const waLink = (phone, text) => `https://wa.me/${String(phone || '').replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;

  let settings = { store_name: 'The Living Garden' };
  let leads = [], projects = [], reviews = [];

  async function api(url, options = {}) {
    const res = await fetch(url, { credentials: 'same-origin', ...options, headers: { 'Content-Type': 'application/json', ...(options.headers || {}) } });
    const data = await res.json().catch(() => ({}));
    if (res.status === 401) { showLogin(); throw new Error(data.error || 'Login required'); }
    if (!res.ok || data.success === false) throw new Error(data.error || `Error ${res.status}`);
    return data;
  }

  // ---------- auth ----------
  function showLogin() {
    $('#admin-login-gate').classList.remove('hidden');
    $('#admin-content').classList.add('hidden');
    setTimeout(() => $('#admin-password')?.focus(), 50);
  }
  function showContent() {
    $('#admin-login-gate').classList.add('hidden');
    $('#admin-content').classList.remove('hidden');
  }

  $('#login-form').addEventListener('submit', async e => {
    e.preventDefault();
    const err = $('#admin-login-error');
    err.classList.add('hidden');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: $('#admin-password').value })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.error || 'Login failed');
      $('#admin-password').value = '';
      start();
    } catch (ex) {
      err.textContent = ex.message === 'Failed to fetch' ? 'Server se rabta nahi ho saka' : ex.message;
      err.classList.remove('hidden');
    }
  });

  // ---------- tabs & actions ----------
  function switchTab(name) {
    $$('.admin-tab-btn').forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === name)));
    $$('.admin-tab').forEach(t => t.classList.toggle('hidden', t.id !== `tab-${name}`));
    history.replaceState(null, '', `#${name}`);
  }
  $$('.admin-tab-btn').forEach(b => b.addEventListener('click', () => switchTab(b.dataset.tab)));

  document.addEventListener('click', async e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const { action, id } = btn.dataset;
    if (action === 'refresh') loadAll();
    if (action === 'logout') { await fetch('/api/admin/logout', { method: 'POST', credentials: 'same-origin' }).catch(() => {}); showLogin(); }
    if (action === 'new-project') openEditor();
    if (action === 'edit-project') openEditor(projects.find(p => String(p.id) === id));
    if (action === 'delete-project') deleteProject(Number(id));
    if (action === 'close-editor') closeEditor();
    if (action === 'delete-lead') deleteLead(Number(id));
    if (action === 'approve-review') moderate(Number(id), true);
    if (action === 'hide-review') moderate(Number(id), false);
    if (action === 'delete-review') deleteReview(Number(id));
  });

  // ---------- stats ----------
  async function loadStats() {
    try {
      const { stats } = await api('/api/stats');
      $('#stat-new-leads').textContent = stats.new_leads;
      $('#stat-total-leads').textContent = `${stats.total_leads} total leads`;
      $('#stat-pipeline').textContent = rs(stats.pipeline_value);
      $('#stat-won').textContent = stats.won_leads;
      $('#stat-won-value').textContent = rs(stats.won_value);
      $('#stat-projects').textContent = stats.total_projects;
      $('#stat-reviews').textContent = `${stats.pending_reviews} reviews pending`;
      const badge = $('#badge-reviews');
      badge.textContent = stats.pending_reviews;
      badge.classList.toggle('hidden', !stats.pending_reviews);
    } catch (e) { console.error(e); }
  }

  // ---------- leads ----------
  const lf = $('#leads-filter');
  lf.innerHTML = '<option value="open">Open (active)</option><option value="">All statuses</option>' +
    LEAD_STATUSES.map(s => `<option value="${esc(s)}">${esc(s)}</option>`).join('');
  lf.addEventListener('change', renderLeads);
  $('#leads-search').addEventListener('input', renderLeads);

  async function loadLeads() {
    try { leads = (await api('/api/leads')).leads; renderLeads(); }
    catch (e) { $('#leads-tbody').innerHTML = `<tr><td colspan="8" class="p-6 text-center text-red-600">${esc(e.message)}</td></tr>`; }
  }

  function renderLeads() {
    const q = $('#leads-search').value.toLowerCase().trim();
    const f = lf.value;
    const closed = ['Completed', 'Lost'];
    const list = leads.filter(l =>
      (!f || (f === 'open' ? !closed.includes(l.status) : l.status === f)) &&
      (!q || [l.client_name, l.client_phone, l.location, l.project_type].join(' ').toLowerCase().includes(q)));
    const tbody = $('#leads-tbody');
    if (!list.length) { tbody.innerHTML = '<tr><td colspan="8" class="p-8 text-center text-slate-400">Koi lead nahi mili.</td></tr>'; return; }
    tbody.innerHTML = list.map(l => {
      const msg = `Assalam-o-Alaikum ${l.client_name}, ${settings.store_name} se baat kar rahe hain. Aapki ${l.project_type || 'landscaping'} ki request mili hai. Site visit ke liye kab munasib rahega?`;
      const details = [l.area_size && `📐 ${l.area_size}`, l.budget && `💰 ${l.budget}`, l.timeline && `⏱ ${l.timeline}`, l.preferred_date && `📅 Visit: ${l.preferred_date}`]
        .filter(Boolean).map(esc).join('<br>');
      return `<tr class="align-top hover:bg-slate-50">
        <td class="p-3 text-[10px] text-slate-500 whitespace-nowrap">${esc(fmtDate(l.created_at))}<div class="mt-1 inline-block px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">${esc(SOURCE_LABELS[l.source] || l.source)}</div></td>
        <td class="p-3"><div class="font-bold">${esc(l.client_name)}</div><div class="font-mono text-[10px] text-slate-500">${esc(l.client_phone)}</div>${l.email ? `<div class="text-[10px] text-slate-500">${esc(l.email)}</div>` : ''}</td>
        <td class="p-3"><div class="font-bold text-forest-900">${esc(l.project_type) || '—'}</div><div class="text-[10px] text-slate-500">${esc(l.location)}</div></td>
        <td class="p-3 text-[11px] text-slate-600 max-w-[240px]">${details}${l.message ? `<div class="mt-1 whitespace-pre-line">${esc(l.message)}</div>` : ''}</td>
        <td class="p-3"><input type="number" min="0" value="${Number(l.estimate) || ''}" placeholder="0" data-lead="${l.id}" data-field="estimate" class="lead-input w-24 p-1 rounded border border-slate-200 text-[11px]"></td>
        <td class="p-3"><select data-lead="${l.id}" data-field="status" class="lead-input text-[11px] font-bold p-1 rounded-lg border border-slate-200 ${STATUS_COLORS[l.status] || ''}">
          ${LEAD_STATUSES.map(s => `<option value="${esc(s)}" ${l.status === s ? 'selected' : ''}>${esc(s)}</option>`).join('')}</select></td>
        <td class="p-3"><textarea rows="2" data-lead="${l.id}" data-field="admin_notes" placeholder="Follow-up notes…" class="lead-input w-40 p-1 rounded border border-slate-200 text-[11px]">${esc(l.admin_notes)}</textarea></td>
        <td class="p-3 space-y-1 whitespace-nowrap">
          <a href="${esc(waLink(l.client_phone, msg))}" target="_blank" rel="noopener" class="block text-center px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold">WhatsApp</a>
          <a href="tel:+${esc(String(l.client_phone).replace(/\D/g, ''))}" class="block text-center px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold">Call</a>
          <button type="button" data-action="delete-lead" data-id="${l.id}" class="block w-full text-center text-[10px] text-red-500">Delete</button>
        </td></tr>`;
    }).join('');
    $$('.lead-input', tbody).forEach(el => el.addEventListener('change', () => updateLead(Number(el.dataset.lead), { [el.dataset.field]: el.value }, el.dataset.field === 'status')));
  }

  async function updateLead(id, changes, rerender) {
    try {
      await api(`/api/leads/${id}`, { method: 'PUT', body: JSON.stringify(changes) });
      Object.assign(leads.find(l => l.id === id) || {}, changes);
      if (rerender) renderLeads();
      loadStats();
    } catch (e) { alert(e.message); }
  }
  async function deleteLead(id) {
    if (!confirm('Yeh lead hamesha ke liye delete karni hai?')) return;
    try { await api(`/api/leads/${id}`, { method: 'DELETE' }); leads = leads.filter(l => l.id !== id); renderLeads(); loadStats(); }
    catch (e) { alert(e.message); }
  }

  // ---------- projects ----------
  async function loadProjects() {
    try { projects = (await api('/api/projects?all=1')).projects; renderProjects(); }
    catch (e) { $('#projects-list').innerHTML = `<div class="p-6 text-center text-red-600 text-xs">${esc(e.message)}</div>`; }
  }
  function renderProjects() {
    const box = $('#projects-list');
    if (!projects.length) {
      box.innerHTML = '<div class="p-8 text-center text-xs text-slate-500">Abhi koi project nahi. "+ Add Project" se apna pehla mukammal project daalein. Jab tak koi project nahi hota, website par sirf misaal ke taur par stock images dikhti hain.</div>';
      return;
    }
    box.innerHTML = projects.map(p => `
      <div class="p-3 sm:p-4 flex items-center gap-4 text-xs ${p.active ? '' : 'opacity-50'}">
        <img src="${esc(p.images[0] || '/icons/icon-192.png')}" alt="" class="w-20 h-16 rounded-xl object-cover bg-slate-100 shrink-0">
        <div class="flex-1 min-w-0">
          <div class="font-bold text-sm truncate">${esc(p.title)} ${p.featured ? '⭐' : ''}</div>
          <div class="text-slate-500">${esc([CATEGORY_LABELS[p.category], p.location, p.year, p.area].filter(Boolean).join(' · '))}</div>
          <div class="text-slate-400">${p.images.length} photo(s) · ${p.active ? 'Live' : 'Hidden'}</div>
        </div>
        <div class="flex gap-2 shrink-0">
          <button type="button" data-action="edit-project" data-id="${p.id}" class="admin-btn">Edit</button>
          <button type="button" data-action="delete-project" data-id="${p.id}" class="admin-btn !text-red-600">Delete</button>
        </div>
      </div>`).join('');
  }

  const editor = $('#project-editor');
  const pform = $('#project-form');
  function openEditor(p) {
    pform.reset();
    $('#project-form-error').classList.add('hidden');
    $('#project-form-title').textContent = p ? 'Edit project' : 'Add project';
    pform.elements.id.value = p ? p.id : '';
    if (p) {
      ['title', 'category', 'location', 'year', 'area', 'scope', 'description', 'sort_order'].forEach(k => { pform.elements[k].value = p[k] ?? ''; });
      pform.elements.images.value = (p.images || []).join('\n');
      pform.elements.active.checked = !!p.active;
      pform.elements.featured.checked = !!p.featured;
    }
    editor.classList.add('modal-open');
    pform.elements.title.focus();
  }
  function closeEditor() { editor.classList.remove('modal-open'); }
  editor.addEventListener('click', e => { if (e.target === editor) closeEditor(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeEditor(); });

  pform.addEventListener('submit', async e => {
    e.preventDefault();
    const f = pform.elements;
    const payload = {
      title: f.title.value.trim(), category: f.category.value, location: f.location.value.trim(), year: f.year.value.trim(),
      area: f.area.value.trim(), scope: f.scope.value.trim(), description: f.description.value.trim(),
      images: f.images.value.split(/\n|,/).map(s => s.trim()).filter(Boolean),
      sort_order: parseInt(f.sort_order.value, 10) || 0, active: f.active.checked, featured: f.featured.checked
    };
    const bad = payload.images.filter(u => !/^(https:\/\/|\/)/.test(u));
    if (bad.length) {
      $('#project-form-error').textContent = `Yeh photo links sahi nahi (https:// se shuru hone chahiyein): ${bad.join(', ')}`;
      $('#project-form-error').classList.remove('hidden');
      return;
    }
    try {
      const id = f.id.value;
      await api(id ? `/api/projects/${id}` : '/api/projects', { method: id ? 'PUT' : 'POST', body: JSON.stringify(payload) });
      closeEditor();
      loadProjects();
      loadStats();
    } catch (ex) {
      $('#project-form-error').textContent = ex.message;
      $('#project-form-error').classList.remove('hidden');
    }
  });

  async function deleteProject(id) {
    const p = projects.find(x => x.id === id);
    if (!confirm(`"${p ? p.title : 'Project'}" delete karna hai? (Sirf chhupane ke liye Edit → "Live" hata dein)`)) return;
    try { await api(`/api/projects/${id}`, { method: 'DELETE' }); loadProjects(); loadStats(); }
    catch (e) { alert(e.message); }
  }

  // ---------- reviews ----------
  async function loadReviews() {
    try { reviews = (await api('/api/reviews?all=1')).reviews; renderReviews(); } catch (e) { console.error(e); }
  }
  function renderReviews() {
    const box = $('#reviews-list');
    if (!reviews.length) { box.innerHTML = '<div class="p-8 text-center text-xs text-slate-400">Abhi koi review nahi.</div>'; return; }
    box.innerHTML = reviews.map(r => `
      <div class="p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs ${r.approved ? '' : 'bg-amber-50/60'}">
        <div>
          <div class="font-bold">${esc(r.name)} <span class="font-normal text-slate-500">· ${esc(r.area)}</span> <span class="text-amber-500">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span></div>
          <p class="mt-1 text-slate-700">${esc(r.comment)}</p>
          <div class="mt-1 text-[10px] text-slate-400">${esc(fmtDate(r.created_at))}</div>
        </div>
        <div class="flex gap-2 shrink-0">
          ${r.approved ? `<button type="button" data-action="hide-review" data-id="${r.id}" class="admin-btn">Hide</button>`
            : `<button type="button" data-action="approve-review" data-id="${r.id}" class="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold">Approve</button>`}
          <button type="button" data-action="delete-review" data-id="${r.id}" class="admin-btn !text-red-600">Delete</button>
        </div>
      </div>`).join('');
  }
  async function moderate(id, approved) {
    try { await api(`/api/reviews/${id}`, { method: 'PUT', body: JSON.stringify({ approved }) }); loadReviews(); loadStats(); }
    catch (e) { alert(e.message); }
  }
  async function deleteReview(id) {
    if (!confirm('Review delete karna hai?')) return;
    try { await api(`/api/reviews/${id}`, { method: 'DELETE' }); loadReviews(); loadStats(); }
    catch (e) { alert(e.message); }
  }

  // ---------- settings ----------
  async function loadSettings() {
    try {
      settings = Object.assign(settings, (await api('/api/settings')).settings);
      const form = $('#settings-form');
      Object.entries(settings).forEach(([k, v]) => { if (form.elements[k]) form.elements[k].value = v; });
      $$('[data-setting]').forEach(el => { if (settings[el.dataset.setting]) el.textContent = settings[el.dataset.setting]; });
    } catch (e) { console.error(e); }
  }
  $('#settings-form').addEventListener('submit', async e => {
    e.preventDefault();
    const payload = {};
    Array.from(e.target.elements).forEach(el => { if (el.name) payload[el.name] = el.value; });
    try {
      await api('/api/settings', { method: 'PUT', body: JSON.stringify(payload) });
      $('#settings-saved').classList.remove('hidden');
      setTimeout(() => $('#settings-saved').classList.add('hidden'), 2500);
      loadSettings();
    } catch (ex) { alert(ex.message); }
  });

  // ---------- boot ----------
  function loadAll() {
    fetch('/api/health').then(r => r.json()).then(h => $('#admin-db-warning').classList.toggle('hidden', !!h.durable)).catch(() => {});
    return Promise.allSettled([loadStats(), loadLeads(), loadProjects(), loadReviews(), loadSettings()]);
  }
  function start() {
    showContent();
    const tab = location.hash.slice(1);
    switchTab(['leads', 'projects', 'reviews', 'settings'].includes(tab) ? tab : 'leads');
    loadAll();
  }
  fetch('/api/admin/me', { credentials: 'same-origin' })
    .then(r => r.json()).then(d => (d.admin ? start() : showLogin()))
    .catch(showLogin);
})();
