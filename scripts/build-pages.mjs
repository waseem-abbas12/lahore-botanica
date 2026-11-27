// Static page generator for The Living Garden.
// Reuses the locked design: header, top bar, footer and bottom nav are copied from public/index.html,
// so every page looks exactly like the home page. Run: node scripts/build-pages.mjs
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { SERVICES, CITY_SERVICE_CITIES, CITY_SERVICE_SLUGS, CITY_ANGLES } from './content/services.mjs';
import { GUIDES, FAQ_GROUPS } from './content/guides.mjs';
import { TOPICS } from './content/topics.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUB = path.join(ROOT, 'public');
const PART = path.join(ROOT, 'scripts', 'partials');
const SITE = (process.env.SITE_URL || 'https://lahore-botanica.vercel.app').replace(/\/$/, '');
const TODAY = new Date().toISOString().slice(0, 10);
const PHONE = '+923008456789';
const WA = '923008456789';
const BRAND = 'The Living Garden';

const ctx = {};
vm.runInNewContext(fs.readFileSync(path.join(PUB, 'cities-data.js'), 'utf8') + ';this.C=PAKISTAN_CITIES;', ctx);
const CITIES = ctx.C;
const cityBy = Object.fromEntries(CITIES.map(c => [c.slug, c]));
const svcBy = Object.fromEntries(SERVICES.map(s => [s.slug, s]));
const SHORT = { 'lawn-grass-installation': 'Lawn Grass Installation', 'villa-farmhouse-landscaping': 'Villa & Farmhouse Landscaping', 'rooftop-terrace-gardens': 'Rooftop Gardens', 'vertical-gardens': 'Vertical Gardens', 'irrigation-sprinkler-systems': 'Sprinkler Systems', 'garden-maintenance': 'Garden Maintenance' };
const shortName = slug => SHORT[slug] || svcBy[slug].name.split(' & ')[0];

// ---------- chrome from index.html ----------
const INDEX = fs.readFileSync(path.join(PUB, 'index.html'), 'utf8');
const cut = (a, b) => { const i = INDEX.indexOf(a); const j = INDEX.indexOf(b, i); if (i < 0 || j < 0) throw new Error('marker ' + a); return INDEX.slice(i, j); };
const TOP = cut('<!-- Top Announcement Bar', '<!-- ==================== MAIN APPLICATION CONTENT');
const BOTTOM = cut('<!-- ==================== FIXED MOBILE BOTTOM', '<!-- Scripts -->');
const partial = n => fs.readFileSync(path.join(PART, n + '.html'), 'utf8');
const CONSULT = partial('consultation');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const waLink = t => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;

function chromeTop(active) {
  let t = TOP;
  if (active) {
    t = t.replace(`class="nav-page-link hover:text-forest-800 transition" data-page="${active}"`,
      `class="nav-page-link text-forest-800 font-bold hover:text-forest-800 transition" data-page="${active}" aria-current="page"`);
  }
  return t;
}
function chromeBottom(active) {
  let b = BOTTOM;
  // home button is highlighted in index; move highlight to the active section
  const bmap = { 'care-guide': 'bnav-care-guide', cities: 'bnav-cities', about: 'bnav-about' };
  if (active !== 'home') {
    b = b.replace('id="bnav-landscaping" class="bnav-btn flex-1 min-h-[52px] justify-center flex flex-col items-center text-forest-800 font-bold',
      'id="bnav-landscaping" class="bnav-btn flex-1 min-h-[52px] justify-center flex flex-col items-center text-charcoal-700');
    if (bmap[active]) b = b.replace(`id="${bmap[active]}" class="bnav-btn flex-1 min-h-[52px] justify-center flex flex-col items-center text-charcoal-700`,
      `id="${bmap[active]}" class="bnav-btn flex-1 min-h-[52px] justify-center flex flex-col items-center text-forest-800 font-bold`);
  }
  return b;
}

// ---------- schema helpers ----------
const ORG = {
  '@type': 'HomeAndConstructionBusiness', '@id': SITE + '/#business', name: BRAND, url: SITE + '/',
  image: SITE + '/brand/og-image.png', logo: SITE + '/brand/logo-mark.png', telephone: PHONE,
  priceRange: 'Rs. 45,000+',
  address: { '@type': 'PostalAddress', addressLocality: 'Lahore', addressRegion: 'Punjab', addressCountry: 'PK' },
  areaServed: CITIES.map(c => ({ '@type': 'City', name: c.name })).concat([{ '@type': 'Country', name: 'Pakistan' }])
};
const crumbs = list => ({ '@type': 'BreadcrumbList', itemListElement: list.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c[0], item: SITE + c[1] })) });
const faqLd = faqs => ({ '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });

// ---------- page shell ----------
const PAGES = []; // for sitemap
function page({ url, title, desc, active = '', ld = [], image = '/brand/og-image.png', body, noindex = false, ogType = 'website', priority = 0.7 }) {
  const canonical = SITE + url;
  const graph = { '@context': 'https://schema.org', '@graph': [ORG, ...ld] };
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  ${noindex ? '<meta name="robots" content="noindex, follow">' : `<link rel="canonical" href="${canonical}">\n  <meta name="robots" content="index, follow, max-image-preview:large">`}
  <meta name="theme-color" content="#133E2B">
  <meta property="og:type" content="${ogType}">
  <meta property="og:site_name" content="${BRAND}">
  <meta property="og:locale" content="en_PK">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:image" content="${SITE}${image.startsWith('/') ? image : '/' + image}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="geo.region" content="PK-PB">
  <meta name="geo.placename" content="Lahore">
  <script type="application/ld+json">${JSON.stringify(graph)}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@500;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/tailwind.css">
  <link rel="stylesheet" href="/styles.css">
  <link rel="manifest" href="/manifest.json">
  <link rel="icon" type="image/svg+xml" href="/brand/app-icon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32.png">
  <link rel="apple-touch-icon" href="/icons/icon-180.png">
</head>
<body class="min-h-screen flex flex-col pb-[76px] lg:pb-0">

  ${chromeTop(active)}
  <main id="main-content" class="flex-grow">
${body}
${noindex ? '' : CONSULT}
  </main>

  ${chromeBottom(active || 'other')}
  <script src="/cities-data.js"></script>
  <script src="/app.js"></script>
</body>
</html>
`;
  const file = url === '/' ? 'index.html' : url.replace(/^\//, '') + '.html';
  const out = path.join(PUB, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html.replace(/src="images\//g, 'src="/images/'));
  if (!noindex) PAGES.push({ url, priority });
}

// ---------- UI blocks (same classes as index.html) ----------
const crumbNav = list => `<nav aria-label="Breadcrumb" class="text-[11px] sm:text-xs text-cream-100/70 flex flex-wrap items-center justify-center gap-1.5">${list.map((c, i) => i < list.length - 1 ? `<a href="${c[1]}" class="hover:text-white underline-offset-2 hover:underline py-2">${esc(c[0])}</a><span aria-hidden="true">/</span>` : `<span class="text-emerald-300 font-semibold">${esc(c[0])}</span>`).join('')}</nav>`;

function hero({ badge, h1a, h1b, lead, list, cta = true }) {
  return `
    <section class="relative bg-gradient-to-b from-forest-900 via-forest-800 to-forest-900 text-cream-50 pt-8 sm:pt-12 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-forest-700">
      <div class="max-w-5xl mx-auto text-center space-y-4">
        ${list ? crumbNav(list) : ''}
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-700/60 border border-forest-600 text-emerald-300 text-[11px] sm:text-xs font-semibold"><span>${badge}</span></div>
        <h1 class="font-serif-luxury text-3xl sm:text-5xl font-bold text-white leading-tight">${esc(h1a)} <span class="italic font-normal text-terracotta">${esc(h1b)}</span></h1>
        <p class="text-cream-100/80 text-xs sm:text-base max-w-3xl mx-auto leading-relaxed">${lead}</p>
        ${cta ? `<div class="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a href="#consultation" class="bg-terracotta hover:bg-terracotta-dark text-white font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition shadow-md">Book Free Site Visit</a>
          <a href="${waLink('Hello The Living Garden, I want to discuss a landscaping project')}" target="_blank" rel="noopener" class="btn-whatsapp px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md"><span>WhatsApp Us</span></a>
        </div>` : ''}
      </div>
    </section>`;
}
const sectionHead = (label, a, b, p = '') => `
          <div class="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <span class="text-terracotta text-[10px] sm:text-xs font-bold uppercase tracking-widest">${label}</span>
            <h2 class="font-serif-luxury text-2xl sm:text-4xl font-bold text-forest-900 mt-1">${esc(a)} <span class="italic font-normal text-terracotta">${esc(b)}</span></h2>
            ${p ? `<p class="text-charcoal-500 text-xs sm:text-sm mt-2 leading-relaxed">${p}</p>` : ''}
          </div>`;
const wrap = (inner, bg = 'bg-cream-100/60') => `
    <section class="py-12 sm:py-16 ${bg} px-3 sm:px-6 lg:px-8 border-b border-cream-200">
      <div class="max-w-7xl mx-auto">${inner}
      </div>
    </section>`;
const ticks = items => `<ul class="space-y-2.5">${items.map(i => `<li class="flex gap-2.5 text-xs sm:text-sm text-charcoal-700 leading-relaxed"><span class="text-terracotta font-bold flex-shrink-0">✦</span><span>${esc(i)}</span></li>`).join('')}</ul>`;

function serviceCard(s, href = `/services/${s.slug}`) {
  return `
            <a href="${href}" class="card-elevation bg-white rounded-2xl overflow-hidden border border-cream-200 flex flex-col group hover:shadow-xl transition-all duration-300">
              <div class="h-44 overflow-hidden relative">
                <img src="/${s.image}" alt="${esc(s.name)}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <span class="absolute top-2.5 left-2.5 bg-forest-900/80 backdrop-blur-sm text-cream-50 text-[10px] font-bold px-2.5 py-0.5 rounded-full">${esc(s.tag)}</span>
              </div>
              <div class="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 class="font-serif-luxury text-base font-bold text-forest-900">${esc(s.name)}</h3>
                  <p class="text-xs text-charcoal-500 mt-1.5 leading-relaxed">${esc(s.short)}</p>
                </div>
                <div class="mt-3 pt-2.5 border-t border-cream-100 text-[11px] text-terracotta font-bold">View details &rarr;</div>
              </div>
            </a>`;
}
function faqBlock(faqs, label = 'Sawal o Jawab', a = 'Frequently Asked', b = 'Questions') {
  return wrap(sectionHead(label, a, b) + `
        <div class="max-w-3xl mx-auto space-y-3">${faqs.map(f => `
          <details class="bg-white rounded-2xl border border-cream-200 p-4 sm:p-5 card-elevation group">
            <summary class="cursor-pointer font-bold text-sm sm:text-base text-forest-900 flex justify-between items-start gap-3 list-none"><span>${esc(f.q)}</span><span class="text-terracotta text-lg leading-none group-open:rotate-45 transition-transform">+</span></summary>
            <p class="text-xs sm:text-sm text-charcoal-700 mt-3 leading-relaxed">${esc(f.a)}</p>
          </details>`).join('')}
        </div>`, 'bg-white');
}
function linkPills(title, links) {
  return `<div class="mt-8"><h3 class="text-xs font-bold uppercase tracking-widest text-charcoal-500 mb-3 text-center">${title}</h3><div class="flex flex-wrap justify-center gap-2">${links.map(([t, h]) => `<a href="${h}" class="px-3.5 py-2 rounded-full bg-white border border-cream-200 text-xs font-semibold text-forest-800 hover:bg-forest-800 hover:text-white transition">${esc(t)}</a>`).join('')}</div></div>`;
}
const cityPills = () => linkPills('Landscaping Across Pakistan', CITIES.map(c => [c.name, '/' + c.slug]));

// =========================== PAGES ===========================

// /services hub
page({
  url: '/services', active: 'services', priority: 0.9,
  title: 'Landscaping Services in Pakistan | Design, Lawns, Hardscape & More | The Living Garden',
  desc: 'All landscaping services by The Living Garden: landscape design, lawn grass, villa and farmhouse gardens, hardscape, pergolas, water features, rooftops, vertical gardens, irrigation, lighting and maintenance.',
  ld: [crumbs([['Home', '/'], ['Services', '/services']]), { '@type': 'ItemList', itemListElement: SERVICES.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/services/${s.slug}`, name: s.name })) }],
  body: hero({ list: [['Home', '/'], ['Services', '/services']], badge: '🇵🇰 Turnkey Landscaping — Nationwide', h1a: 'Landscaping Services', h1b: 'Under One Roof', lead: 'Design se le kar build aur maintenance tak. Choose a service below, or book a free site visit and we will plan the complete garden for you.' })
    + wrap(sectionHead('Scope of Work', '12 Services,', 'One Accountable Team', 'Every service can be booked on its own or combined into a turnkey project.') + `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">${SERVICES.map(s => serviceCard(s)).join('')}
        </div>${linkPills('Popular Searches', TOPICS.map(x => [x.h1a.replace(/^Landscaping in$/, 'Landscaping') + ' ' + x.h1b, '/' + x.slug]))}${cityPills()}`)
});

// /services/<slug>
for (const s of SERVICES) {
  const url = `/services/${s.slug}`;
  const cityLinks = CITY_SERVICE_SLUGS.includes(s.slug) ? CITY_SERVICE_CITIES.map(c => [`${shortName(s.slug)} in ${cityBy[c].name}`, `/${s.slug}-${c}`]) : [];
  const grass = s.grassTable ? `
          <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">${s.grassTable.map(g => `
            <div class="bg-white rounded-2xl border border-cream-200 p-5 card-elevation"><h3 class="font-serif-luxury text-lg font-bold text-forest-900">${esc(g.name)}</h3><div class="text-terracotta font-bold text-sm mt-1">${esc(g.rate)}</div><p class="text-xs text-charcoal-500 mt-2 leading-relaxed">${esc(g.note)}</p></div>`).join('')}
          </div>` : '';
  page({
    url, active: 'services', image: '/' + s.image, priority: 0.85,
    title: s.metaTitle, desc: s.metaDesc,
    ld: [crumbs([['Home', '/'], ['Services', '/services'], [s.name, url]]),
      { '@type': 'Service', '@id': SITE + url + '#service', name: s.name, serviceType: s.name, description: s.metaDesc, image: SITE + '/' + s.image, provider: { '@id': SITE + '/#business' }, areaServed: { '@type': 'Country', name: 'Pakistan' }, url: SITE + url },
      faqLd(s.faqs)],
    body: hero({ list: [['Home', '/'], ['Services', '/services'], [s.name, url]], badge: esc(s.tag) + ' • Nationwide', h1a: s.name.split(' ').slice(0, -2).join(' ') || s.name, h1b: s.name.split(' ').slice(-2).join(' '), lead: esc(s.short) })
      + wrap(`
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div class="space-y-4">
            <span class="text-terracotta text-[10px] sm:text-xs font-bold uppercase tracking-widest">Overview</span>
            <h2 class="font-serif-luxury text-2xl sm:text-3xl font-bold text-forest-900 leading-snug">How We Deliver <span class="italic font-normal text-terracotta">${esc(s.name)}</span></h2>
            ${s.intro.map(p => `<p class="text-sm text-charcoal-700 leading-relaxed">${esc(p)}</p>`).join('')}
            <div class="bg-terracotta-light border border-terracotta/30 rounded-2xl p-4 text-xs sm:text-sm text-charcoal-900 leading-relaxed"><strong class="text-terracotta-dark">Pricing:</strong> ${esc(s.price)}</div>
          </div>
          <div class="rounded-3xl overflow-hidden card-elevation border border-cream-200"><img src="/${s.image}" alt="${esc(s.name)} by The Living Garden" class="w-full h-64 sm:h-96 object-cover"></div>
        </div>${grass}`)
      + wrap(`
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-cream-50 rounded-3xl border border-cream-200 p-5 sm:p-7"><h2 class="font-serif-luxury text-xl sm:text-2xl font-bold text-forest-900 mb-4">What's <span class="italic font-normal text-terracotta">Included</span></h2>${ticks(s.includes)}</div>
          <div class="bg-cream-50 rounded-3xl border border-cream-200 p-5 sm:p-7"><h2 class="font-serif-luxury text-xl sm:text-2xl font-bold text-forest-900 mb-4">Best <span class="italic font-normal text-terracotta">Suited For</span></h2>${ticks(s.bestFor)}</div>
        </div>
        ${processSteps()}`, 'bg-white')
      + faqBlock(s.faqs)
      + wrap(sectionHead('Explore More', 'Related', 'Services') + `
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">${s.related.map(r => serviceCard(svcBy[r])).join('')}</div>
        ${cityLinks.length ? linkPills('Available Locally', cityLinks) : ''}${cityPills()}`)
  });
}

function processSteps() {
  const steps = [['Free site visit', 'Measurements, soil, sun and water check.'], ['Design & quote', 'Layout, plant palette and itemised quote.'], ['Build', 'Soil, irrigation, hardscape, planting and lighting.'], ['Handover & care', 'Walkthrough, care guide and maintenance options.']];
  return `
        <div class="mt-10">
          <h2 class="font-serif-luxury text-xl sm:text-2xl font-bold text-forest-900 text-center mb-6">Our <span class="italic font-normal text-terracotta">4-Step Process</span></h2>
          <ol class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">${steps.map((st, i) => `
            <li class="bg-forest-900 text-cream-50 rounded-2xl p-5"><div class="font-serif-luxury italic text-3xl text-terracotta">0${i + 1}</div><div class="font-bold text-sm mt-1 text-white">${st[0]}</div><p class="text-xs text-cream-100/70 mt-1 leading-relaxed">${st[1]}</p></li>`).join('')}
          </ol>
        </div>`;
}

// /<service>-<city>
for (const c of CITY_SERVICE_CITIES) for (const ss of CITY_SERVICE_SLUGS) {
  const s = svcBy[ss], city = cityBy[c], ang = CITY_ANGLES[c];
  const url = `/${ss}-${c}`;
  const short = shortName(ss);
  const title = `${short} in ${city.name} | ${BRAND}`;
  const desc = `${s.name} in ${city.name} by ${BRAND}: designed for ${city.name}'s climate and soil. Serving ${ang.areas.split(',').slice(0, 3).join(',')} and more. Free site visit.`;
  const faqs = [
    { q: `Do you provide ${short.toLowerCase()} in ${city.name}?`, a: `Yes. ${BRAND} provides ${s.name.toLowerCase()} in ${city.name}, including ${ang.areas}. Book a free site visit to get a plan and an itemised quote.` },
    { q: `What should I keep in mind for ${city.name}'s climate?`, a: ang.challenge + ' ' + ang.water },
    ...s.faqs.slice(0, 2),
    ...(city.faqs || []).slice(0, 1)
  ];
  page({
    url, active: 'services', image: '/' + s.image, priority: 0.8,
    title, desc,
    ld: [crumbs([['Home', '/'], [city.name, '/' + c], [`${short} in ${city.name}`, url]]),
      { '@type': 'Service', name: `${s.name} in ${city.name}`, serviceType: s.name, description: desc, provider: { '@id': SITE + '/#business' }, areaServed: { '@type': 'City', name: city.name }, url: SITE + url },
      faqLd(faqs)],
    body: hero({ list: [['Home', '/'], [city.name, '/' + c], [short, url]], badge: `📍 ${esc(city.name)}, ${esc(city.province.replace(/\s*\(.*\)/, ''))}`, h1a: short, h1b: `in ${city.name}`, lead: `${esc(s.short)} Planned for ${esc(city.name)}'s weather, soil and water.` })
      + wrap(`
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div class="space-y-4">
            <span class="text-terracotta text-[10px] sm:text-xs font-bold uppercase tracking-widest">Local Expertise</span>
            <h2 class="font-serif-luxury text-2xl sm:text-3xl font-bold text-forest-900 leading-snug">${esc(short)} Built for <span class="italic font-normal text-terracotta">${esc(city.name)}</span></h2>
            <p class="text-sm text-charcoal-700 leading-relaxed">${esc(ang.challenge)}</p>
            <p class="text-sm text-charcoal-700 leading-relaxed">${esc(ang.water)}</p>
            <p class="text-sm text-charcoal-700 leading-relaxed">${esc(s.intro[0])}</p>
            <div class="bg-terracotta-light border border-terracotta/30 rounded-2xl p-4 text-xs sm:text-sm text-charcoal-900 leading-relaxed"><strong class="text-terracotta-dark">Pricing:</strong> ${esc(s.price)}</div>
          </div>
          <div class="space-y-4">
            <div class="rounded-3xl overflow-hidden card-elevation border border-cream-200"><img src="/${s.image}" alt="${esc(s.name)} in ${esc(city.name)}" class="w-full h-56 sm:h-72 object-cover"></div>
            <div class="bg-white rounded-2xl border border-cream-200 p-5 text-xs sm:text-sm space-y-2">
              <div><strong class="text-forest-900">Climate:</strong> <span class="text-charcoal-700">${esc(city.climateSummary)}</span></div>
              <div><strong class="text-forest-900">Recommended turf:</strong> <span class="text-charcoal-700">${esc(city.recommendedTurf)}</span></div>
              <div><strong class="text-forest-900">Popular plants:</strong> <span class="text-charcoal-700">${esc(city.popularFlora.join(', '))}</span></div>
            </div>
          </div>
        </div>`)
      + wrap(`
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-cream-50 rounded-3xl border border-cream-200 p-5 sm:p-7"><h2 class="font-serif-luxury text-xl font-bold text-forest-900 mb-4">What's <span class="italic font-normal text-terracotta">Included</span></h2>${ticks(s.includes)}</div>
          <div class="bg-cream-50 rounded-3xl border border-cream-200 p-5 sm:p-7"><h2 class="font-serif-luxury text-xl font-bold text-forest-900 mb-4">${esc(city.name)} <span class="italic font-normal text-terracotta">Tips</span></h2>${ticks(ang.tips)}</div>
          <div class="bg-cream-50 rounded-3xl border border-cream-200 p-5 sm:p-7"><h2 class="font-serif-luxury text-xl font-bold text-forest-900 mb-4">Areas <span class="italic font-normal text-terracotta">We Cover</span></h2>${ticks(ang.areas.split(/, | and /))}</div>
        </div>
        ${processSteps()}`, 'bg-white')
      + faqBlock(faqs)
      + wrap(linkPills(`More Services in ${city.name}`, CITY_SERVICE_SLUGS.filter(x => x !== ss).map(x => [shortName(x), `/${x}-${c}`]))
        + linkPills(`${short} in Other Cities`, CITY_SERVICE_CITIES.filter(x => x !== c).map(x => [cityBy[x].name, `/${ss}-${x}`]))
        + linkPills('Learn More', [[s.name, `/services/${ss}`], [`Landscaping in ${city.name}`, '/' + c], ['All Services', '/services']]))
  });
}

// /plant-care-guide, /about, /cities from the original page content
const subHero = (html) => html.replace(/class="page-view hidden"/g, '');
page({ url: '/plant-care-guide', active: 'care-guide', priority: 0.7,
  title: 'Plant Care Guide for Lahore & Pakistan | Heat, Smog & Plant Doctor | The Living Garden',
  desc: 'Practical plant care for Pakistan\'s climate: summer heat, monsoon and winter smog. Plant doctor for yellow leaves, mealybugs and drooping, plus watering calculator.',
  ld: [crumbs([['Home', '/'], ['Plant Care Guide', '/plant-care-guide']])],
  body: subHero(partial('care')) + wrap(linkPills('Related Guides', GUIDES.map(g => [g.title.split(':')[0], '/blog/' + g.slug]))) });
page({ url: '/about', active: 'about', priority: 0.7,
  title: 'About The Living Garden | Landscape Design & Build Company in Pakistan',
  desc: 'About The Living Garden, a Lahore-based landscape design and build company working across Pakistan, and our Green Pakistan plantation initiative.',
  ld: [crumbs([['Home', '/'], ['About', '/about']]), { '@type': 'AboutPage', url: SITE + '/about', name: 'About The Living Garden', about: { '@id': SITE + '/#business' } }],
  body: subHero(partial('about')) });
const staticCityCards = CITIES.map(c => `<a href="/${c.slug}" class="card-elevation bg-white rounded-2xl border border-cream-200 p-5 block hover:shadow-xl transition"><div class="text-[10px] font-bold uppercase tracking-widest text-terracotta">${esc(c.province)}</div><h3 class="font-serif-luxury text-xl font-bold text-forest-900 mt-1">${esc(c.name)}</h3><p class="text-xs text-charcoal-500 mt-1.5 leading-relaxed">${esc(c.tagline)}</p></a>`).join('');
page({ url: '/cities', active: 'cities', priority: 0.8,
  title: 'Landscaping Across Pakistan | Lahore, Islamabad, Karachi & More | The Living Garden',
  desc: 'The Living Garden landscaping in Lahore, Islamabad, Rawalpindi, Karachi, Faisalabad, Multan, Peshawar, Sialkot and Gujranwala, with city-specific grass, soil and plant advice.',
  ld: [crumbs([['Home', '/'], ['Cities', '/cities']])],
  body: subHero(partial('cities')).replace('<!-- Dynamic city cards rendered via JavaScript -->', staticCityCards) });

// /blog and /blog/<slug>
page({ url: '/blog', priority: 0.8,
  title: 'Landscaping & Garden Guides for Pakistan | The Living Garden Blog',
  desc: 'Expert guides on lawn grass, landscaping cost, lawn care calendar, heat and smog tolerant plants, rooftop waterproofing and irrigation in Pakistan.',
  ld: [crumbs([['Home', '/'], ['Guides', '/blog']]), { '@type': 'Blog', name: 'The Living Garden Guides', url: SITE + '/blog', blogPost: GUIDES.map(g => ({ '@type': 'BlogPosting', headline: g.title, url: `${SITE}/blog/${g.slug}` })) }],
  body: hero({ list: [['Home', '/'], ['Guides', '/blog']], badge: '📚 Garden Knowledge Hub', h1a: 'Landscaping Guides', h1b: 'for Pakistani Gardens', lead: 'Grass, cost, seasons, plants, rooftops aur irrigation par seedhe aur kaam ke jawab, Pakistan ke mausam ke hisab se.', cta: false })
    + wrap(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">${GUIDES.map(g => `
          <a href="/blog/${g.slug}" class="card-elevation bg-white rounded-2xl overflow-hidden border border-cream-200 flex flex-col group hover:shadow-xl transition-all duration-300">
            <div class="h-44 overflow-hidden"><img src="/${g.image}" alt="${esc(g.title)}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"></div>
            <div class="p-4 flex-1 flex flex-col justify-between"><div><div class="text-[10px] font-bold uppercase tracking-widest text-terracotta">${g.readMins} min read</div><h2 class="font-serif-luxury text-base sm:text-lg font-bold text-forest-900 mt-1 leading-snug">${esc(g.title)}</h2><p class="text-xs text-charcoal-500 mt-1.5 leading-relaxed">${esc(g.desc)}</p></div><div class="mt-3 pt-2.5 border-t border-cream-100 text-[11px] text-terracotta font-bold">Read guide &rarr;</div></div>
          </a>`).join('')}
        </div>`) });

for (const g of GUIDES) {
  const url = '/blog/' + g.slug;
  page({ url, image: '/' + g.image, ogType: 'article', priority: 0.75,
    title: `${g.title} | ${BRAND}`, desc: g.desc,
    ld: [crumbs([['Home', '/'], ['Guides', '/blog'], [g.title, url]]),
      { '@type': 'Article', headline: g.title, description: g.desc, image: SITE + '/' + g.image, datePublished: '2026-11-27', dateModified: TODAY, author: { '@type': 'Organization', name: BRAND, url: SITE + '/' }, publisher: { '@id': SITE + '/#business' }, mainEntityOfPage: SITE + url, inLanguage: 'en-PK' },
      faqLd(g.faqs)],
    body: hero({ list: [['Home', '/'], ['Guides', '/blog'], [g.h1b, url]], badge: `📚 ${g.readMins} min read • Updated ${TODAY}`, h1a: g.h1a, h1b: g.h1b, lead: esc(g.desc), cta: false })
      + `
    <article class="py-10 sm:py-14 bg-white px-4 sm:px-6 lg:px-8 border-b border-cream-200">
      <div class="max-w-3xl mx-auto">
        <div class="bg-cream-100/70 border-l-4 border-terracotta rounded-r-2xl p-4 sm:p-5 mb-8"><div class="text-[10px] font-bold uppercase tracking-widest text-terracotta mb-1">Short Answer</div><p class="text-sm text-charcoal-900 leading-relaxed">${esc(g.summary)}</p></div>
        <img src="/${g.image}" alt="${esc(g.title)}" class="w-full h-56 sm:h-80 object-cover rounded-3xl card-elevation mb-8">
        ${g.sections.map(sec => `
        <h2 class="font-serif-luxury text-xl sm:text-2xl font-bold text-forest-900 mt-8 mb-3">${esc(sec.h)}</h2>
        ${(sec.p || []).map(p => `<p class="text-sm sm:text-base text-charcoal-700 leading-relaxed mb-3">${esc(p)}</p>`).join('')}
        ${sec.list ? ticks(sec.list) : ''}`).join('')}
        <div class="mt-10 bg-forest-900 text-cream-50 rounded-3xl p-5 sm:p-7 text-center"><h2 class="font-serif-luxury text-xl sm:text-2xl font-bold text-white">Want This Done <span class="italic font-normal text-terracotta">Professionally?</span></h2><p class="text-xs sm:text-sm text-cream-100/80 mt-2">Book a free site visit and get a plan and itemised quote for your garden.</p><a href="#consultation" class="inline-block mt-4 bg-terracotta hover:bg-terracotta-dark text-white font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition">Book Free Site Visit</a></div>
      </div>
    </article>`
      + faqBlock(g.faqs)
      + wrap(sectionHead('Related', 'Services for', 'This Topic') + `<div class="grid grid-cols-1 sm:grid-cols-3 gap-5">${g.services.map(x => serviceCard(svcBy[x])).join('')}</div>` + linkPills('More Guides', GUIDES.filter(x => x !== g).map(x => [x.title.split(':')[0], '/blog/' + x.slug])))
  });
}

// /faq
const allFaqs = FAQ_GROUPS.flatMap(g => g.items);
page({ url: '/faq', priority: 0.8,
  title: 'Landscaping FAQ Pakistan | Cost, Grass, Rooftops & Maintenance | The Living Garden',
  desc: `Answers to ${allFaqs.length} common landscaping questions in Pakistan: cost, grass price per sq ft, best grass, rooftop seepage, irrigation, timelines and maintenance.`,
  ld: [crumbs([['Home', '/'], ['FAQ', '/faq']]), faqLd(allFaqs)],
  body: hero({ list: [['Home', '/'], ['FAQ', '/faq']], badge: '💬 Sawal o Jawab', h1a: 'Landscaping', h1b: 'Questions, Answered', lead: 'Cost, grass, rooftops, irrigation aur maintenance ke baray me sab se zyada pooche jane wale sawal.' })
    + FAQ_GROUPS.map((g, i) => faqBlock(g.items, `Part ${i + 1}`, g.group.split(' ')[0], g.group.split(' ').slice(1).join(' ') || '')).join('')
});

// /contact
page({ url: '/contact', priority: 0.8,
  title: 'Contact The Living Garden | Book a Free Landscaping Site Visit',
  desc: 'Contact The Living Garden for landscaping in Lahore and across Pakistan. Call or WhatsApp, or book a free site visit online.',
  ld: [crumbs([['Home', '/'], ['Contact', '/contact']]), { '@type': 'ContactPage', url: SITE + '/contact', about: { '@id': SITE + '/#business' } }],
  body: hero({ list: [['Home', '/'], ['Contact', '/contact']], badge: '📞 Free Site Visit', h1a: 'Let\'s Plan', h1b: 'Your Garden', lead: 'Call, WhatsApp ya neeche form bharein. We reply quickly and arrange a free site visit anywhere we operate.' })
    + wrap(`
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
          <a href="tel:${PHONE}" class="card-elevation bg-white rounded-2xl border border-cream-200 p-6 text-center hover:shadow-xl transition"><div class="text-2xl">📞</div><div class="font-serif-luxury text-lg font-bold text-forest-900 mt-2">Call Us</div><div class="text-sm text-charcoal-700 mt-1 font-semibold" data-setting-phone>+92 300 8456789</div></a>
          <a href="https://wa.me/${WA}" target="_blank" rel="noopener" class="card-elevation bg-white rounded-2xl border border-cream-200 p-6 text-center hover:shadow-xl transition"><div class="text-2xl">💬</div><div class="font-serif-luxury text-lg font-bold text-forest-900 mt-2">WhatsApp</div><div class="text-sm text-charcoal-700 mt-1 font-semibold">0300 8456789</div></a>
          <div class="card-elevation bg-white rounded-2xl border border-cream-200 p-6 text-center"><div class="text-2xl">🕒</div><div class="font-serif-luxury text-lg font-bold text-forest-900 mt-2">Office Hours</div><div class="text-sm text-charcoal-700 mt-1">7 days, 8 AM – 9 PM</div><div class="text-xs text-charcoal-500 mt-1">Head office: Lahore</div></div>
        </div>${cityPills()}`)
});

// 404
page({ url: '/404', noindex: true, title: 'Page Not Found | The Living Garden', desc: 'This page could not be found.',
  body: hero({ badge: '404', h1a: 'This Path Is', h1b: 'Overgrown', lead: 'Yeh page nahi mila. Try one of these instead:', cta: false })
    + wrap(linkPills('Popular Pages', [['Home', '/'], ['Services', '/services'], ['Cities', '/cities'], ['Guides', '/blog'], ['FAQ', '/faq'], ['Contact', '/contact']])) });


// ---------- keyword landing pages (price, area, farmhouse, niche) ----------
for (const t of TOPICS) {
  const url = '/' + t.slug;
  const city = t.city ? cityBy[t.city] : null;
  const trail = city ? [['Home', '/'], [city.name, '/' + city.slug], [t.h1b.replace(/^in /, ''), url]] : [['Home', '/'], ['Services', '/services'], [t.h1a + ' ' + t.h1b, url]];
  const table = t.table ? `
        <div class="overflow-x-auto rounded-2xl border border-cream-200 card-elevation bg-white mb-8">
          <table class="w-full text-left text-xs sm:text-sm">
            <thead class="bg-forest-900 text-cream-50"><tr>${t.table.head.map(h => `<th class="px-3 sm:px-4 py-3 font-bold">${esc(h)}</th>`).join('')}</tr></thead>
            <tbody>${t.table.rows.map((r, i) => `<tr class="${i % 2 ? 'bg-cream-50' : 'bg-white'} border-t border-cream-200">${r.map((c, j) => `<td class="px-3 sm:px-4 py-2.5 ${j === 1 ? 'font-bold text-terracotta-dark whitespace-nowrap' : 'text-charcoal-700'}">${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>
          </table>
        </div>
        <p class="text-[11px] text-charcoal-500 -mt-5 mb-8">Indicative rates. Final price is confirmed in an itemised quote after the free site visit.</p>` : '';
  const ld = [crumbs(trail), faqLd(t.faqs),
    { '@type': 'Service', name: t.h1a + ' ' + t.h1b, description: t.desc, provider: { '@id': SITE + '/#business' }, url: SITE + url,
      areaServed: city ? { '@type': 'City', name: city.name } : { '@type': 'Country', name: 'Pakistan' } }];
  if (t.table) ld.push({ '@type': 'Table', about: t.h1a + ' ' + t.h1b });
  page({ url, image: '/' + t.image, priority: 0.85, title: t.metaTitle || t.title, desc: t.desc, active: 'services', ld,
    body: hero({ list: trail, badge: t.badge, h1a: t.h1a, h1b: t.h1b, lead: esc(t.lead) })
      + `
    <section class="py-10 sm:py-14 bg-white px-4 sm:px-6 lg:px-8 border-b border-cream-200">
      <div class="max-w-4xl mx-auto">${table}
        <img src="/${t.image}" alt="${esc(t.h1a + ' ' + t.h1b)}" class="w-full h-56 sm:h-80 object-cover rounded-3xl card-elevation mb-6">
        ${t.sections.map(sec => `
        <h2 class="font-serif-luxury text-xl sm:text-2xl font-bold text-forest-900 mt-8 mb-3">${esc(sec.h)}</h2>
        ${(sec.p || []).map(p => `<p class="text-sm sm:text-base text-charcoal-700 leading-relaxed mb-3">${esc(p)}</p>`).join('')}
        ${sec.list ? ticks(sec.list) : ''}`).join('')}
        ${t.areas ? `<h2 class="font-serif-luxury text-xl sm:text-2xl font-bold text-forest-900 mt-8 mb-3">Areas <span class="italic font-normal text-terracotta">We Serve</span></h2><div class="flex flex-wrap gap-2">${t.areas.map(a => `<span class="px-3 py-1.5 rounded-full bg-cream-100 border border-cream-200 text-xs font-semibold text-forest-800">📍 ${esc(a)}</span>`).join('')}</div>` : ''}
        ${t.sources ? `<p class="text-[11px] text-charcoal-500 mt-8">Market price references: ${t.sources.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener nofollow" class="underline hover:text-forest-800">${esc(n)}</a>`).join(' · ')}</p>` : ''}
      </div>
    </section>`
      + faqBlock(t.faqs)
      + wrap(sectionHead('Related', 'Services', 'We Provide') + `<div class="grid grid-cols-1 sm:grid-cols-3 gap-5">${t.services.map(x => serviceCard(svcBy[x])).join('')}</div>`
        + linkPills('Popular Searches', TOPICS.filter(x => x !== t).map(x => [x.h1a.replace(/^Landscaping in$/, 'Landscaping') + ' ' + x.h1b, '/' + x.slug]))
        + (city ? linkPills(`More in ${city.name}`, [[`Landscaping in ${city.name}`, '/' + city.slug], ...(CITY_SERVICE_CITIES.includes(city.slug) ? CITY_SERVICE_SLUGS.map(x => [`${shortName(x)} in ${city.name}`, `/${x}-${city.slug}`]) : [])]) : cityPills()))
  });
}

// ---------- sitemap, robots, llms.txt ----------
const all = [{ url: '/', priority: 1.0 }, ...CITIES.map(c => ({ url: '/' + c.slug, priority: 0.85 })), ...PAGES];
fs.writeFileSync(path.join(PUB, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all.map(p => `  <url><loc>${SITE}${p.url}</loc><lastmod>${TODAY}</lastmod><priority>${p.priority.toFixed(2)}</priority></url>`).join('\n')}
</urlset>
`);
const bots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'Googlebot'];
fs.writeFileSync(path.join(PUB, 'robots.txt'), `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

# AI search and answer engines are welcome
${bots.map(b => `User-agent: ${b}\nAllow: /\nDisallow: /admin\n`).join('\n')}
Sitemap: ${SITE}/sitemap.xml
`);
fs.writeFileSync(path.join(PUB, 'llms.txt'), `# ${BRAND}

> ${BRAND} is a landscape design and build company headquartered in Lahore, Pakistan, serving clients across Pakistan (Lahore, Islamabad, Rawalpindi, Karachi, Faisalabad, Multan, Peshawar, Sialkot, Gujranwala). It delivers turnkey landscaping projects for homes, farmhouses, rooftops, housing societies and commercial sites. It does not sell individual plants.

Key facts:
- Services: landscape design, lawn grass installation, villa and farmhouse landscaping, hardscape and paving, pergolas and gazebos, water features, vertical gardens, rooftop gardens, irrigation and sprinklers, landscape lighting, garden maintenance, commercial and society landscaping.
- Indicative packages: 5-10 marla front lawn Rs. 45,000-85,000; 1 kanal luxury garden Rs. 140,000-260,000; modern rooftop Rs. 65,000-150,000; farmhouses quoted after site visit.
- Indicative installed grass rates: American Bermuda about Rs. 45/sq ft, Fine Dhaka about Rs. 55/sq ft, Royal Zoysia (Korean) about Rs. 75/sq ft.
- First site visit and consultation are free. Contact: phone/WhatsApp ${PHONE}. Office hours 7 days, 8 AM-9 PM.

## Services
${SERVICES.map(s => `- [${s.name}](${SITE}/services/${s.slug}): ${s.short}`).join('\n')}

## Cities
${CITIES.map(c => `- [Landscaping in ${c.name}](${SITE}/${c.slug}): ${c.tagline}`).join('\n')}

## Local service pages
${CITY_SERVICE_CITIES.flatMap(c => CITY_SERVICE_SLUGS.map(s => `- [${shortName(s)} in ${cityBy[c].name}](${SITE}/${s}-${c})`)).join('\n')}

## Prices, areas and farmhouses
${TOPICS.map(t => `- [${t.h1a} ${t.h1b}](${SITE}/${t.slug}): ${t.desc}`).join('\n')}

## Guides
${GUIDES.map(g => `- [${g.title}](${SITE}/blog/${g.slug}): ${g.summary}`).join('\n')}

## Other
- [FAQ](${SITE}/faq)
- [About](${SITE}/about)
- [Contact](${SITE}/contact)
- [Plant care guide](${SITE}/plant-care-guide)
`);
console.log(`Built ${PAGES.length + 1} pages; sitemap has ${all.length} URLs.`);

// ---------- link the hand-made city pages to services and guides ----------
for (const c of CITIES) {
  const f = path.join(PUB, c.slug + '.html');
  if (!fs.existsSync(f)) continue;
  let h = fs.readFileSync(f, 'utf8').replace(/href="\/#cities"/g, 'href="/cities"').replace(/href="\/#landscaping"/g, 'href="/services"');
  const local = CITY_SERVICE_CITIES.includes(c.slug)
    ? CITY_SERVICE_SLUGS.map(s => [`${shortName(s)} in ${c.name}`, `/${s}-${c.slug}`])
    : SERVICES.slice(0, 8).map(s => [s.name, `/services/${s.slug}`]);
  const pill = ([t, u]) => `<a href="${u}" class="px-3.5 py-2 rounded-full bg-white border border-cream-200 text-xs font-semibold text-forest-800 hover:bg-forest-800 hover:text-white transition">${esc(t)}</a>`;
  const block = `<!-- tlg:links -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
      <h2 class="font-serif-luxury text-xl sm:text-3xl font-bold text-forest-900">Landscaping Services in <span class="italic font-normal text-terracotta">${esc(c.name)}</span></h2>
      <div class="flex flex-wrap justify-center gap-2 mt-5">${local.map(pill).join('')}</div>
      <div class="flex flex-wrap justify-center gap-2 mt-3">${TOPICS.filter(t => t.city === c.slug).map(t => [t.h1a.replace(/^Landscaping in$/, 'Landscaping') + ' ' + t.h1b, '/' + t.slug]).map(pill).join('')}</div>
      <div class="flex flex-wrap justify-center gap-2 mt-3">${[['All Services', '/services'], ['Landscaping Price List', '/landscaping-price-pakistan'], ['Grass Price', '/lawn-grass-price-pakistan'], ['Best Lawn Grass', '/blog/best-lawn-grass-pakistan'], ['FAQ', '/faq'], ['Contact', '/contact']].map(pill).join('')}</div>
    </section>
    <!-- /tlg:links -->`;
  h = h.replace(/<!-- tlg:links -->[\s\S]*?<!-- \/tlg:links -->\n?\s*/, '');
  h = h.replace('</main>', block + '\n  </main>');
  fs.writeFileSync(f, h);
}
