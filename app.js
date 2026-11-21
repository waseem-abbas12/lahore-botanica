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
let selectedSizeIndex = 0;
let selectedPotIndex = 0;
let modalQty = 1;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  fetchPlants();
  updateCartBadge();
  initBeforeAfterSlider();

  if (window.location.hash === '#admin') {
    toggleAdminView();
  }
});

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
    let filtered = [...FALLBACK_PLANTS];

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

// Render Plant Cards
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

    let sunlightLabel = '☀️ Full Sun';
    if (plant.sunlight === 'partial_shade') sunlightLabel = '⛅ Partial Shade';
    if (plant.sunlight === 'low_light') sunlightLabel = '🛋️ Indoor';

    let waterLabel = '💧 Low Water';
    if (plant.water === 'moderate') waterLabel = '💧💧 Moderate';
    if (plant.water === 'high') waterLabel = '💧💧💧 High';

    return `
      <div class="card-elevation rounded-2xl overflow-hidden flex flex-col group bg-white">
        <div class="relative h-64 overflow-hidden bg-cream-100 cursor-pointer" onclick="openProductModal(${plant.id})">
          <img src="${mainImg}" alt="${plant.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
          
          <div class="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow">
            <svg class="w-3 h-3 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>
            <span>${anglesCount} Angles</span>
          </div>

          ${plant.featured ? `
            <div class="absolute top-3 right-3 bg-terracotta text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
              Best Seller
            </div>
          ` : ''}

          <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
            <span class="bg-white/95 text-forest-900 text-xs font-bold px-4 py-2 rounded-xl shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
              Inspect Angles & Pots
            </span>
          </div>
        </div>

        <div class="p-5 flex-grow flex flex-col justify-between space-y-3">
          <div>
            <div class="flex items-center justify-between text-[11px]">
              <span class="text-charcoal-500 italic">${plant.botanical_name || ''}</span>
              <span class="font-semibold text-forest-700" dir="rtl">${plant.urdu_name || ''}</span>
            </div>
            
            <h3 class="font-serif-luxury text-lg font-bold text-forest-900 hover:text-terracotta transition cursor-pointer" onclick="openProductModal(${plant.id})">
              ${plant.name}
            </h3>

            <div class="flex flex-wrap items-center gap-1.5 mt-2">
              <span class="badge-care text-[10px]">${sunlightLabel}</span>
              <span class="badge-care text-[10px]">${waterLabel}</span>
            </div>
          </div>

          <div class="pt-3 border-t border-cream-100 flex items-center justify-between">
            <div>
              <div class="text-[10px] text-charcoal-500 uppercase font-semibold">Starting at</div>
              <div class="text-lg font-bold text-forest-900">Rs. ${plant.price.toLocaleString()}</div>
            </div>

            <div class="flex items-center gap-1.5">
              <button onclick="openProductModal(${plant.id})" class="p-2 rounded-xl bg-cream-100 hover:bg-cream-200 text-forest-900 transition" title="View Angles & Options">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              </button>
              <button onclick="quickAddToCart(${plant.id})" class="bg-forest-800 hover:bg-forest-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition shadow-sm flex items-center gap-1">
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

  const modal = document.getElementById('product-modal');
  modal.classList.remove('hidden');

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

  setModalAngle(0, images);

  const thumbContainer = document.getElementById('modal-thumbnails');
  thumbContainer.innerHTML = images.map((img, idx) => `
    <button onclick="setModalAngle(${idx})" class="w-16 h-16 rounded-xl overflow-hidden border-2 ${idx === 0 ? 'border-forest-800 ring-2 ring-forest-800/20' : 'border-cream-200'} transition hover:border-forest-700">
      <img src="${img}" alt="Angle ${idx + 1}" class="w-full h-full object-cover">
    </button>
  `).join('');

  renderModalOptions(plant);
  calculateModalPrice();
}

function setModalAngle(index) {
  if (!currentModalPlant) return;
  const images = currentModalPlant.images || [];
  const imgUrl = images[index] || images[0];

  const mainImg = document.getElementById('modal-main-img');
  mainImg.src = imgUrl;

  const label = document.getElementById('modal-angle-label');
  const angleNames = ['Front Full View', 'Leaf Texture & Foliage Close-Up', 'Living Room / Interior Perspective', 'Pot & Root Angle'];
  label.innerText = `Angle ${index + 1} of ${images.length} (${angleNames[index] || 'Angle View'})`;

  const thumbs = document.querySelectorAll('#modal-thumbnails button');
  thumbs.forEach((t, i) => {
    if (i === index) {
      t.className = 'w-16 h-16 rounded-xl overflow-hidden border-2 border-forest-800 ring-2 ring-forest-800/20 transition';
    } else {
      t.className = 'w-16 h-16 rounded-xl overflow-hidden border-2 border-cream-200 opacity-70 hover:opacity-100 transition';
    }
  });
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

    const data = await res.json();
    if (data.success) {
      alert(`🎉 Order Confirmed!\nYour Order Number is: ${data.order_number}\nTotal Amount: Rs. ${data.total.toLocaleString()}\nOur nursery rider will deliver to your Lahore address.`);
      cart = [];
      saveCart();
      toggleCartDrawer(false);
      return;
    }
  } catch (err) {
    // If backend API isn't present on static Vercel, forward to WhatsApp automatically!
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

  let isDragging = false;

  const moveSlider = (clientX) => {
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 20) x = 20;
    if (x > rect.width - 20) x = rect.width - 20;

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

    const data = await res.json();
    if (data.success) {
      document.getElementById('lead-success-msg').classList.remove('hidden');
      document.getElementById('lead-form').reset();
      return;
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
