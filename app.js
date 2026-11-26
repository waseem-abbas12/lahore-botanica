// app.js - Fast Storefront, Multi-Angle Shopify-Style Modal, Cart & Landscaping Slider
const FALLBACK_PLANTS = [
  {
    id: 1,
    name: 'Fiddle Leaf Fig',
    botanical_name: 'Ficus Lyrata',
    urdu_name: 'فڈل لیف فکس',
    category: 'indoor',
    price: 3200,
    stock: 25,
    description: 'Lahore ke modern homes aur drawing rooms ka shandaar statement plant. Iske baray violin-shape leaves interior ko luxury look dete hain. Bright indirect light pasand karta hai.',
    sunlight: 'partial_shade',
    water: 'moderate',
    difficulty: 'Moderate',
    pet_friendly: 0,
    lahore_hardy: 1,
    images: [
      'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1597055181300-e3633a207518?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1000&auto=format&fit=crop'
    ],
    variants: {
      sizes: [
        { name: 'Medium (2-3 ft)', price_delta: 0 },
        { name: 'Large Specimen (4-5 ft)', price_delta: 2400 },
        { name: 'Executive Tree (6+ ft)', price_delta: 4800 }
      ],
      pots: [
        { name: 'Standard Nursery Grower Pot', price_delta: 0 },
        { name: 'Handcrafted Terracotta Clay Pot', price_delta: 750 },
        { name: 'Luxury White Ceramic Planter', price_delta: 1450 }
      ]
    },
    featured: 1
  },
  {
    id: 2,
    name: 'Motia / Arabian Jasmine',
    botanical_name: 'Jasminum Sambac',
    urdu_name: 'موتیا کا پودا',
    category: 'flowering',
    price: 850,
    stock: 60,
    description: 'Lahore ki khushbu aur riwayat ka ahem hissa. Iske sufed phool shaam ko intihai dilkash khushbu phelaate hain. Garmi aur dhoop ko asani se bardasht karta hai.',
    sunlight: 'full_sun',
    water: 'moderate',
    difficulty: 'Easy',
    pet_friendly: 1,
    lahore_hardy: 1,
    images: [
      'https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1000&auto=format&fit=crop'
    ],
    variants: {
      sizes: [
        { name: 'Standard Bush (1.5 ft)', price_delta: 0 },
        { name: 'Mature Bush with Flower Buds', price_delta: 450 }
      ],
      pots: [
        { name: 'Nursery Bag / Pot', price_delta: 0 },
        { name: 'Desi Red Clay Gamla (12-inch)', price_delta: 350 }
      ]
    },
    featured: 1
  },
  {
    id: 3,
    name: 'Monstera Deliciosa (Swiss Cheese)',
    botanical_name: 'Monstera Deliciosa',
    urdu_name: 'مانسٹرا ڈیلیکوسا',
    category: 'indoor',
    price: 2800,
    stock: 18,
    description: 'Dunya ka sab se mashhoor tropical indoor plant. Iske natural cuts walay patte gharon aur offices mein visual architectural look paida karte hain. Low maintenance plant hai.',
    sunlight: 'partial_shade',
    water: 'low',
    difficulty: 'Easy',
    pet_friendly: 0,
    lahore_hardy: 1,
    images: [
      'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?q=80&w=1000&auto=format&fit=crop'
    ],
    variants: {
      sizes: [
        { name: 'Medium (4-5 leaves)', price_delta: 0 },
        { name: 'Large with Moss Stick (3-4 ft)', price_delta: 1950 }
      ],
      pots: [
        { name: 'Grower Pot', price_delta: 0 },
        { name: 'Ribbed Terracotta Pot', price_delta: 850 },
        { name: 'Matte Black Designer Planter', price_delta: 1600 }
      ]
    },
    featured: 1
  },
  {
    id: 4,
    name: 'Bougainvillea (Kagazi Phool)',
    botanical_name: 'Bougainvillea Spectabilis',
    urdu_name: 'بوگن ویلیا / کاغذی پھول',
    category: 'flowering',
    price: 1200,
    stock: 40,
    description: 'Lahore ki shadeed dhoop aur garmi ka champion climber. Magenta, Red aur Orange phoolon se bhari bel jo deewaron, gates aur terraces ko behad khoobsurat banati hai.',
    sunlight: 'full_sun',
    water: 'low',
    difficulty: 'Easy',
    pet_friendly: 1,
    lahore_hardy: 1,
    images: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1000&auto=format&fit=crop'
    ],
    variants: {
      sizes: [
        { name: 'Medium Trellis Creeper (3 ft)', price_delta: 0 },
        { name: 'Established Tall Creeper (6 ft)', price_delta: 900 }
      ],
      pots: [
        { name: 'Nursery Container', price_delta: 0 },
        { name: 'Large Clay Planter', price_delta: 600 }
      ]
    },
    featured: 1
  },
  {
    id: 5,
    name: 'Royal Date Palm (Landscape Specimen)',
    botanical_name: 'Phoenix Dactylifera',
    urdu_name: 'کھجور کا درخت (لینڈ سکیپ)',
    category: 'trees_palms',
    price: 18500,
    stock: 12,
    description: 'Villas, Farmhouses aur boundary walls ke liye luxury landscape palm tree. Fully root-trained, Lahore ke mosam me 100% kamyab. Installation aur fertilizer support sath shamil hai.',
    sunlight: 'full_sun',
    water: 'low',
    difficulty: 'Easy',
    pet_friendly: 1,
    lahore_hardy: 1,
    images: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1000&auto=format&fit=crop'
    ],
    variants: {
      sizes: [
        { name: 'Medium Trunk (6-8 ft Trunk)', price_delta: 0 },
        { name: 'Mature Architectural Trunk (10-12 ft)', price_delta: 14000 }
      ],
      pots: [
        { name: 'Field Balled & Burlapped (Ready for Soil Planting)', price_delta: 0 },
        { name: 'Giant Concrete Landscape Planter', price_delta: 4500 }
      ]
    },
    featured: 1
  },
  {
    id: 6,
    name: 'Snake Plant (Sansevieria Laurentii)',
    botanical_name: 'Dracaena Trifasciata',
    urdu_name: 'سنیک پلانٹ',
    category: 'indoor',
    price: 1450,
    stock: 45,
    description: 'Ghar ke andar hawa saaf karne wala no. 1 plant (NASA Certified). Agar 3 haftay paani na dein tab bhi khilta rehta hai. AC wale kamron ke liye best.',
    sunlight: 'low_light',
    water: 'low',
    difficulty: 'Easy',
    pet_friendly: 0,
    lahore_hardy: 1,
    images: [
      'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572688484438-313a6e50c333?q=80&w=1000&auto=format&fit=crop'
    ],
    variants: {
      sizes: [
        { name: 'Standard 3-Stem (1.5 ft)', price_delta: 0 },
        { name: 'Lush Multi-Stem Clump (2.5 ft)', price_delta: 850 }
      ],
      pots: [
        { name: 'Basic Nursery Pot', price_delta: 0 },
        { name: 'Modern Fluted Ceramic Pot', price_delta: 950 }
      ]
    },
    featured: 0
  },
  {
    id: 7,
    name: 'Areca Palm (Golden Cane)',
    botanical_name: 'Dypsis Lutescens',
    urdu_name: 'ایریکا پام',
    category: 'trees_palms',
    price: 2400,
    stock: 30,
    description: 'Lush, dense feathery foliage jo living rooms aur verandas ko tropical resort jaisi look deti hai. Natural humidifier hai jo indoor moisture behtar banata hai.',
    sunlight: 'partial_shade',
    water: 'moderate',
    difficulty: 'Easy',
    pet_friendly: 1,
    lahore_hardy: 1,
    images: [
      'https://images.unsplash.com/photo-1617173944883-6ffbd35d584d?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1000&auto=format&fit=crop'
    ],
    variants: {
      sizes: [
        { name: 'Dense Bush (3 ft)', price_delta: 0 },
        { name: 'Tall Decorative Floor Specimen (5 ft)', price_delta: 1600 }
      ],
      pots: [
        { name: 'Grower Pot', price_delta: 0 },
        { name: 'Earthy Clay Pot with Tray', price_delta: 750 }
      ]
    },
    featured: 0
  },
  {
    id: 8,
    name: 'Desi Lemon / Citrus Limon',
    botanical_name: 'Citrus × Limon',
    urdu_name: 'دیسی لیموں کا پودا',
    category: 'fruit_herbs',
    price: 950,
    stock: 35,
    description: 'Ghar ke lawn aur rooftop ke liye behad faidamand fruit plant. Saal mein 2 se 3 dafa rasbhare lassan-chilli compatible desi leemo deta hai.',
    sunlight: 'full_sun',
    water: 'moderate',
    difficulty: 'Easy',
    pet_friendly: 0,
    lahore_hardy: 1,
    images: [
      'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=1000&auto=format&fit=crop'
    ],
    variants: {
      sizes: [
        { name: 'Grafted Bush with initial fruits (2 ft)', price_delta: 0 },
        { name: 'Mature Heavy Bearer (4 ft)', price_delta: 850 }
      ],
      pots: [
        { name: 'Grower Polybag', price_delta: 0 },
        { name: '14-Inch Terracotta Fruit Tub', price_delta: 650 }
      ]
    },
    featured: 0
  },
  {
    id: 9,
    name: 'Desi Gulab (Fragrant Damask Rose)',
    botanical_name: 'Rosa Damascena',
    urdu_name: 'دیسی گلاب',
    category: 'flowering',
    price: 650,
    stock: 50,
    description: 'Khaalis desi mehkta hua gulab. Iske phoolon se arq-e-gulab aur gulkand banta hai. Lahore ke baghaat ki shaan aur hamesha bahaar phool.',
    sunlight: 'full_sun',
    water: 'moderate',
    difficulty: 'Easy',
    pet_friendly: 1,
    lahore_hardy: 1,
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1496062031456-07b8f162a322?q=80&w=1000&auto=format&fit=crop'
    ],
    variants: {
      sizes: [
        { name: 'Bloomed Stem Plant', price_delta: 0 },
        { name: 'Twin Cluster Specimen', price_delta: 400 }
      ],
      pots: [
        { name: 'Nursery Bag', price_delta: 0 },
        { name: 'Traditional Clay Gamla', price_delta: 300 }
      ]
    },
    featured: 0
  },
  {
    id: 10,
    name: 'ZZ Plant (Fortune Tree)',
    botanical_name: 'Zamioculcas Zamiifolia',
    urdu_name: 'زی زی پلانٹ',
    category: 'indoor',
    price: 2200,
    stock: 22,
    description: 'Shandar glossy dark green leaves. Kam roshni aur kam paani mein bhi hamesha taza rehta hai. Offices aur bedrooms ke corners ke liye perfect aesthetic plant.',
    sunlight: 'low_light',
    water: 'low',
    difficulty: 'Easy',
    pet_friendly: 0,
    lahore_hardy: 1,
    images: [
      'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598880940371-c756e015fea1?q=80&w=1000&auto=format&fit=crop'
    ],
    variants: {
      sizes: [
        { name: 'Bushy Tabletop (1.5 ft)', price_delta: 0 },
        { name: 'Floor Accent Large (2.5 ft)', price_delta: 1200 }
      ],
      pots: [
        { name: 'Nursery Pot', price_delta: 0 },
        { name: 'Minimalist White Ceramic Planter', price_delta: 950 }
      ]
    },
    featured: 0
  }
];

let allPlants = [];
let cart = [];
try {
  cart = JSON.parse(localStorage.getItem('lahore_botanica_cart') || '[]');
} catch (e) {
  cart = [];
}

let currentModalPlant = null;
let currentAngleIndex = 0;
let selectedSizeIndex = 0;
let selectedPotIndex = 0;
let modalQty = 1;
let searchDebounceTimer = null;
let touchStartX = 0;
let touchEndX = 0;

function getCombinedPlants() {
  let custom = [];
  try {
    custom = JSON.parse(localStorage.getItem('lahore_botanica_custom_plants') || '[]');
  } catch (e) {
    custom = [];
  }
  return [...custom, ...FALLBACK_PLANTS];
}

// Initialize on page load & URL Routing
document.addEventListener('DOMContentLoaded', () => {
  fetchPlants();
  updateCartBadge();
  initBeforeAfterSlider();
  setupGalleryTouchGestures();
  handleRoute();
});

window.addEventListener('hashchange', handleRoute);
window.addEventListener('popstate', handleRoute);

function handleRoute() {
  const rawHash = window.location.hash.replace('#', '') || 'shop';
  
  if (rawHash.startsWith('city-')) {
    const slug = rawHash.replace('city-', '').toLowerCase();
    renderCityDetailPage(slug);
    navigateToPage('city-detail', false);
    return;
  }
  
  if (rawHash === 'cities') {
    renderCitiesDirectory();
    navigateToPage('cities', false);
    return;
  }
  
  navigateToPage(rawHash, false);
}

function navigateToPage(pageId, updateHash = true) {
  const validPages = ['shop', 'landscaping', 'care-guide', 'track-order', 'about', 'admin', 'cities', 'city-detail'];
  if (!validPages.includes(pageId)) pageId = 'shop';

  // Toggle page visibility
  validPages.forEach(p => {
    const el = document.getElementById(`page-${p}`);
    if (el) el.classList.toggle('hidden', p !== pageId);
  });

  // Update hash
  if (updateHash && window.location.hash !== `#${pageId}`) {
    history.pushState(null, '', `#${pageId}`);
  }

  // Desktop Nav Highlight
  document.querySelectorAll('.nav-page-link').forEach(link => {
    const isCurrent = link.getAttribute('data-page') === pageId;
    link.classList.toggle('text-forest-800', isCurrent);
    link.classList.toggle('font-bold', isCurrent);
    link.classList.toggle('text-charcoal-700', !isCurrent);
  });

  // Mobile Bottom Nav Highlight
  document.querySelectorAll('.bnav-btn').forEach(btn => {
    btn.classList.remove('text-forest-800', 'font-bold');
    btn.classList.add('text-charcoal-700');
  });
  const activeBnav = document.getElementById(`bnav-${pageId}`);
  if (activeBnav) {
    activeBnav.classList.add('text-forest-800', 'font-bold');
    activeBnav.classList.remove('text-charcoal-700');
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Re-sync slider if entering landscaping page
  if (pageId === 'landscaping') {
    setTimeout(() => {
      const container = document.getElementById('ba-slider');
      const beforeImg = document.getElementById('ba-before-img');
      if (container && beforeImg) {
        beforeImg.style.width = `${container.offsetWidth}px`;
      }
    }, 120);
  }

  // If opening admin, load admin dashboard
  if (pageId === 'admin') {
    if (typeof loadAdminDashboard === 'function') loadAdminDashboard();
  }
}

function toggleMobileSideMenu(open) {
  const menu = document.getElementById('mobile-side-menu');
  const backdrop = document.getElementById('mobile-menu-backdrop');
  if (!menu || !backdrop) return;

  if (open) {
    backdrop.classList.remove('hidden');
    menu.classList.remove('-translate-x-full');
    menu.classList.add('translate-x-0');
    document.body.style.overflow = 'hidden';
  } else {
    backdrop.classList.add('hidden');
    menu.classList.remove('translate-x-0');
    menu.classList.add('-translate-x-full');
    document.body.style.overflow = '';
  }
}

function handleMenuSearch(e) {
  if (e.key === 'Enter') {
    const query = e.target.value.trim();
    if (!query) return;
    toggleMobileSideMenu(false);
    navigateToPage('shop');
    const heroInput = document.getElementById('hero-search-input');
    if (heroInput) {
      heroInput.value = query;
      executeHeroSearch();
    }
  }
}

function calculatePlantCare() {
  const plant = document.getElementById('calc-plant')?.value || 'ficus';
  const env = document.getElementById('calc-env')?.value || 'ac_room';
  const resultBox = document.getElementById('calc-result');
  const resultText = document.getElementById('calc-result-text');

  if (!resultBox || !resultText) return;

  let watering = '💧 Paani: Haftay mein 1 dafa (Halka paani).';
  let light = '☀️ Dhoop: Bright indirect roshni.';
  let fertilizer = '🌱 Khaad: Har 4 haftay baad organic cow compost.';
  let extraTip = '🌿 Smog Tip: Haftay me 1 dafa patton ko spray se dho lein taake pores khulay rahein.';

  if (plant === 'ficus') {
    if (env === 'hot_lawn') {
      watering = '💧 Paani: Rozana subah 7 AM se pehle achi tarha paani dein (Direct afternoon dhoop se bachayein warna leaves burn honge).';
      light = '☀️ Dhoop: 40% Green shade net ke neeche rakhein.';
    } else if (env === 'ac_room') {
      watering = '💧 Paani: 7 se 9 din baad (Pehla inch mitti dry hone par). AC vent ke direct agay na rakhein.';
      light = '☀️ Dhoop: Khirki ke paas jahan roshni aati ho.';
    }
  } else if (plant === 'motia') {
    watering = '💧 Paani: Garmiyon me rozana shaam ko paani dein taake phoolon ki khushbu taza rahe.';
    light = '☀️ Dhoop: Full 5-6 ghante direct dhoop (Phool aane ke liye zaroori hai).';
    fertilizer = '🌱 Khaad: Mustard oil cake (Sarson khali) liquid khad 15 din baad dein.';
  } else if (plant === 'snake') {
    watering = '💧 Paani: 15 se 20 din baad paani dein. Overwatering se root rot hoti hai.';
    light = '🛋️ Dhoop: Kam roshni ya AC office me bhi shandaar rehta hai.';
  } else if (plant === 'palm') {
    watering = '💧 Paani: Haftay mein 2 dafa deep watering.';
    light = '☀️ Dhoop: Balcony ya lawn me 4-5 ghante dhoop.';
  }

  resultText.innerHTML = `
    <div class="font-bold text-white text-sm mb-1">🌿 Lahore Horticulture Care Advice:</div>
    <div class="space-y-1">
      <div>${watering}</div>
      <div>${light}</div>
      <div>${fertilizer}</div>
      <div class="text-emerald-300 font-semibold">${extraTip}</div>
    </div>
  `;
  resultBox.classList.remove('hidden');
}

function checkOrderStatus() {
  const input = document.getElementById('track-order-input')?.value.trim();
  const box = document.getElementById('track-result-box');
  const numEl = document.getElementById('track-order-num');
  const statusEl = document.getElementById('track-order-status');

  if (!input) {
    alert('Please enter your Order # or Phone Number.');
    return;
  }

  if (box && numEl && statusEl) {
    numEl.innerText = `Order: ${input.toUpperCase()}`;
    statusEl.innerText = 'Out for Delivery with Lahore Rider';
    box.classList.remove('hidden');
  }
}

// Fetch Plants with fallback to embedded data
async function fetchPlants() {
  const grid = document.getElementById('plants-grid');
  if (grid) grid.innerHTML = '<div class="col-span-full py-12 text-center text-charcoal-500 font-medium">Loading nursery catalog...</div>';

  const search = document.getElementById('hero-search-input')?.value.trim().toLowerCase() || '';
  const activeCatBtn = document.querySelector('.cat-pill.active');
  const category = activeCatBtn ? activeCatBtn.getAttribute('data-cat') || 'all' : 'all';
  const sunlight = document.querySelector('input[name="sunlight_filter"]:checked')?.value || '';
  const water = document.querySelector('input[name="water_filter"]:checked')?.value || '';
  const petCheck = document.getElementById('pet-friendly-check')?.checked;
  const sort = document.getElementById('sort-select')?.value || 'featured';

  try {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category && category !== 'all') params.append('category', category);
    if (sunlight) params.append('sunlight', sunlight);
    if (water) params.append('water', water);
    if (petCheck) params.append('pet_friendly', '1');
    params.append('sort', sort);

    const res = await fetch(`/api/plants?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.plants && data.plants.length > 0) {
        allPlants = data.plants;
        renderPlantsGrid(allPlants);
        return;
      }
    }
    throw new Error('API unavailable, using fallback data');
  } catch (err) {
    // Client-side filtering on embedded catalog for Vercel static hosting
    let filtered = getCombinedPlants();

    if (search) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(search) || 
        (p.botanical_name && p.botanical_name.toLowerCase().includes(search)) ||
        (p.urdu_name && p.urdu_name.includes(search)) ||
        (p.description && p.description.toLowerCase().includes(search))
      );
    }

    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }

    if (sunlight) {
      filtered = filtered.filter(p => p.sunlight === sunlight);
    }

    if (water) {
      filtered = filtered.filter(p => p.water === water);
    }

    if (petCheck) {
      filtered = filtered.filter(p => p.pet_friendly === 1);
    }

    if (sort === 'price_asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else {
      filtered.sort((a, b) => b.featured - a.featured);
    }

    allPlants = filtered;
    renderPlantsGrid(allPlants);
  }
}

// Render Plant Cards (Strongly Mobile Responsive 2-Column Grid)
function renderPlantsGrid(plants) {
  const grid = document.getElementById('plants-grid');
  if (!grid) return;

  if (!plants || plants.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center space-y-3">
        <div class="text-4xl">🪴</div>
        <div class="font-serif-luxury text-xl font-bold text-forest-900">No matching plants found</div>
        <p class="text-xs text-charcoal-500">Try adjusting your sunlight, category, or search filters.</p>
        <button onclick="resetFilters()" class="text-xs text-terracotta font-bold underline">Clear All Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = plants.map(plant => {
    const mainImg = plant.images[0] || 'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=800';
    const anglesCount = plant.images.length || 1;

    let sunlightLabel = '☀️ Sun';
    if (plant.sunlight === 'partial_shade') sunlightLabel = '⛅ Shade';
    if (plant.sunlight === 'low_light') sunlightLabel = '🛋️ Indoor';

    let waterLabel = '💧 Low';
    if (plant.water === 'moderate') waterLabel = '💧 Moderate';
    if (plant.water === 'high') waterLabel = '💧 High';

    const wishlisted = isWishlisted(plant.id);

    return `
      <div class="card-elevation rounded-2xl overflow-hidden flex flex-col group bg-white shadow-xs">
        <div class="relative h-40 sm:h-64 overflow-hidden bg-cream-100 cursor-pointer" onclick="openProductModal(${plant.id})">
          <img src="${mainImg}" alt="${plant.name}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=600';" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
          
          <div class="absolute top-2 left-2 sm:top-3 sm:left-3 bg-black/60 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow">
            <svg class="w-2.5 h-2.5 sm:w-3 sm:h-3 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>
            <span>${anglesCount} Angles</span>
          </div>

          <!-- Wishlist Heart Toggle Button -->
          <button onclick="toggleWishlist(${plant.id}, event)" class="btn-wishlist ${wishlisted ? 'active' : ''} absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-charcoal-700 hover:text-rose-600 flex items-center justify-center shadow transition" title="Add to Wishlist">
            <svg class="w-4 h-4 ${wishlisted ? 'text-rose-600 fill-rose-600' : 'text-charcoal-700'}" fill="${wishlisted ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </button>

          ${plant.featured ? `
            <div class="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-terracotta text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
              Hot
            </div>
          ` : ''}

          <div class="hidden sm:flex absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center p-4">
            <span class="bg-white/95 text-forest-900 text-xs font-bold px-4 py-2 rounded-xl shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
              Inspect Angles & Pots
            </span>
          </div>
        </div>

        <div class="p-3 sm:p-5 flex-grow flex flex-col justify-between space-y-2 sm:space-y-3">
          <div>
            <div class="flex items-center justify-between text-[10px] sm:text-[11px]">
              <span class="text-charcoal-500 italic truncate max-w-[90px] sm:max-w-none">${plant.botanical_name || ''}</span>
              <span class="font-semibold text-forest-700" dir="rtl">${plant.urdu_name || ''}</span>
            </div>
            
            <h3 class="font-serif-luxury text-sm sm:text-lg font-bold text-forest-900 hover:text-terracotta transition cursor-pointer mt-0.5 line-clamp-1" onclick="openProductModal(${plant.id})">
              ${plant.name}
            </h3>

            <div class="flex flex-wrap items-center gap-1 mt-1 sm:mt-2">
              <span class="badge-care text-[9px] sm:text-[10px] px-1.5 py-0.5">${sunlightLabel}</span>
              <span class="badge-care text-[9px] sm:text-[10px] px-1.5 py-0.5">${waterLabel}</span>
            </div>
          </div>

          <div class="pt-2 sm:pt-3 border-t border-cream-100 flex items-center justify-between">
            <div>
              <div class="text-[9px] sm:text-[10px] text-charcoal-500 uppercase font-semibold">Price</div>
              <div class="text-sm sm:text-lg font-bold text-forest-900">Rs. ${plant.price.toLocaleString()}</div>
            </div>

            <div class="flex items-center gap-1">
              <button onclick="openProductModal(${plant.id})" class="p-1.5 sm:p-2 rounded-xl bg-cream-100 hover:bg-cream-200 text-forest-900 transition" title="View Angles & Options">
                <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              </button>
              <button onclick="quickAddToCart(${plant.id})" class="bg-forest-800 hover:bg-forest-700 text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl transition shadow-sm flex items-center gap-1">
                <span>+ Add</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    `;
  }).join('');
}

// Category Filter Click
function filterByCategory(cat) {
  document.querySelectorAll('.cat-pill').forEach(btn => {
    btn.classList.remove('active', 'bg-forest-800', 'text-white');
    btn.classList.add('bg-cream-100', 'text-charcoal-700');
  });

  const selectedBtn = Array.from(document.querySelectorAll('.cat-pill')).find(b => b.innerText.toLowerCase().includes(cat.toLowerCase()) || (cat === 'all' && b.innerText.includes('All')));
  if (selectedBtn) {
    selectedBtn.classList.add('active', 'bg-forest-800', 'text-white');
    selectedBtn.classList.remove('bg-cream-100', 'text-charcoal-700');
    selectedBtn.setAttribute('data-cat', cat);
  }

  fetchPlants();
}

function applyFilters() {
  fetchPlants();
}

function resetFilters() {
  const searchInput = document.getElementById('hero-search-input');
  if (searchInput) searchInput.value = '';

  const fullSunRadio = document.querySelector('input[name="sunlight_filter"][value=""]');
  if (fullSunRadio) fullSunRadio.checked = true;

  const waterRadio = document.querySelector('input[name="water_filter"][value=""]');
  if (waterRadio) waterRadio.checked = true;

  const petCheck = document.getElementById('pet-friendly-check');
  if (petCheck) petCheck.checked = false;

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) sortSelect.value = 'featured';

  filterByCategory('all');
}

function setFilterSearch(keyword) {
  const searchInput = document.getElementById('hero-search-input');
  if (searchInput) {
    searchInput.value = keyword;
    fetchPlants();
    document.getElementById('plants-section')?.scrollIntoView({ behavior: 'smooth' });
  }
}

function handleLiveSearch(query) {
  const clearBtn = document.getElementById('search-clear-btn');
  if (clearBtn) {
    clearBtn.classList.toggle('hidden', !query.trim());
  }

  clearTimeout(searchDebounceTimer);
  searchDebounceTimer = setTimeout(() => {
    fetchPlants();
  }, 250);
}

function clearHeroSearch() {
  const input = document.getElementById('hero-search-input');
  if (input) {
    input.value = '';
    handleLiveSearch('');
    input.focus();
  }
}

function handleHeroSearch(e) {
  if (e.key === 'Enter') {
    executeHeroSearch();
  }
}

function executeHeroSearch() {
  fetchPlants();
  document.getElementById('plants-section')?.scrollIntoView({ behavior: 'smooth' });
}

// ==================== SHOPIFY-STYLE PRODUCT DETAIL MODAL ====================
function openProductModal(id) {
  const plant = allPlants.find(p => p.id === id) || FALLBACK_PLANTS.find(p => p.id === id);
  if (!plant) return;

  currentModalPlant = plant;
  selectedSizeIndex = 0;
  selectedPotIndex = 0;
  modalQty = 1;
  currentAngleIndex = 0;

  const modal = document.getElementById('product-modal');
  modal.classList.remove('hidden');

  const hdr = document.getElementById('modal-header-name');
  if (hdr) hdr.innerText = plant.name;

  document.getElementById('modal-title').innerText = plant.name;
  document.getElementById('modal-botanical').innerText = plant.botanical_name || '';
  document.getElementById('modal-urdu').innerText = plant.urdu_name || '';
  document.getElementById('modal-category').innerText = plant.category.replace('_', ' ');
  document.getElementById('modal-description').innerText = plant.description;
  document.getElementById('modal-stock').innerText = `In Stock (${plant.stock} Available in Lahore)`;
  document.getElementById('modal-qty').innerText = modalQty;

  let sunText = '☀️ Full Sun';
  if (plant.sunlight === 'partial_shade') sunText = '⛅ Partial Shade (Balcony)';
  if (plant.sunlight === 'low_light') sunText = '🛋️ Indoor Light Safe';
  document.getElementById('badge-sun').innerText = sunText;

  let waterText = '💧 Low Water Need';
  if (plant.water === 'moderate') waterText = '💧💧 Moderate Watering';
  if (plant.water === 'high') waterText = '💧💧💧 High Moisture';
  document.getElementById('badge-water').innerText = waterText;

  document.getElementById('badge-pet').innerText = plant.pet_friendly ? '🐾 Safe for Cats & Dogs' : '⚠️ Keep away from pets';
  document.getElementById('badge-hardy').innerText = plant.lahore_hardy ? '🌡️ Lahore Summer Hardy' : '🌡️ Indoor AC recommended';

  const images = plant.images && plant.images.length > 0 ? plant.images : [
    'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1000'
  ];

  setModalAngle(0);

  const thumbContainer = document.getElementById('modal-thumbnails');
  thumbContainer.innerHTML = images.map((img, idx) => `
    <button onclick="setModalAngle(${idx})" class="w-16 h-16 rounded-xl overflow-hidden border-2 ${idx === 0 ? 'border-forest-800 ring-2 ring-forest-800/20' : 'border-cream-200'} transition hover:border-forest-700 flex-shrink-0">
      <img src="${img}" alt="Angle ${idx + 1}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=200';" class="w-full h-full object-cover">
    </button>
  `).join('');

  renderModalOptions(plant);
  calculateModalPrice();
}

function setModalAngle(index) {
  if (!currentModalPlant) return;
  const images = currentModalPlant.images || [];
  if (images.length === 0) return;
  currentAngleIndex = index;
  const imgUrl = images[index] || images[0];

  const mainImg = document.getElementById('modal-main-img');
  if (mainImg) {
    mainImg.src = imgUrl;
    mainImg.onerror = () => { mainImg.src = 'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=800'; };
  }

  const label = document.getElementById('modal-angle-label');
  const angleNames = ['Front Full View', 'Leaf Texture & Foliage Close-Up', 'Living Room / Interior Perspective', 'Pot & Root Angle'];
  if (label) {
    label.innerText = `Angle ${index + 1} of ${images.length} (${angleNames[index] || 'Angle View'}) - Swipe ⇄ to Change`;
  }

  const thumbs = document.querySelectorAll('#modal-thumbnails button');
  thumbs.forEach((t, i) => {
    if (i === index) {
      t.className = 'w-16 h-16 rounded-xl overflow-hidden border-2 border-forest-800 ring-2 ring-forest-800/20 transition flex-shrink-0';
    } else {
      t.className = 'w-16 h-16 rounded-xl overflow-hidden border-2 border-cream-200 opacity-70 hover:opacity-100 transition flex-shrink-0';
    }
  });
}

function setupGalleryTouchGestures() {
  const container = document.querySelector('.gallery-container');
  if (!container) return;

  container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGallerySwipe();
  }, { passive: true });
}

function handleGallerySwipe() {
  if (!currentModalPlant) return;
  const images = currentModalPlant.images || [];
  if (images.length <= 1) return;

  const diffX = touchEndX - touchStartX;
  if (Math.abs(diffX) > 40) {
    if (diffX < 0) {
      // Swiped Left -> Next Angle
      const nextIdx = (currentAngleIndex + 1) % images.length;
      setModalAngle(nextIdx);
    } else {
      // Swiped Right -> Previous Angle
      const prevIdx = (currentAngleIndex - 1 + images.length) % images.length;
      setModalAngle(prevIdx);
    }
  }
}

function renderModalOptions(plant) {
  const sizes = plant.variants?.sizes || [{ name: 'Standard Nursery Size', price_delta: 0 }];
  const pots = plant.variants?.pots || [{ name: 'Standard Grower Pot', price_delta: 0 }];

  const sizesContainer = document.getElementById('modal-sizes-group');
  sizesContainer.innerHTML = sizes.map((s, idx) => `
    <label class="p-2.5 rounded-xl border-2 ${idx === selectedSizeIndex ? 'border-forest-800 bg-forest-800/5 text-forest-900 font-bold' : 'border-cream-200 text-charcoal-700'} flex items-center justify-between cursor-pointer transition">
      <input type="radio" name="variant_size" value="${idx}" ${idx === selectedSizeIndex ? 'checked' : ''} onchange="onSizeSelect(${idx})" class="hidden">
      <span>${s.name}</span>
      <span class="text-xs text-charcoal-500">${s.price_delta > 0 ? `+Rs. ${s.price_delta.toLocaleString()}` : 'Included'}</span>
    </label>
  `).join('');

  const potsContainer = document.getElementById('modal-pots-group');
  potsContainer.innerHTML = pots.map((p, idx) => `
    <label class="p-2.5 rounded-xl border-2 ${idx === selectedPotIndex ? 'border-terracotta bg-terracotta/5 text-charcoal-900 font-bold' : 'border-cream-200 text-charcoal-700'} flex items-center justify-between cursor-pointer transition">
      <div class="flex items-center gap-2">
        <input type="radio" name="variant_pot" value="${idx}" ${idx === selectedPotIndex ? 'checked' : ''} onchange="onPotSelect(${idx})" class="hidden">
        <span>🪴 ${p.name}</span>
      </div>
      <span class="text-xs font-semibold text-terracotta-dark">${p.price_delta > 0 ? `+Rs. ${p.price_delta.toLocaleString()}` : 'Free'}</span>
    </label>
  `).join('');
}

function onSizeSelect(index) {
  selectedSizeIndex = index;
  renderModalOptions(currentModalPlant);
  calculateModalPrice();
}

function onPotSelect(index) {
  selectedPotIndex = index;
  renderModalOptions(currentModalPlant);
  calculateModalPrice();
}

function adjustModalQty(delta) {
  modalQty = Math.max(1, modalQty + delta);
  document.getElementById('modal-qty').innerText = modalQty;
  calculateModalPrice();
}

function calculateModalPrice() {
  if (!currentModalPlant) return 0;
  const basePrice = currentModalPlant.price;
  const sizeDelta = currentModalPlant.variants?.sizes?.[selectedSizeIndex]?.price_delta || 0;
  const potDelta = currentModalPlant.variants?.pots?.[selectedPotIndex]?.price_delta || 0;
  
  const unitPrice = basePrice + sizeDelta + potDelta;
  const totalPrice = unitPrice * modalQty;

  document.getElementById('modal-price').innerText = `Rs. ${totalPrice.toLocaleString()}`;
  return unitPrice;
}

function closeProductModal() {
  document.getElementById('product-modal').classList.add('hidden');
  currentModalPlant = null;
}

function addModalItemToCart() {
  if (!currentModalPlant) return;

  const unitPrice = calculateModalPrice() / modalQty;
  const sizeName = currentModalPlant.variants?.sizes?.[selectedSizeIndex]?.name || 'Standard';
  const potName = currentModalPlant.variants?.pots?.[selectedPotIndex]?.name || 'Nursery Pot';

  const cartItem = {
    id: currentModalPlant.id,
    name: currentModalPlant.name,
    urdu_name: currentModalPlant.urdu_name || '',
    image: currentModalPlant.images[0],
    price: unitPrice,
    size: sizeName,
    pot: potName,
    quantity: modalQty
  };

  const existingIdx = cart.findIndex(c => c.id === cartItem.id && c.size === cartItem.size && c.pot === cartItem.pot);
  if (existingIdx > -1) {
    cart[existingIdx].quantity += modalQty;
  } else {
    cart.push(cartItem);
  }

  saveCart();
  closeProductModal();
  toggleCartDrawer(true);
}

function quickAddToCart(id) {
  const plant = allPlants.find(p => p.id === id) || FALLBACK_PLANTS.find(p => p.id === id);
  if (!plant) return;

  const cartItem = {
    id: plant.id,
    name: plant.name,
    urdu_name: plant.urdu_name || '',
    image: plant.images[0],
    price: plant.price,
    size: plant.variants?.sizes?.[0]?.name || 'Standard',
    pot: plant.variants?.pots?.[0]?.name || 'Nursery Pot',
    quantity: 1
  };

  const existingIdx = cart.findIndex(c => c.id === cartItem.id && c.size === cartItem.size && c.pot === cartItem.pot);
  if (existingIdx > -1) {
    cart[existingIdx].quantity += 1;
  } else {
    cart.push(cartItem);
  }

  saveCart();
  toggleCartDrawer(true);
}

function orderModalItemViaWhatsApp() {
  if (!currentModalPlant) return;
  const unitPrice = calculateModalPrice() / modalQty;
  const sizeName = currentModalPlant.variants?.sizes?.[selectedSizeIndex]?.name || 'Standard';
  const potName = currentModalPlant.variants?.pots?.[selectedPotIndex]?.name || 'Nursery Pot';

  const text = `🌿 *Order Inquiry - Lahore Botanica*
-------------------------
*Plant:* ${currentModalPlant.name} (${currentModalPlant.urdu_name || ''})
*Size:* ${sizeName}
*Pot:* ${potName}
*Quantity:* ${modalQty}
*Total Estimated Price:* Rs. ${(unitPrice * modalQty).toLocaleString()}
-------------------------
Please confirm stock availability and delivery schedule in Lahore.`;

  const url = `https://wa.me/923008456789?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

// ==================== CART DRAWER OPERATIONS ====================
function toggleCartDrawer(open) {
  const drawer = document.getElementById('cart-drawer');
  if (open) {
    renderCart();
    drawer.classList.remove('hidden');
  } else {
    drawer.classList.add('hidden');
  }
}

function saveCart() {
  try {
    localStorage.setItem('lahore_botanica_cart', JSON.stringify(cart));
  } catch (e) {}
  updateCartBadge();
}

function updateCartBadge() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cart-count-badge');
  if (badge) badge.innerText = totalCount;
  const mobileBadge = document.getElementById('cart-count-badge-mobile');
  if (mobileBadge) mobileBadge.innerText = totalCount;
}

// Mobile Filter Drawer Handlers
function openMobileFilterDrawer() {
  document.getElementById('mobile-filter-drawer-backdrop')?.classList.remove('hidden');
  const drawer = document.getElementById('mobile-filter-drawer');
  if (drawer) {
    drawer.classList.remove('translate-y-full');
    drawer.classList.add('translate-y-0');
  }
}

function closeMobileFilterDrawer() {
  document.getElementById('mobile-filter-drawer-backdrop')?.classList.add('hidden');
  const drawer = document.getElementById('mobile-filter-drawer');
  if (drawer) {
    drawer.classList.remove('translate-y-0');
    drawer.classList.add('translate-y-full');
  }
}

function syncMobileFilter(type, value) {
  if (type === 'sunlight') {
    const radio = document.querySelector(`input[name="sunlight_filter"][value="${value}"]`);
    if (radio) radio.checked = true;
  } else if (type === 'water') {
    const radio = document.querySelector(`input[name="water_filter"][value="${value}"]`);
    if (radio) radio.checked = true;
  } else if (type === 'pet') {
    const check = document.getElementById('pet-friendly-check');
    if (check) check.checked = !!value;
  } else if (type === 'hardy') {
    const check = document.getElementById('lahore-hardy-check');
    if (check) check.checked = !!value;
  }
}

function renderCart() {
  const container = document.getElementById('cart-items-container');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 space-y-3">
        <div class="text-4xl">🪴</div>
        <div class="font-serif-luxury text-lg font-bold text-forest-900">Your Cart is Empty</div>
        <p class="text-xs text-charcoal-500">Pick beautiful healthy plants to green up your space.</p>
        <button onclick="toggleCartDrawer(false)" class="text-xs font-bold text-terracotta underline">Explore Nursery Catalog</button>
      </div>
    `;
    updateCartTotals(0);
    return;
  }

  container.innerHTML = cart.map((item, idx) => `
    <div class="flex items-center gap-3 p-3 bg-cream-50 rounded-2xl border border-cream-200">
      <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-xl object-cover bg-white">
      <div class="flex-grow">
        <div class="font-serif-luxury font-bold text-sm text-forest-900">${item.name}</div>
        <div class="text-[10px] text-charcoal-500">${item.size} • ${item.pot}</div>
        <div class="text-xs font-bold text-forest-800 mt-1">Rs. ${(item.price * item.quantity).toLocaleString()}</div>
      </div>
      <div class="flex flex-col items-end gap-1.5">
        <button onclick="removeCartItem(${idx})" class="text-xs text-red-500 hover:text-red-700 p-1">✕</button>
        <div class="flex items-center border border-cream-200 bg-white rounded-lg text-xs">
          <button onclick="updateCartItemQty(${idx}, -1)" class="px-2 py-0.5 font-bold">-</button>
          <span class="px-1.5 font-bold">${item.quantity}</span>
          <button onclick="updateCartItemQty(${idx}, 1)" class="px-2 py-0.5 font-bold">+</button>
        </div>
      </div>
    </div>
  `).join('');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  updateCartTotals(subtotal);
}

function updateCartItemQty(index, delta) {
  if (cart[index]) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    saveCart();
    renderCart();
  }
}

function removeCartItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function updateCartTotals(subtotal) {
  const deliveryFee = subtotal === 0 ? 0 : (subtotal >= 3500 ? 0 : 250);
  const total = subtotal + deliveryFee;

  const subEl = document.getElementById('cart-subtotal');
  const delEl = document.getElementById('cart-delivery');
  const totEl = document.getElementById('cart-total');

  if (subEl) subEl.innerText = `Rs. ${subtotal.toLocaleString()}`;
  if (delEl) delEl.innerText = deliveryFee === 0 ? 'FREE (Special Offer)' : `Rs. ${deliveryFee}`;
  if (totEl) totEl.innerText = `Rs. ${total.toLocaleString()}`;
}

async function placeOnlineOrder() {
  const name = document.getElementById('cust-name').value.trim();
  const phone = document.getElementById('cust-phone').value.trim();
  const area = document.getElementById('cust-area').value;
  const address = document.getElementById('cust-address').value.trim();
  const payment = document.getElementById('cust-payment').value;

  if (!name || !phone || !address) {
    alert('Please enter your Name, Phone Number, and Complete Address for delivery.');
    return;
  }

  if (cart.length === 0) {
    alert('Your cart is empty.');
    return;
  }

  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_name: name,
        customer_phone: phone,
        customer_address: address,
        lahore_area: area,
        payment_method: payment,
        items: cart
      })
    });

    if (!res.ok) {
      throw new Error(`Server status: ${res.status}`);
    }

    const data = await res.json();
    if (data.success) {
      alert(`🎉 Order Confirmed!\nYour Order Number is: ${data.order_number}\nTotal Amount: Rs. ${data.total.toLocaleString()}\nOur nursery rider will deliver to your Lahore address.`);
      cart = [];
      saveCart();
      toggleCartDrawer(false);
      return;
    } else {
      throw new Error(data.error || 'Server rejected order');
    }
  } catch (err) {
    // If backend API is offline or not present on static Vercel, forward to WhatsApp automatically!
    checkoutViaWhatsApp();
  }
}

function checkoutViaWhatsApp() {
  const name = document.getElementById('cust-name')?.value.trim() || 'Customer';
  const phone = document.getElementById('cust-phone')?.value.trim() || 'N/A';
  const area = document.getElementById('cust-area')?.value || 'Lahore';
  const address = document.getElementById('cust-address')?.value.trim() || 'Lahore';

  if (cart.length === 0) {
    alert('Your cart is empty.');
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const delivery = subtotal >= 3500 ? 0 : 250;
  const total = subtotal + delivery;

  let itemsText = cart.map(item => `• ${item.quantity}x ${item.name} (${item.size}, ${item.pot}) - Rs. ${(item.price * item.quantity).toLocaleString()}`).join('\n');

  const text = `🌿 *New Plant Order - Lahore Botanica*
-------------------------
*Customer:* ${name}
*Phone:* ${phone}
*Address:* ${address}, ${area}
-------------------------
*Ordered Plants:*
${itemsText}
-------------------------
*Subtotal:* Rs. ${subtotal.toLocaleString()}
*Delivery Fee:* ${delivery === 0 ? 'FREE' : 'Rs. ' + delivery}
*Net Payable:* Rs. ${total.toLocaleString()}
*Payment:* Cash on Delivery in Lahore
-------------------------
Please confirm order dispatch.`;

  window.open(`https://wa.me/923008456789?text=${encodeURIComponent(text)}`, '_blank');
}

// ==================== INTERACTIVE BEFORE / AFTER SLIDER ====================
function initBeforeAfterSlider() {
  const container = document.getElementById('ba-slider');
  const beforeWrapper = document.getElementById('ba-before-wrapper');
  const handle = document.getElementById('ba-handle');

  if (!container || !beforeWrapper || !handle) return;

  const syncBeforeImgWidth = () => {
    const beforeImg = document.getElementById('ba-before-img');
    if (beforeImg && container) {
      beforeImg.style.width = `${container.offsetWidth}px`;
    }
  };

  syncBeforeImgWidth();
  window.addEventListener('resize', syncBeforeImgWidth);

  let isDragging = false;

  const moveSlider = (clientX) => {
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 10) x = 10;
    if (x > rect.width - 10) x = rect.width - 10;

    const percent = (x / rect.width) * 100;
    beforeWrapper.style.width = `${percent}%`;
    handle.style.left = `${percent}%`;
  };

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    moveSlider(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    moveSlider(e.clientX);
  });

  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    moveSlider(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    moveSlider(e.touches[0].clientX);
  }, { passive: true });
}

// ==================== LANDSCAPING LEAD FORM ====================
async function submitLandscapingLead(e) {
  e.preventDefault();
  const name = document.getElementById('lead-name').value.trim();
  const phone = document.getElementById('lead-phone').value.trim();
  const project = document.getElementById('lead-project').value;
  const size = document.getElementById('lead-size').value;
  const location = document.getElementById('lead-location').value.trim();
  const message = document.getElementById('lead-message').value.trim();

  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_name: name,
        client_phone: phone,
        project_type: project,
        area_size: size,
        location: location,
        message: message
      })
    });

    if (!res.ok) throw new Error(`Status: ${res.status}`);

    const data = await res.json();
    if (data.success) {
      document.getElementById('lead-success-msg').classList.remove('hidden');
      document.getElementById('lead-form').reset();
      return;
    } else {
      throw new Error(data.error || 'Failed');
    }
  } catch (err) {
    // WhatsApp direct connection for static hosting
    const text = `🌿 *New Landscaping Consultation Request*
-------------------------
*Client:* ${name}
*Phone:* ${phone}
*Project:* ${project} (${size})
*Location:* ${location}
*Details:* ${message || 'Standard inquiry'}
-------------------------
Please schedule a site inspection.`;
    window.open(`https://wa.me/923008456789?text=${encodeURIComponent(text)}`, '_blank');
    document.getElementById('lead-success-msg').classList.remove('hidden');
    document.getElementById('lead-form').reset();
  }
}

// ==================== 1. WISHLIST SYSTEM ====================
let wishlist = JSON.parse(localStorage.getItem('lb_wishlist') || '[]');

function isWishlisted(id) {
  return wishlist.includes(Number(id));
}

function toggleWishlist(id, event) {
  if (event) event.stopPropagation();
  const numId = Number(id);
  const index = wishlist.indexOf(numId);
  if (index > -1) {
    wishlist.splice(index, 1);
    showWishlistToast('Removed from Wishlist');
  } else {
    wishlist.push(numId);
    showWishlistToast('Added to Wishlist ❤️');
  }
  localStorage.setItem('lb_wishlist', JSON.stringify(wishlist));
  updateWishlistBadges();

  // If plants are rendered, refresh grid to reflect heart states
  if (allPlants && allPlants.length > 0) {
    renderPlantsGrid(filteredPlants.length > 0 ? filteredPlants : allPlants);
  }
  // If wishlist drawer is open, re-render its list
  renderWishlistItems();
}

function updateWishlistBadges() {
  const count = wishlist.length;
  const badgeH = document.getElementById('wishlist-count-badge');
  const badgeM = document.getElementById('menu-wishlist-badge');
  const badgeD = document.getElementById('wishlist-drawer-badge');

  if (badgeH) badgeH.textContent = count;
  if (badgeM) badgeM.textContent = count;
  if (badgeD) badgeD.textContent = `${count} ${count === 1 ? 'item' : 'items'}`;
}

function toggleWishlistDrawer(show) {
  const drawer = document.getElementById('wishlist-drawer');
  if (!drawer) return;
  if (show) {
    renderWishlistItems();
    drawer.classList.remove('hidden');
  } else {
    drawer.classList.add('hidden');
  }
}

function renderWishlistItems() {
  const container = document.getElementById('wishlist-items-container');
  if (!container) return;

  if (wishlist.length === 0) {
    container.innerHTML = `
      <div class="py-16 text-center text-charcoal-500 text-xs space-y-2">
        <div class="text-4xl">❤️</div>
        <div class="font-serif-luxury font-bold text-forest-900 text-sm">Aapki Wishlist Khali Hai</div>
        <p class="text-[11px] text-charcoal-400">Apne pasandeeda paudon ko dil (❤️) par click kar ke save karein.</p>
        <button onclick="toggleWishlistDrawer(false); navigateToPage('shop')" class="text-xs text-forest-800 font-bold underline mt-2">Explore Plants</button>
      </div>
    `;
    return;
  }

  const items = allPlants.filter(p => wishlist.includes(Number(p.id)));

  container.innerHTML = items.map(plant => `
    <div class="flex items-center gap-3 p-3 rounded-2xl bg-cream-50 border border-cream-200">
      <img src="${plant.images[0] || 'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=200'}" alt="${plant.name}" class="w-14 h-14 object-cover rounded-xl shadow-xs">
      <div class="flex-grow">
        <div class="text-[10px] text-charcoal-400 italic">${plant.botanical_name || ''}</div>
        <div class="font-bold text-xs text-forest-900 line-clamp-1">${plant.name}</div>
        <div class="text-xs font-bold text-forest-800 mt-0.5">Rs. ${plant.price.toLocaleString()}</div>
      </div>
      <div class="flex flex-col gap-1.5 items-end">
        <button onclick="quickAddToCart(${plant.id}); toggleWishlist(${plant.id});" class="bg-forest-800 hover:bg-forest-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg transition" title="Move to Cart">
          + Cart
        </button>
        <button onclick="toggleWishlist(${plant.id})" class="text-[10px] text-charcoal-400 hover:text-rose-600 transition" title="Remove">
          ✕ Remove
        </button>
      </div>
    </div>
  `).join('');
}

function moveAllWishlistToCart() {
  if (wishlist.length === 0) return;
  wishlist.forEach(id => {
    quickAddToCart(id);
  });
  wishlist = [];
  localStorage.setItem('lb_wishlist', JSON.stringify(wishlist));
  updateWishlistBadges();
  renderWishlistItems();
  toggleWishlistDrawer(false);
  toggleCartDrawer(true);
}

function showWishlistToast(msg) {
  let toast = document.getElementById('wishlist-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'wishlist-toast';
    toast.className = 'fixed top-20 right-4 z-50 bg-forest-900 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xl border border-forest-700 transition-all duration-300 opacity-0 transform translate-y-2 pointer-events-none flex items-center gap-2';
    document.body.appendChild(toast);
  }
  toast.innerHTML = msg;
  toast.classList.remove('opacity-0', 'translate-y-2');
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
  }, 2200);
}

// ==================== 2. LANDSCAPING COST CALCULATOR ====================
function updateLandscapeCalc() {
  const plotRadio = document.querySelector('input[name="calc_plot"]:checked');
  const plotType = plotRadio ? plotRadio.value : '5marla';
  const turfSelect = document.getElementById('calc-turf-type');
  const turfType = turfSelect ? turfSelect.value : 'bermuda';
  const palmsSlider = document.getElementById('calc-palms-slider');
  const palmsCount = palmsSlider ? parseInt(palmsSlider.value, 10) : 2;

  const rockeryCheck = document.getElementById('calc-add-rockery');
  const lightsCheck = document.getElementById('calc-add-lights');
  const sprinklersCheck = document.getElementById('calc-add-sprinklers');

  // Lawn Area in Sq Ft
  let areaSqFt = 500;
  if (plotType === '10marla') areaSqFt = 1200;
  if (plotType === '1kanal') areaSqFt = 2500;
  if (plotType === 'farmhouse') areaSqFt = 5000;

  // Turf rate per sq ft
  let turfRate = 45; // American Bermuda
  if (turfType === 'dhaka') turfRate = 55;
  if (turfType === 'zoysia') turfRate = 75;

  const turfCost = areaSqFt * turfRate;
  const palmsCost = palmsCount * 18000;

  let addonsCost = 0;
  if (rockeryCheck && rockeryCheck.checked) addonsCost += 45000;
  if (lightsCheck && lightsCheck.checked) addonsCost += 25000;
  if (sprinklersCheck && sprinklersCheck.checked) addonsCost += 35000;

  const totalCost = turfCost + palmsCost + addonsCost;

  // Update UI Labels
  const palmsLabel = document.getElementById('calc-palms-count');
  if (palmsLabel) palmsLabel.textContent = `${palmsCount} ${palmsCount === 1 ? 'Tree' : 'Trees'} (Rs. ${palmsCost.toLocaleString()})`;

  const sumTurf = document.getElementById('calc-summary-turf');
  if (sumTurf) sumTurf.textContent = `Rs. ${turfCost.toLocaleString()} (${areaSqFt} sq ft)`;

  const sumPalms = document.getElementById('calc-summary-palms');
  if (sumPalms) sumPalms.textContent = `Rs. ${palmsCost.toLocaleString()}`;

  const sumAddons = document.getElementById('calc-summary-addons');
  if (sumAddons) sumAddons.textContent = `Rs. ${addonsCost.toLocaleString()}`;

  const totalLabel = document.getElementById('calc-total-price');
  if (totalLabel) totalLabel.textContent = `Rs. ${totalCost.toLocaleString()}`;
}

function sendLandscapeQuoteWhatsApp() {
  const plotRadio = document.querySelector('input[name="calc_plot"]:checked');
  const plotType = plotRadio ? plotRadio.value.toUpperCase() : '5 MARLA';
  const turfSelect = document.getElementById('calc-turf-type');
  const turfText = turfSelect ? turfSelect.options[turfSelect.selectedIndex].text : 'American Bermuda';
  const palmsSlider = document.getElementById('calc-palms-slider');
  const palmsCount = palmsSlider ? palmsSlider.value : '2';

  const rockery = document.getElementById('calc-add-rockery')?.checked ? 'Yes (+Rockery & Fountain)' : 'No';
  const lights = document.getElementById('calc-add-lights')?.checked ? 'Yes (+Night Spotlights)' : 'No';
  const sprinklers = document.getElementById('calc-add-sprinklers')?.checked ? 'Yes (+Automated Sprinklers)' : 'No';

  const total = document.getElementById('calc-total-price')?.textContent || 'Rs. 128,500';

  const text = `🏛️ *Lahore Botanica - Landscaping 3D Design Request*
----------------------------------------
*Plot / Lawn Size:* ${plotType}
*Turf Selection:* ${turfText}
*Date Palms:* ${palmsCount} Mature Trees
*Rockery & Fountain:* ${rockery}
*Night Lighting:* ${lights}
*Sprinkler System:* ${sprinklers}
----------------------------------------
*Estimated Total:* ${total}
----------------------------------------
Please schedule a site inspection and provide 3D CAD proposal.`;

  window.open(`https://wa.me/923008456789?text=${encodeURIComponent(text)}`, '_blank');
}

// ==================== 3. DR. BOTANICA - LAHORE PLANT DOCTOR ====================
const plantDoctorIssues = {
  yellow_leaves: {
    title: '🍂 Peele Pattay (Yellowing Foliage / Chlorosis)',
    cause: 'Lahore ke underground hard tap water me salts zyada hona aur drainage hole block hone se root suffocation.',
    first24: '⚡ Agle 4 din tak paani foran band karein. Mitti ki upper satah ko lakri ki stick se halka sa khurad (aerate) dein taake hawa jarhon tak pohnchay.',
    organicRemedy: '🍃 Har 15 din baad 1 chamach Epsom Salt (Magnesium Sulfate) 1 liter paani me ghol kar patton par spray karein.',
    whatsappMsg: 'Doctor Botanica, mere pauday ke patte peele ho rahe hain. Please check advise dein.'
  },
  drooping: {
    title: '🥀 Murjhaye Pattay (Heat Stress & Transpiration Shock)',
    cause: 'May-July me Lahore ka 44°C taapmaan patton ki nami ko jazb kar leta hai ya pauda direct dopehar ki dhoop me rakha hai.',
    first24: '⚡ Pauday ko dopehar ki direct dhoop se foran hata kar shaded porch ya indoor bright spot par shift karein aur patton par thanda paani spray karein.',
    organicRemedy: '🍃 Mitti ke upar 1 inch dry tree leaves ya coconut husk ki mulch bicha dein taake mitti ka paani bhap na bane.',
    whatsappMsg: 'Doctor Botanica, mera pauda garmi se murjha gaya hai. Emergency revival method bata dein.'
  },
  mealybugs: {
    title: '⚪ Safed Kapas Ke Keeray (Mealybugs & Scale Attack)',
    cause: 'Lahore ke monsoon aur October ke mahine me nami ke bais safed keeray tano aur patton ke joron me anday dete hain.',
    first24: '⚡ Ear-bud ko 70% surgical spirit ya dettol mixed water me dabo kar safed keeron ko manually ragar kar saaf karein.',
    organicRemedy: '🍃 1 liter paani me 5ml pure Neem Oil aur 2 drop dishwashing liquid mila kar har 5 din baad shaam ke waqt spray karein.',
    whatsappMsg: 'Doctor Botanica, paudon par safed mealybugs ka hamla hai. Certified organic pesticide guide karein.'
  },
  brown_tips: {
    title: '🟫 Jali Hui Nokain (Brown Crispy Tips & Leaf Burn)',
    cause: 'Lahore November Smog ka zahreela PM2.5 aur AC rooms ki shadeed dry air patton ke edges ko jala deti hai.',
    first24: '⚡ Jali hui nokon ko saaf qainchi se trim karein. Room me paani ka bowl rakhein taake natural humidity barh sakay.',
    organicRemedy: '🍃 Haftay me ek martaba subah 8 baje fresh filtered paani se foliage spray karein taake smog ki layer dhul jaye.',
    whatsappMsg: 'Doctor Botanica, patton ke kinaray jal rahe hain smog ki waja se. Kese bachayein?'
  },
  bud_drop: {
    title: '🌺 Kaliyon Ka Girna (Premature Bud & Flower Drop)',
    cause: 'Desi Motia aur Jasmine ki location ko baar baar tabdeel karna ya potassium aur phosphorus ki shadeed kami.',
    first24: '⚡ Pauday ki jagah mutasir na karein. Full 6 ghante subah se dopehar ki roshni me fix rakh dein.',
    organicRemedy: '🍃 2 kele ke chilkon ko 3 din paani me bhigo kar rakhein (banana peel tea). Yeh potassium-rich liquid mitti me dalein.',
    whatsappMsg: 'Doctor Botanica, phoolon ki kaliyan khilne se pehle gir rahi hain. Khaad ka formula bata dein.'
  }
};

function diagnosePlantIssue(key) {
  document.querySelectorAll('.doctor-symptom-card').forEach(btn => {
    btn.classList.remove('active', 'border-forest-800', 'bg-cream-100');
    if (btn.getAttribute('data-symptom') === key) {
      btn.classList.add('active', 'border-forest-800', 'bg-cream-100');
    }
  });

  const issue = plantDoctorIssues[key] || plantDoctorIssues.yellow_leaves;
  const box = document.getElementById('doctor-diagnosis-box');
  if (!box) return;

  box.innerHTML = `
    <div class="space-y-3">
      <div class="flex items-center justify-between border-b border-cream-200 pb-2">
        <h4 class="font-bold text-sm sm:text-base text-forest-900">${issue.title}</h4>
        <span class="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">Lahore Climate Verified</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div class="p-3 rounded-xl bg-white border border-cream-200">
          <div class="font-bold text-amber-800 mb-1">🔍 Lahore Root Cause:</div>
          <p class="text-charcoal-700 leading-relaxed">${issue.cause}</p>
        </div>
        <div class="p-3 rounded-xl bg-white border border-cream-200">
          <div class="font-bold text-rose-700 mb-1">⚡ First 24-Hours Action:</div>
          <p class="text-charcoal-700 leading-relaxed">${issue.first24}</p>
        </div>
        <div class="p-3 rounded-xl bg-white border border-cream-200">
          <div class="font-bold text-emerald-800 mb-1">🍃 Organic Lahore Remedy:</div>
          <p class="text-charcoal-700 leading-relaxed">${issue.organicRemedy}</p>
        </div>
      </div>

      <div class="pt-2 flex flex-wrap items-center justify-between gap-2">
        <span class="text-[11px] text-charcoal-500 italic">Kya pauday ki halat mazeed kharab ho rahi hai?</span>
        <a href="https://wa.me/923008456789?text=${encodeURIComponent(issue.whatsappMsg)}" target="_blank" class="btn-whatsapp px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm">
          <span>Consult Dr. Botanica on WhatsApp (Free)</span>
        </a>
      </div>
    </div>
  `;
}

// ==================== 4. CUSTOMER REVIEWS SYSTEM ====================
let userReviews = JSON.parse(localStorage.getItem('lb_user_reviews') || '[]');

function openReviewModal() {
  const modal = document.getElementById('review-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeReviewModal() {
  const modal = document.getElementById('review-modal');
  if (modal) modal.classList.add('hidden');
}

function submitCustomerReview(e) {
  e.preventDefault();
  const name = document.getElementById('rev-name').value.trim();
  const area = document.getElementById('rev-area').value;
  const rating = parseInt(document.getElementById('rev-rating').value, 10);
  const comment = document.getElementById('rev-comment').value.trim();

  const newReview = {
    id: Date.now(),
    name,
    area,
    rating,
    comment,
    date: 'Just now'
  };

  userReviews.unshift(newReview);
  localStorage.setItem('lb_user_reviews', JSON.stringify(userReviews));
  closeReviewModal();
  document.getElementById('customer-review-form').reset();
  renderUserReviews();
  showWishlistToast('Shukriya! Aapka review publish ho gaya ⭐');
}

function renderUserReviews() {
  const container = document.getElementById('user-submitted-reviews');
  if (!container) return;

  if (userReviews.length === 0) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = userReviews.map(r => {
    const initials = r.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'LB';
    const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);

    return `
      <div class="card-elevation p-4 sm:p-5 rounded-2xl flex flex-col justify-between border-2 border-forest-600/30 bg-emerald-50/20">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-amber-500 text-xs">${stars}</span>
            <span class="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">Recent Review</span>
          </div>
          <p class="text-xs text-charcoal-700 leading-relaxed italic">
            "${r.comment}"
          </p>
        </div>
        <div class="pt-3 border-t border-cream-200 mt-3 flex items-center gap-2.5">
          <div class="w-7 h-7 rounded-full bg-forest-800 text-white text-xs font-bold flex items-center justify-center">${initials}</div>
          <div>
            <div class="text-xs font-bold text-forest-900 leading-none">${r.name}</div>
            <div class="text-[10px] text-charcoal-500 mt-0.5">${r.area}, Lahore</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ==================== 5. LAHORE AQI SMOG FILTER ====================
function filterByAQI() {
  navigateToPage('shop');
  // Auto search air purifying plants
  const searchInput = document.getElementById('hero-search-input');
  if (searchInput) {
    searchInput.value = 'Air Purifier';
  }
  // Filter category indoor or air purifier
  filterByCategory('indoor');
  const target = document.getElementById('plants-section');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

// ==================== 6. INSTITUTIONAL FREE PLANT REQUEST & MEMBERSHIP ====================
function submitInstitutionalRequest(e) {
  e.preventDefault();
  const name = document.getElementById('inst-name')?.value.trim();
  const type = document.getElementById('inst-type')?.value;
  const contact = document.getElementById('inst-contact')?.value.trim();
  const phone = document.getElementById('inst-phone')?.value.trim();
  const city = document.getElementById('inst-city')?.value.trim();
  const qty = document.getElementById('inst-qty')?.value;

  const req = {
    id: Date.now(),
    name,
    type,
    contact,
    phone,
    city,
    qty,
    date: new Date().toISOString()
  };

  const existing = JSON.parse(localStorage.getItem('lb_institutional_requests') || '[]');
  existing.unshift(req);
  localStorage.setItem('lb_institutional_requests', JSON.stringify(existing));

  const successMsg = document.getElementById('inst-success-msg');
  if (successMsg) successMsg.classList.remove('hidden');

  const text = `🌿 *Free Plant Distribution Application - Green Pakistan*
----------------------------------------
*Institution:* ${name}
*Category:* ${type}
*Contact Officer:* ${contact}
*WhatsApp/Phone:* ${phone}
*City/Region:* ${city}
*Allocation Needed:* ${qty} Plants
----------------------------------------
Attn: Directorate of Operations (Jahangir Alam & Balaj Ahmad)
Grow Green Heaven & Lahore Botanica Initiative`;

  setTimeout(() => {
    window.open(`https://wa.me/923008456789?text=${encodeURIComponent(text)}`, '_blank');
  }, 600);
}

function pledgeMembership(tier) {
  const amounts = {
    Bronze: 'Rs. 5,000 - 15,000',
    Silver: 'Rs. 15,000 - 30,000',
    Gold: 'Rs. 30,000 - 45,000',
    Diamond: 'Rs. 50,000+'
  };

  const amount = amounts[tier] || 'Custom Donation';
  const text = `🌿 *Green Patron Membership Pledge - Grow Green Pakistan*
----------------------------------------
*Selected Tier:* ${tier} Patron
*Contribution Level:* ${amount}
----------------------------------------
I would like to join the Green Pakistan initiative to support free plant distribution across educational and public institutions. Please provide details for membership enrollment.`;

  window.open(`https://wa.me/923008456789?text=${encodeURIComponent(text)}`, '_blank');
}

// Initializations on load
document.addEventListener('DOMContentLoaded', () => {
  updateWishlistBadges();
  updateLandscapeCalc();
  diagnosePlantIssue('yellow_leaves');
  renderUserReviews();
});



// ==================== 7. REAL PROJECT GALLERY & LIGHTBOX ====================
function filterProjectGallery(category, btnElement) {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
      card.style.opacity = '1';
    } else {
      card.style.display = 'none';
    }
  });

  const pills = document.querySelectorAll('.portfolio-filter-pill');
  pills.forEach(p => p.classList.remove('active-pill'));
  if (btnElement) {
    btnElement.classList.add('active-pill');
  }
}

function openProjectLightbox(imageSrc, title, tag, desc) {
  const modal = document.getElementById('project-lightbox');
  const img = document.getElementById('lightbox-img');
  const titleEl = document.getElementById('lightbox-title');
  const tagEl = document.getElementById('lightbox-tag');
  const descEl = document.getElementById('lightbox-desc');
  const waBtn = document.getElementById('lightbox-whatsapp-btn');

  if (img) img.src = imageSrc;
  if (titleEl) titleEl.textContent = title;
  if (tagEl) tagEl.textContent = tag;
  if (descEl) descEl.textContent = desc;

  if (waBtn) {
    const waText = `Hello Lahore Botanica! I saw your project "${title}" in ${tag}. I would like to inquire about similar landscaping for my property.`;
    waBtn.href = `https://wa.me/923008456789?text=${encodeURIComponent(waText)}`;
  }

  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeProjectLightbox() {
  const modal = document.getElementById('project-lightbox');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectLightbox();
  }
});


// ==================== 8. PAKISTAN CITIES DIRECTORY & SEO ROUTING ====================

function initCityDropdown() {
  const list = document.getElementById('city-dropdown-list');
  if (!list || typeof PAKISTAN_CITIES === 'undefined') return;

  list.innerHTML = PAKISTAN_CITIES.map(c => `
    <button onclick="navigateToCity('${c.slug}'); toggleCityDropdown(false);" class="w-full text-left px-3 py-2 rounded-xl hover:bg-cream-100 flex items-center justify-between transition group">
      <div>
        <div class="font-bold text-forest-900 text-xs group-hover:text-emerald-700">${c.name}</div>
        <div class="text-[10px] text-charcoal-400">${c.province}</div>
      </div>
      <span class="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">${c.badge}</span>
    </button>
  `).join('');
}

function toggleCityDropdown(forceState) {
  const menu = document.getElementById('city-dropdown-menu');
  if (!menu) return;
  if (typeof forceState === 'boolean') {
    menu.classList.toggle('hidden', !forceState);
  } else {
    menu.classList.toggle('hidden');
  }
}

// Close city dropdown on outside click
document.addEventListener('click', (e) => {
  const wrapper = document.getElementById('city-selector-wrapper');
  if (wrapper && !wrapper.contains(e.target)) {
    toggleCityDropdown(false);
  }
});

function navigateToCity(slug) {
  window.location.hash = `#city-${slug}`;
}

function selectCityFilter(slug) {
  navigateToCity(slug);
}

function renderCitiesDirectory(filtered) {
  const container = document.getElementById('cities-cards-container');
  if (!container || typeof PAKISTAN_CITIES === 'undefined') return;

  const list = filtered || PAKISTAN_CITIES;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12 bg-white rounded-3xl border border-cream-200 p-8">
        <div class="text-4xl mb-3">📍</div>
        <h3 class="font-serif-luxury text-xl font-bold text-forest-900">Shehr Ya Society Nahi Mili</h3>
        <p class="text-xs text-charcoal-500 mt-1">Lekin hum pure Pakistan me serve karte hain! WhatsApp par direct rabta karein.</p>
        <a href="https://wa.me/923008456789?text=Hello%20Lahore%20Botanica,%20I%20want%20landscaping%20in%20my%20city" target="_blank" class="mt-4 inline-flex btn-whatsapp px-5 py-2.5 rounded-xl text-xs font-bold">Inquire on WhatsApp</a>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(c => `
    <div class="card-elevation bg-white rounded-3xl overflow-hidden border border-cream-200 flex flex-col justify-between group hover:shadow-2xl transition-all duration-300">
      <div>
        <div class="h-48 overflow-hidden relative cursor-pointer" onclick="navigateToCity('${c.slug}')">
          <img src="${c.heroImage}" alt="${c.name} Landscaping" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='images/projects/villa-landscaping.jpg'">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
            <div>
              <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/90 text-white text-[10px] font-bold backdrop-blur-sm shadow-xs">${c.badge}</span>
              <h3 class="font-serif-luxury text-xl font-bold text-white mt-1">${c.name}</h3>
              <p class="text-[11px] text-cream-100/90 leading-tight line-clamp-1">${c.tagline}</p>
            </div>
          </div>
          <span class="absolute top-3 right-3 bg-forest-900/90 text-cream-50 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-forest-600">${c.estatesCount}</span>
        </div>

        <div class="p-5 space-y-3">
          <!-- Top Societies Badges -->
          <div>
            <div class="text-[10px] uppercase font-bold tracking-wider text-charcoal-400 mb-1.5">Top Societies Covered:</div>
            <div class="flex flex-wrap gap-1.5">
              ${c.topSectors.slice(0, 4).map(s => `<span class="px-2 py-0.5 rounded-lg bg-cream-100 text-charcoal-700 text-[10px] font-medium">${s}</span>`).join('')}
              ${c.topSectors.length > 4 ? `<span class="px-2 py-0.5 rounded-lg bg-forest-50 text-forest-800 text-[10px] font-bold">+${c.topSectors.length - 4} more</span>` : ''}
            </div>
          </div>

          <!-- Climate & Turf Brief -->
          <div class="p-3 rounded-2xl bg-cream-50 border border-cream-200/70 text-[11px] space-y-1">
            <div class="text-charcoal-700"><strong class="text-forest-900">Recommended Turf:</strong> ${c.recommendedTurf}</div>
            <div class="text-charcoal-700"><strong class="text-forest-900">Plant Delivery:</strong> ${c.deliveryTime}</div>
          </div>
        </div>
      </div>

      <div class="p-5 pt-0">
        <button onclick="navigateToCity('${c.slug}')" class="w-full bg-forest-800 hover:bg-forest-700 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-1.5">
          <span>Explore ${c.name} Hub & SEO Profile</span>
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  `).join('');
}

function filterCitiesDirectory(term) {
  if (typeof PAKISTAN_CITIES === 'undefined') return;
  const q = (term || '').trim().toLowerCase();
  if (!q) {
    renderCitiesDirectory();
    return;
  }

  const filtered = PAKISTAN_CITIES.filter(c => {
    return c.name.toLowerCase().includes(q) ||
           c.province.toLowerCase().includes(q) ||
           c.tagline.toLowerCase().includes(q) ||
           c.keywords.toLowerCase().includes(q) ||
           c.topSectors.some(s => s.toLowerCase().includes(q));
  });

  renderCitiesDirectory(filtered);
}

function renderCityDetailPage(slug) {
  if (typeof PAKISTAN_CITIES === 'undefined') return;
  const city = PAKISTAN_CITIES.find(c => c.slug === slug) || PAKISTAN_CITIES[0];
  const container = document.getElementById('city-detail-content');
  if (!container) return;

  // Update document title for SEO
  document.title = city.metaTitle;
  
  // Update header active label
  const headerCityLabel = document.getElementById('header-city-name');
  if (headerCityLabel) headerCityLabel.textContent = city.name;

  container.innerHTML = `
    <!-- Breadcrumb -->
    <div class="bg-cream-100 border-b border-cream-200 py-2.5 px-4 sm:px-8">
      <div class="max-w-7xl mx-auto flex items-center gap-2 text-xs text-charcoal-500 font-medium flex-wrap">
        <a href="#shop" onclick="navigateToPage('shop'); return false;" class="hover:text-forest-800">Home</a>
        <span>/</span>
        <a href="#cities" onclick="navigateToPage('cities'); return false;" class="hover:text-forest-800">Pakistan Cities Hub</a>
        <span>/</span>
        <span class="text-forest-900 font-bold">${city.name} Landscaping Architecture</span>
      </div>
    </div>

    <!-- City Hero -->
    <section class="relative bg-gradient-to-b from-forest-900 via-forest-800 to-forest-900 text-cream-50 pt-10 sm:pt-16 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-forest-700">
      <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-7 space-y-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] sm:text-xs font-bold border border-emerald-400/30">
            <span>📍 ${city.name} Regional Division • ${city.province}</span>
          </div>
          <h1 class="font-serif-luxury text-3xl sm:text-5xl lg:text-5xl font-bold text-white leading-tight">
            Turnkey Landscaping Architecture in <span class="italic font-normal text-terracotta">${city.name}</span>
          </h1>
          <p class="text-cream-100/90 text-xs sm:text-base leading-relaxed">
            ${city.metaDesc}
          </p>
          <div class="flex flex-wrap items-center gap-3 pt-2">
            <a href="https://wa.me/923008456789?text=${encodeURIComponent('Hello Lahore Botanica! I am interested in landscaping and plant delivery services in ' + city.name + '. Please share packages and site visit schedule.')}" target="_blank" class="btn-whatsapp px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md">
              <span>Book ${city.name} Consultation on WhatsApp</span>
            </a>
            <a href="#landscape-packages" onclick="navigateToPage('landscaping'); return false;" class="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-3 rounded-xl text-xs transition border border-white/20">
              View National Packages
            </a>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 relative group">
            <img src="${city.heroImage}" alt="${city.name} Landscaping Projects" class="w-full h-72 sm:h-84 object-cover" onerror="this.src='images/projects/villa-landscaping.jpg'">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
              <span class="text-xs text-emerald-300 font-bold">${city.estatesCount}</span>
              <span class="text-white font-serif-luxury text-lg font-bold">${city.tagline}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Metrics Ribbon -->
    <section class="py-5 bg-cream-100 border-b border-cream-200 px-3 sm:px-6">
      <div class="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
        <div class="p-3 bg-white rounded-2xl border border-cream-200">
          <div class="text-[10px] text-charcoal-400 font-bold uppercase">Delivery Window</div>
          <div class="font-bold text-forest-900 text-sm mt-0.5">${city.deliveryTime}</div>
        </div>
        <div class="p-3 bg-white rounded-2xl border border-cream-200">
          <div class="text-[10px] text-charcoal-400 font-bold uppercase">Site Inspection</div>
          <div class="font-bold text-forest-900 text-sm mt-0.5">${city.siteVisit}</div>
        </div>
        <div class="p-3 bg-white rounded-2xl border border-cream-200">
          <div class="text-[10px] text-charcoal-400 font-bold uppercase">Proven Track Record</div>
          <div class="font-bold text-forest-900 text-sm mt-0.5">${city.estatesCount}</div>
        </div>
        <div class="p-3 bg-white rounded-2xl border border-cream-200">
          <div class="text-[10px] text-charcoal-400 font-bold uppercase">Certified Warranty</div>
          <div class="font-bold text-forest-900 text-sm mt-0.5">100% Replacement</div>
        </div>
      </div>
    </section>

    <!-- Detailed City Breakdown Grid -->
    <section class="py-12 sm:py-16 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">

      <!-- Climate & Soil Science -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <div class="card-elevation p-6 sm:p-8 rounded-3xl bg-white border border-cream-200 flex flex-col justify-between">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-terracotta bg-terracotta/10 px-2.5 py-0.5 rounded-full">Climate Science</span>
            <h3 class="font-serif-luxury text-xl font-bold text-forest-900 mt-2">${city.name} Climate & Seasonal Challenges</h3>
            <p class="text-xs text-charcoal-600 mt-2 leading-relaxed">
              ${city.climateSummary} Aam roadside plants bina root-hardening ke yahan survive nahi karte. Hamare paude ${city.name} ke seasonal extremes ke liye pre-conditioned hotay hain.
            </p>
          </div>
          <div class="mt-4 pt-3 border-t border-cream-100 text-xs">
            <strong class="text-forest-900">Recommended Turf Grass:</strong>
            <p class="text-charcoal-600 text-[11px] mt-0.5">${city.recommendedTurf}</p>
          </div>
        </div>

        <div class="card-elevation p-6 sm:p-8 rounded-3xl bg-white border border-cream-200 flex flex-col justify-between">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">Soil Bio-Chemistry</span>
            <h3 class="font-serif-luxury text-xl font-bold text-forest-900 mt-2">${city.name} Soil Conditioning Formula</h3>
            <p class="text-xs text-charcoal-600 mt-2 leading-relaxed">
              ${city.soilSolution} Har plot ki mitti ko pehle test kiya jata hai aur drainage layers create ki jati hain ta k roots me fungal rot na banay.
            </p>
          </div>
          <div class="mt-4 pt-3 border-t border-cream-100 text-xs">
            <strong class="text-forest-900">Key Acclimatized Flora:</strong>
            <div class="flex flex-wrap gap-1.5 mt-1">
              ${city.popularFlora.map(f => `<span class="px-2 py-0.5 bg-cream-100 text-charcoal-700 rounded-md text-[10px] font-semibold">${f}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Top Societies Covered in this City -->
      <div class="bg-forest-900 text-cream-50 p-6 sm:p-10 rounded-3xl shadow-xl">
        <div class="text-center max-w-2xl mx-auto mb-6">
          <span class="text-xs font-bold text-terracotta uppercase tracking-widest">Active Coverage Zones</span>
          <h3 class="font-serif-luxury text-2xl font-bold text-white mt-1">Housing Societies & Sectors in ${city.name}</h3>
          <p class="text-xs text-cream-100/70 mt-1">Hamari site inspection teams aur installation trucks in tamam ilaqon me regular active hain:</p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          ${city.topSectors.map(s => `
            <div class="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2">
              <span class="text-emerald-400">✓</span>
              <span class="font-medium text-cream-100 text-[11px]">${s}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Turnkey Specialties in this City -->
      <div>
        <div class="text-center max-w-2xl mx-auto mb-8">
          <span class="text-terracotta text-[10px] sm:text-xs font-bold uppercase tracking-widest">Tailored Architecture</span>
          <h3 class="font-serif-luxury text-2xl sm:text-3xl font-bold text-forest-900 mt-1">Specialized Landscape Services for ${city.name}</h3>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          ${city.specialties.map(spec => `
            <div class="p-4 rounded-2xl bg-white border border-cream-200 shadow-xs flex items-start gap-3">
              <span class="text-xl">🌿</span>
              <div>
                <h4 class="font-bold text-xs sm:text-sm text-forest-900">${spec}</h4>
                <p class="text-[10px] text-charcoal-500 mt-0.5">Custom architectural layout, material sourcing & complete execution.</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- City Specific SEO FAQs -->
      <div class="bg-cream-100/70 p-6 sm:p-10 rounded-3xl border border-cream-200">
        <div class="text-center max-w-2xl mx-auto mb-8">
          <span class="text-terracotta text-[10px] sm:text-xs font-bold uppercase tracking-widest">Frequently Asked Questions</span>
          <h3 class="font-serif-luxury text-2xl font-bold text-forest-900 mt-1">${city.name} Landscaping FAQs</h3>
        </div>

        <div class="space-y-4 max-w-3xl mx-auto text-xs">
          ${city.faqs.map(faq => `
            <div class="p-4 rounded-2xl bg-white border border-cream-200 shadow-xs space-y-1.5">
              <div class="font-bold text-forest-900 flex items-center gap-2">
                <span class="text-terracotta font-serif-luxury font-bold text-sm">Q.</span>
                <span>${faq.q}</span>
              </div>
              <div class="text-charcoal-600 pl-4 text-[11px] leading-relaxed">
                ${faq.a}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Localized WhatsApp CTA Banner -->
      <div class="bg-gradient-to-r from-forest-900 via-forest-800 to-forest-900 text-cream-50 p-6 sm:p-10 rounded-3xl text-center space-y-4 shadow-xl">
        <h3 class="font-serif-luxury text-xl sm:text-3xl font-bold text-white">Start Your Landscaping Transformation in ${city.name}</h3>
        <p class="text-xs sm:text-sm text-cream-100/80 max-w-xl mx-auto">
          Apne plot ka size aur requirements WhatsApp par share karein. Hamare landscape architects aapko 3D layout aur exact turnkey estimate faraham karengay.
        </p>
        <div class="flex items-center justify-center gap-3 pt-2">
          <a href="https://wa.me/923008456789?text=${encodeURIComponent('Hello Lahore Botanica! I want to consult for a landscape project in ' + city.name + '. Please contact me.')}" target="_blank" class="btn-whatsapp px-6 py-3 rounded-xl text-xs font-bold shadow-lg">
            Chat with ${city.name} Landscape Architect
          </a>
          <button onclick="navigateToPage('cities')" class="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20">
            View Other Cities
          </button>
        </div>
      </div>

    </section>
  `;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initCityDropdown();
  if (window.location.hash === '#cities') {
    renderCitiesDirectory();
  }
});
