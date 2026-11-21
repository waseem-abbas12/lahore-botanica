// app.js - Fast Storefront, Multi-Angle Shopify-Style Modal, Cart & Landscaping Slider
let allPlants = [];
let cart = JSON.parse(localStorage.getItem('lahore_botanica_cart') || '[]');
let currentModalPlant = null;
let selectedSizeIndex = 0;
let selectedPotIndex = 0;
let modalQty = 1;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  fetchPlants();
  updateCartBadge();
  initBeforeAfterSlider();

  // Check URL hash for admin view
  if (window.location.hash === '#admin') {
    toggleAdminView();
  }
});

// Fetch Plants with active filters
async function fetchPlants() {
  const grid = document.getElementById('plants-grid');
  grid.innerHTML = '<div class="col-span-full py-12 text-center text-charcoal-500 font-medium">Loading nursery catalog...</div>';

  try {
    const params = new URLSearchParams();
    const search = document.getElementById('hero-search-input')?.value.trim();
    if (search) params.append('search', search);

    const activeCatBtn = document.querySelector('.cat-pill.active');
    const category = activeCatBtn ? activeCatBtn.getAttribute('data-cat') || 'all' : 'all';
    if (category && category !== 'all') params.append('category', category);

    const sunlight = document.querySelector('input[name="sunlight_filter"]:checked')?.value;
    if (sunlight) params.append('sunlight', sunlight);

    const water = document.querySelector('input[name="water_filter"]:checked')?.value;
    if (water) params.append('water', water);

    const petCheck = document.getElementById('pet-friendly-check')?.checked;
    if (petCheck) params.append('pet_friendly', '1');

    const sort = document.getElementById('sort-select')?.value || 'featured';
    params.append('sort', sort);

    const res = await fetch(`/api/plants?${params.toString()}`);
    const data = await res.json();

    if (data.success) {
      allPlants = data.plants;
      renderPlantsGrid(allPlants);
    }
  } catch (err) {
    console.error('Error fetching plants:', err);
    grid.innerHTML = '<div class="col-span-full py-12 text-center text-red-600">Failed to load plants. Please refresh the page.</div>';
  }
}

// Render Plant Cards
function renderPlantsGrid(plants) {
  const grid = document.getElementById('plants-grid');
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
    const hoverImg = plant.images[1] || mainImg;
    const anglesCount = plant.images.length || 1;

    let sunlightLabel = '☀️ Full Sun';
    if (plant.sunlight === 'partial_shade') sunlightLabel = '⛅ Partial Shade';
    if (plant.sunlight === 'low_light') sunlightLabel = '🛋️ Indoor';

    let waterLabel = '💧 Low Water';
    if (plant.water === 'moderate') waterLabel = '💧💧 Moderate';
    if (plant.water === 'high') waterLabel = '💧💧💧 High';

    return `
      <div class="card-elevation rounded-2xl overflow-hidden flex flex-col group bg-white">
        <!-- Image & Angles Badge -->
        <div class="relative h-64 overflow-hidden bg-cream-100 cursor-pointer" onclick="openProductModal(${plant.id})">
          <img src="${mainImg}" alt="${plant.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
          
          <!-- Angle count pill -->
          <div class="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow">
            <svg class="w-3 h-3 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>
            <span>${anglesCount} Angles</span>
          </div>

          ${plant.featured ? `
            <div class="absolute top-3 right-3 bg-terracotta text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
              Best Seller
            </div>
          ` : ''}

          <!-- Quick View Hover Button -->
          <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
            <span class="bg-white/95 text-forest-900 text-xs font-bold px-4 py-2 rounded-xl shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
              Inspect Angles & Pots
            </span>
          </div>
        </div>

        <!-- Content -->
        <div class="p-5 flex-grow flex flex-col justify-between space-y-3">
          <div>
            <div class="flex items-center justify-between text-[11px]">
              <span class="text-charcoal-500 italic">${plant.botanical_name || ''}</span>
              <span class="font-semibold text-forest-700" dir="rtl">${plant.urdu_name || ''}</span>
            </div>
            
            <h3 class="font-serif-luxury text-lg font-bold text-forest-900 hover:text-terracotta transition cursor-pointer" onclick="openProductModal(${plant.id})">
              ${plant.name}
            </h3>

            <!-- Care Badges -->
            <div class="flex flex-wrap items-center gap-1.5 mt-2">
              <span class="badge-care text-[10px]">${sunlightLabel}</span>
              <span class="badge-care text-[10px]">${waterLabel}</span>
            </div>
          </div>

          <!-- Price & Action -->
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

// Filter triggers
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
  const plant = allPlants.find(p => p.id === id);
  if (!plant) return;

  currentModalPlant = plant;
  selectedSizeIndex = 0;
  selectedPotIndex = 0;
  modalQty = 1;

  const modal = document.getElementById('product-modal');
  modal.classList.remove('hidden');

  // Populate basic text
  document.getElementById('modal-title').innerText = plant.name;
  document.getElementById('modal-botanical').innerText = plant.botanical_name || '';
  document.getElementById('modal-urdu').innerText = plant.urdu_name || '';
  document.getElementById('modal-category').innerText = plant.category.replace('_', ' ');
  document.getElementById('modal-description').innerText = plant.description;
  document.getElementById('modal-stock').innerText = `In Stock (${plant.stock} Available in Lahore)`;
  document.getElementById('modal-qty').innerText = modalQty;

  // Care badges
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

  // Multi-Angle Interactive Gallery
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

  // Sizing & Pots Options
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

  // Update active thumbnail border
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

  // Sizes Group
  const sizesContainer = document.getElementById('modal-sizes-group');
  sizesContainer.innerHTML = sizes.map((s, idx) => `
    <label class="p-2.5 rounded-xl border-2 ${idx === selectedSizeIndex ? 'border-forest-800 bg-forest-800/5 text-forest-900 font-bold' : 'border-cream-200 text-charcoal-700'} flex items-center justify-between cursor-pointer transition">
      <input type="radio" name="variant_size" value="${idx}" ${idx === selectedSizeIndex ? 'checked' : ''} onchange="onSizeSelect(${idx})" class="hidden">
      <span>${s.name}</span>
      <span class="text-xs text-charcoal-500">${s.price_delta > 0 ? `+Rs. ${s.price_delta.toLocaleString()}` : 'Included'}</span>
    </label>
  `).join('');

  // Pots Group
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

  // Check if identical item already exists in cart
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
  const plant = allPlants.find(p => p.id === id);
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
  localStorage.setItem('lahore_botanica_cart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cart-count-badge');
  if (badge) badge.innerText = totalCount;
}

function renderCart() {
  const container = document.getElementById('cart-items-container');
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

  document.getElementById('cart-subtotal').innerText = `Rs. ${subtotal.toLocaleString()}`;
  document.getElementById('cart-delivery').innerText = deliveryFee === 0 ? 'FREE (Special Offer)' : `Rs. ${deliveryFee}`;
  document.getElementById('cart-total').innerText = `Rs. ${total.toLocaleString()}`;
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
    } else {
      alert(`Order error: ${data.error}`);
    }
  } catch (err) {
    console.error('Order error:', err);
    alert('Could not place order. Please try via WhatsApp.');
  }
}

function checkoutViaWhatsApp() {
  const name = document.getElementById('cust-name').value.trim() || 'Valued Customer';
  const phone = document.getElementById('cust-phone').value.trim() || 'N/A';
  const area = document.getElementById('cust-area').value;
  const address = document.getElementById('cust-address').value.trim() || 'Lahore';

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

  // Touch Support for Mobile
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
    }
  } catch (err) {
    console.error('Lead error:', err);
    alert('Request submitted. We will contact you shortly.');
  }
}
