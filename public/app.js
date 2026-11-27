// app.js - The Living Garden public website
(function () {
  'use strict';

  const DEFAULTS = {
    store_name: 'The Living Garden',
    whatsapp: '923008456789',
    phone: '+92 300 8456789'
  };
  const S = Object.assign({}, DEFAULTS);

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = v => String(v === null || v === undefined ? '' : v)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const waNumber = () => String(S.whatsapp || DEFAULTS.whatsapp).replace(/\D/g, '');
  const waLink = text => `https://wa.me/${waNumber()}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
  const rs = n => `Rs. ${Math.round(n).toLocaleString('en-PK')}`;

  // ---------------- settings ----------------
  function applySettings() {
    $$('[data-setting]').forEach(el => {
      const v = S[el.dataset.setting];
      if (v) el.textContent = v;
    });
    const phoneDigits = String(S.phone || '').replace(/\D/g, '');
    $$('a[href^="tel:"]').forEach(a => { if (phoneDigits) a.href = `tel:+${phoneDigits.replace(/^0/, '92')}`; });
    $$('a[href*="wa.me/"]').forEach(a => {
      if (a.id === 'lead-wa') return;
      a.href = a.href.replace(/wa\.me\/\d+/, `wa.me/${waNumber()}`);
    });
    if (S.email) {
      $('#contact-email-row')?.classList.remove('hidden');
      const e = $('#contact-email');
      if (e) { e.textContent = S.email; e.href = `mailto:${S.email}`; }
    }
    let anyStat = false;
    $$('[data-stat]').forEach(el => {
      const v = S[el.dataset.stat];
      if (v) { el.classList.remove('hidden'); $('[data-value]', el).textContent = v; anyStat = true; }
    });
    $('#hero-stats')?.classList.toggle('hidden', !anyStat);
    const social = $('#social-links');
    if (social) {
      social.innerHTML = [['instagram', 'Instagram'], ['facebook', 'Facebook']]
        .filter(([k]) => /^https:\/\//.test(S[k] || ''))
        .map(([k, label]) => `<a href="${esc(S[k])}" target="_blank" rel="noopener" class="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold">${label}</a>`)
        .join('');
    }
  }

  async function loadSettings() {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.success) Object.assign(S, Object.fromEntries(Object.entries(data.settings).filter(([, v]) => v !== '')));
    } catch (e) { /* keep defaults */ }
    applySettings();
  }

  // ---------------- mobile menu ----------------
  function setupMenu() {
    const menu = $('#mobile-menu');
    const backdrop = $('#menu-backdrop');
    const openBtn = $('#menu-open');
    if (!menu || !backdrop || !openBtn) return;

    const isOpen = () => !menu.classList.contains('translate-x-full');
    const open = () => {
      menu.classList.remove('translate-x-full', 'invisible');
      backdrop.classList.remove('hidden');
      document.body.classList.add('menu-open');
      menu.setAttribute('aria-hidden', 'false');
      openBtn.setAttribute('aria-expanded', 'true');
      $('#menu-close')?.focus();
    };
    const close = () => {
      if (!isOpen()) return;
      menu.classList.add('translate-x-full', 'invisible');
      backdrop.classList.add('hidden');
      document.body.classList.remove('menu-open');
      menu.setAttribute('aria-hidden', 'true');
      openBtn.setAttribute('aria-expanded', 'false');
    };

    openBtn.addEventListener('click', open);
    $('#menu-close')?.addEventListener('click', close);
    backdrop.addEventListener('click', close);
    $$('a', menu).forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    // The menu button is hidden on desktop, so never leave the drawer open there
    window.matchMedia('(min-width: 1024px)').addEventListener('change', e => { if (e.matches) close(); });
  }

  // ---------------- active nav on scroll ----------------
  function setupScrollSpy() {
    const links = $$('.nav-link');
    if (!('IntersectionObserver' in window) || !links.length) return;
    const map = new Map(links.map(l => [l.getAttribute('href').slice(1), l]));
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting && map.has(en.target.id)) {
          links.forEach(l => l.classList.remove('active'));
          map.get(en.target.id).classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) obs.observe(s); });
  }

  // ---------------- projects ----------------
  const CATEGORY_LABELS = {
    residential: 'Residential', farmhouse: 'Farmhouse', commercial: 'Commercial', society: 'Society & Parks',
    institutional: 'Institutional', rooftop: 'Rooftop & Vertical', maintenance: 'Maintenance'
  };

  // Shown only until real projects are added in the admin panel. These are examples of the
  // kind of work offered, not claims about specific completed projects.
  const SHOWCASE = [
    { title: 'Villa lawns & entrance landscaping', category: 'residential', images: ['/images/projects/villa-landscaping.jpg'], scope: 'Lawn, pathway, boundary planting' },
    { title: 'Pergolas & outdoor living', category: 'residential', images: ['/images/projects/pergola-gazebo.jpg'], scope: 'Pergola, patio, seating area' },
    { title: 'Resort-style patios', category: 'farmhouse', images: ['/images/projects/resort-patio.jpg'], scope: 'Tropical planting, deck, lounge' },
    { title: 'Parks & green walkways', category: 'society', images: ['/images/projects/commercial-park.jpg'], scope: 'Walking tracks, trees, shrub beds' },
    { title: 'Paver pathways & driveways', category: 'residential', images: ['/images/projects/swimming-pool-garden.jpg', '/images/projects/cobblestone-walkway.jpg'], scope: 'Interlocking pavers, edging' },
    { title: 'Green walls for offices', category: 'commercial', images: ['/images/projects/vertical-green-wall.jpg'], scope: 'Vertical garden with drip irrigation' },
    { title: 'Rooftop & terrace gardens', category: 'rooftop', images: ['/images/projects/rooftop-terrace.jpg'], scope: 'Planters, terrace greening' },
    { title: 'Gravel & xeriscape features', category: 'residential', images: ['/images/projects/rockery-waterfall.jpg'], scope: 'Pebbles, gravel beds, low-water plants' },
    { title: 'Hedges & boundary screening', category: 'farmhouse', images: ['/images/projects/ficus-hedge-retaining.jpg'], scope: 'Ficus and conocarpus hedges' }
  ];

  let projects = [];
  let isShowcase = false;
  let currentFilter = 'all';

  function renderFilters() {
    const box = $('#project-filters');
    if (!box) return;
    const cats = ['all', ...new Set(projects.map(p => p.category))];
    box.innerHTML = cats.length > 2 ? cats.map(c =>
      `<button type="button" role="tab" class="filter-pill" data-filter="${esc(c)}" aria-selected="${c === currentFilter}">${esc(c === 'all' ? 'All' : (CATEGORY_LABELS[c] || c))}</button>`
    ).join('') : '';
    $$('.filter-pill', box).forEach(b => b.addEventListener('click', () => {
      currentFilter = b.dataset.filter;
      renderFilters();
      renderProjects();
    }));
  }

  function renderProjects() {
    const grid = $('#projects-grid');
    if (!grid) return;
    const list = projects.filter(p => currentFilter === 'all' || p.category === currentFilter);
    grid.innerHTML = list.map(p => {
      const idx = projects.indexOf(p);
      const meta = isShowcase
        ? (CATEGORY_LABELS[p.category] || '')
        : [CATEGORY_LABELS[p.category], p.location, p.year].filter(Boolean).join(' · ');
      return `<button type="button" class="project-card" data-idx="${idx}">
        <div class="thumb"><img src="${esc(p.images[0] || '/images/projects/villa-landscaping.jpg')}" alt="${esc(p.title)}" loading="lazy"></div>
        <div class="body">
          <div class="meta">${esc(meta)}</div>
          <h3>${esc(p.title)}</h3>
          ${p.scope ? `<p>${esc(p.scope)}</p>` : ''}
        </div>
      </button>`;
    }).join('');
    $$('.project-card', grid).forEach(c => c.addEventListener('click', () => openProject(Number(c.dataset.idx))));
  }

  async function loadProjects() {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success && data.projects.length) projects = data.projects;
    } catch (e) { /* fall back to showcase */ }
    if (!projects.length) {
      projects = SHOWCASE;
      isShowcase = true;
      $('#projects-title').textContent = 'What we build';
      $('#projects-lead').textContent = 'Examples of the landscapes we design and build. Ask us for photos of completed projects near you.';
    }
    renderFilters();
    renderProjects();
  }

  // ---------------- modals ----------------
  let lastFocus = null;
  function openModal(el) {
    lastFocus = document.activeElement;
    el.classList.add('modal-open');
    document.body.classList.add('menu-open');
    $('[data-close-modal]', el)?.focus();
  }
  function closeModal(el) {
    el.classList.remove('modal-open');
    document.body.classList.remove('menu-open');
    lastFocus?.focus?.();
  }
  function setupModals() {
    $$('#project-modal, #review-modal').forEach(m => {
      m.addEventListener('click', e => { if (e.target === m || e.target.closest('[data-close-modal]')) closeModal(m); });
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') $$('.modal-open').forEach(closeModal);
    });
  }

  let pmProject = null;
  let pmIndex = 0;
  function showPmImage() {
    const imgs = pmProject.images.length ? pmProject.images : ['/images/projects/villa-landscaping.jpg'];
    $('#pm-img').src = imgs[pmIndex % imgs.length];
    $('#pm-img').alt = pmProject.title;
    const multi = imgs.length > 1;
    $('#pm-prev').classList.toggle('hidden', !multi);
    $('#pm-next').classList.toggle('hidden', !multi);
  }
  function openProject(idx) {
    pmProject = projects[idx];
    if (!pmProject) return;
    pmIndex = 0;
    showPmImage();
    const meta = isShowcase ? (CATEGORY_LABELS[pmProject.category] || '') :
      [CATEGORY_LABELS[pmProject.category], pmProject.location, pmProject.year, pmProject.area].filter(Boolean).join(' · ');
    $('#pm-meta').textContent = meta;
    $('#pm-title').textContent = pmProject.title;
    $('#pm-scope').textContent = pmProject.scope ? `Scope: ${pmProject.scope}` : '';
    $('#pm-desc').textContent = pmProject.description || '';
    openModal($('#project-modal'));
  }
  function setupProjectModal() {
    $('#pm-prev')?.addEventListener('click', () => { pmIndex = (pmIndex - 1 + pmProject.images.length) % pmProject.images.length; showPmImage(); });
    $('#pm-next')?.addEventListener('click', () => { pmIndex = (pmIndex + 1) % pmProject.images.length; showPmImage(); });
    $('#pm-cta')?.addEventListener('click', () => {
      closeModal($('#project-modal'));
      prefillLead({ message: `I'd like something similar to: ${pmProject.title}` });
    });
  }

  // ---------------- estimator ----------------
  let lastEstimate = null;
  function calcEstimate() {
    const form = $('#estimator');
    if (!form) return;
    const custom = parseInt($('#est-custom').value, 10);
    const area = custom >= 100 ? custom : parseInt($('input[name="plot"]:checked', form).value, 10);
    const turfRate = parseInt($('#est-turf').value, 10);
    const palms = parseInt($('#est-palms').value, 10);
    $('#est-palms-out').textContent = palms;
    const turf = area * turfRate;
    const palmsCost = palms * 18000;
    const addons = ['#est-rockery', '#est-lights', '#est-sprinklers']
      .map(id => $(id)).filter(c => c.checked).reduce((s, c) => s + parseInt(c.value, 10), 0);
    const total = turf + palmsCost + addons;
    const low = Math.round(total * 0.9 / 1000) * 1000;
    const high = Math.round(total * 1.15 / 1000) * 1000;
    $('#est-range').textContent = `${rs(low)} – ${rs(high)}`;
    $('#est-breakdown').textContent = `Turf ${area.toLocaleString()} sq ft · ${palms} palms/trees · add-ons ${rs(addons)}`;
    const turfName = $('#est-turf').selectedOptions[0].text;
    const extras = [['#est-rockery', 'rockery/water feature'], ['#est-lights', 'lighting'], ['#est-sprinklers', 'sprinklers']]
      .filter(([id]) => $(id).checked).map(([, n]) => n);
    lastEstimate = {
      total,
      text: `Estimator: ${area.toLocaleString()} sq ft ${turfName}, ${palms} palms/trees${extras.length ? ', ' + extras.join(', ') : ''}. Indicative ${rs(low)} – ${rs(high)}.`,
      area: `${area.toLocaleString()} sq ft lawn`
    };
  }
  function setupEstimator() {
    const form = $('#estimator');
    if (!form) return;
    form.addEventListener('input', e => {
      if (e.target.name === 'plot') $('#est-custom').value = '';
      calcEstimate();
    });
    $('#est-cta')?.addEventListener('click', () => {
      if (!lastEstimate) return;
      prefillLead({ project_type: 'Home lawn / villa landscaping', area_size: lastEstimate.area, message: lastEstimate.text, estimate: lastEstimate.total, source: 'estimator' });
    });
    calcEstimate();
  }

  // ---------------- lead form ----------------
  let leadSource = 'consultation';
  function prefillLead(values) {
    const form = $('#lead-form');
    if (!form) return;
    Object.entries(values).forEach(([k, v]) => {
      if (k === 'source') { leadSource = v; return; }
      const el = form.elements[k];
      if (!el) return;
      if (el.tagName === 'SELECT') {
        const opt = Array.from(el.options).find(o => o.text === v || o.value === v);
        if (opt) el.value = opt.value;
      } else if (k === 'message' && el.value && !el.value.includes(v)) {
        el.value = `${v}\n${el.value}`;
      } else {
        el.value = v;
      }
    });
  }

  function setupLeadForm() {
    $$('.prefill-link').forEach(a => a.addEventListener('click', () => {
      prefillLead({ project_type: a.dataset.project, source: a.dataset.project === 'Maintenance contract' ? 'maintenance' : 'consultation' });
    }));
    const form = $('#lead-form');
    if (!form) return;
    const errEl = $('#lead-error');
    form.addEventListener('submit', async e => {
      e.preventDefault();
      errEl.classList.add('hidden');
      $$('.invalid', form).forEach(el => el.classList.remove('invalid'));
      const data = Object.fromEntries(new FormData(form).entries());
      const missing = ['client_name', 'client_phone', 'project_type', 'location'].filter(k => !String(data[k] || '').trim());
      const digits = String(data.client_phone || '').replace(/\D/g, '');
      if (digits && (digits.length < 10 || digits.length > 15)) missing.push('client_phone');
      if (missing.length) {
        missing.forEach(k => form.elements[k]?.classList.add('invalid'));
        errEl.textContent = 'Please fill in your name, a valid phone number, project type and city/area.';
        errEl.classList.remove('hidden');
        form.elements[missing[0]]?.focus();
        return;
      }
      const btn = $('button[type="submit"]', form);
      btn.disabled = true;
      const waText = [
        `Assalam-o-Alaikum ${S.store_name}, I'd like a site visit.`,
        `Name: ${data.client_name}`, `Phone: ${data.client_phone}`, `Project: ${data.project_type}`,
        `Location: ${data.location}`, data.area_size && `Size: ${data.area_size}`, data.budget && `Budget: ${data.budget}`,
        data.timeline && `Start: ${data.timeline}`, data.message && `Details: ${data.message}`
      ].filter(Boolean).join('\n');
      let res = null;
      try {
        res = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, source: leadSource, estimate: data.estimate || (lastEstimate && leadSource === 'estimator' ? lastEstimate.total : 0) })
        });
      } catch (err) { res = null; }
      btn.disabled = false;

      if (res && res.ok) {
        form.reset();
        leadSource = 'consultation';
        $('#lead-wa').href = waLink(waText);
        $('#lead-success').classList.remove('hidden');
        $('#lead-success').scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      if (res && res.status >= 400 && res.status < 500 && res.status !== 404) {
        const body = await res.json().catch(() => ({}));
        errEl.textContent = body.error || 'Could not send the form. Please try again.';
        errEl.classList.remove('hidden');
        return;
      }
      // Server unreachable: hand over to WhatsApp so the enquiry is not lost
      window.open(waLink(waText), '_blank');
      errEl.textContent = 'Our server could not be reached, so we opened WhatsApp with your details instead.';
      errEl.classList.remove('hidden');
    });
  }

  // ---------------- reviews ----------------
  async function loadReviews() {
    const grid = $('#reviews-grid');
    if (!grid) return;
    let reviews = [];
    try {
      const data = await (await fetch('/api/reviews')).json();
      if (data.success) reviews = data.reviews;
    } catch (e) { /* none */ }
    $('#reviews-empty').classList.toggle('hidden', reviews.length > 0);
    grid.innerHTML = reviews.slice(0, 9).map(r => {
      const rating = Math.min(5, Math.max(1, parseInt(r.rating, 10) || 5));
      return `<figure class="review-card">
        <div class="text-amber-500 tracking-wider" aria-label="${rating} out of 5">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>
        <blockquote class="mt-3 text-sm text-charcoal-700 leading-relaxed">“${esc(r.comment)}”</blockquote>
        <figcaption class="mt-4 text-sm font-bold text-forest-900">${esc(r.name)}${r.area ? `<span class="font-normal text-charcoal-500"> · ${esc(r.area)}</span>` : ''}</figcaption>
      </figure>`;
    }).join('');
  }

  function setupReviewForm() {
    $('#review-open')?.addEventListener('click', () => openModal($('#review-modal')));
    const form = $('#review-form');
    if (!form) return;
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const msg = $('#review-msg');
      const data = Object.fromEntries(new FormData(form).entries());
      try {
        const res = await fetch('/api/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        const body = await res.json().catch(() => ({}));
        if (!res.ok || !body.success) throw new Error(body.error || 'Could not submit the review.');
        form.reset();
        msg.className = 'text-sm font-semibold text-forest-700';
        msg.textContent = 'Thank you! Your review will appear after verification.';
      } catch (err) {
        msg.className = 'text-sm font-semibold text-red-600';
        msg.textContent = err.message === 'Failed to fetch' ? 'Could not reach the server. Please try later.' : err.message;
      }
      msg.classList.remove('hidden');
    });
  }

  // ---------------- init ----------------
  document.addEventListener('DOMContentLoaded', () => {
    const y = $('#year'); if (y) y.textContent = new Date().getFullYear();
    // Old single-page links (#admin, #shop...) from the previous site
    if (location.hash === '#admin') { location.replace('/admin'); return; }
    if (/^#(shop|wishlist|track-order|cities|landscaping|landscape-packages)$/.test(location.hash)) {
      history.replaceState(null, '', location.hash === '#landscape-packages' ? '#estimate' : location.hash === '#cities' ? '#areas' : '#services');
      document.getElementById(location.hash.slice(1))?.scrollIntoView();
    }
    setupMenu();
    setupScrollSpy();
    setupModals();
    setupProjectModal();
    setupEstimator();
    setupLeadForm();
    setupReviewForm();
    loadSettings();
    loadProjects();
    loadReviews();
  });
})();
