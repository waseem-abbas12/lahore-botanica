// Keyword landing pages (Muzzayan-style): price pages, area pages, farmhouse pages, niche services.
// Target keyword noted per page. Claims stay general: we "serve" areas, no invented project counts.
export const TOPICS = [
  // ---------- PRICE KEYWORDS ----------
  {
    slug: 'landscaping-price-pakistan', kw: 'landscaping price in Pakistan / landscaping rates per sq ft',
    title: 'Landscaping Price in Pakistan 2026 | Rates per Sq Ft & Packages',
    desc: 'Landscaping price in Pakistan: lawn rates per sq ft, 5 marla to 1 kanal packages, rooftop, sprinkler, lighting and rockery costs. Indicative 2026 rates from The Living Garden.',
    badge: '💰 Rate List 2026', h1a: 'Landscaping Price', h1b: 'in Pakistan (2026)',
    lead: 'Garden banwane me kitna kharcha aata hai? Yahan hamare indicative rates hain: per sq ft, package aur add-on. Final rate free site visit ke baad milta hai.',
    image: 'images/projects/villa-landscaping.jpg',
    table: { head: ['Item', 'Indicative price', 'Notes'], rows: [
      ['5 to 10 marla front lawn', 'Rs. 45,000 – 85,000', 'Soil prep, grass, basic beds'],
      ['1 kanal luxury garden', 'Rs. 140,000 – 260,000', 'Lawn, palms, beds, pathway'],
      ['Modern rooftop garden', 'Rs. 65,000 – 150,000', 'Waterproofing quoted separately'],
      ['American Bermuda grass', 'Rs. 45 / sq ft', 'Installed, with standard soil prep'],
      ['Fine Dhaka grass', 'Rs. 55 / sq ft', 'Installed, with standard soil prep'],
      ['Royal Zoysia (Korean) grass', 'Rs. 75 / sq ft', 'Installed, with standard soil prep'],
      ['Date palm (installed)', 'From Rs. 18,000 each', 'Size decides price'],
      ['Automatic sprinkler system', 'From Rs. 35,000', 'Standard home lawn'],
      ['Garden lighting set', 'From Rs. 25,000', 'Warm LED, weatherproof'],
      ['Rockery waterfall', 'From Rs. 45,000', 'Recirculating pump'],
      ['Farmhouse (2–8 kanal+)', 'Custom quote', 'After site visit']
    ]},
    sections: [
      { h: 'Supply-only vs installed rates', p: ['Market me grass ke jo rates (Rs. 8 se 25 per sq ft) nazar aate hain woh aam tor par sirf grass ki supply ke hote hain. Our rates are installed rates: old soil and debris removal, sweet soil and compost layer, leveling, laying, rolling and first watering are included. Always compare like with like.'] },
      { h: 'What changes the price', list: ['Condition of the plot: construction debris or rubble adds cost', 'How much new sweet soil (bhal mitti) is needed', 'Grass type and lawn area', 'Hardscape: stone paths, patios, pergolas', 'Irrigation, lighting and water features', 'Mature vs young plants', 'Access: rooftops and narrow lanes need more labour', 'Distance from Lahore for out-of-city projects'] },
      { h: 'How to keep cost under control', list: ['Get one master plan, then build in phases', 'Lay sprinkler pipes before the grass', 'Spend on soil and leveling, save on decorative extras first', 'Use hardy local plants and young hedges', 'Ask for an itemised quote, not a lump sum'] }
    ],
    faqs: [
      { q: '1 kanal ghar ka garden banwane me kitna kharcha aata hai?', a: 'The Living Garden ke 1 kanal luxury garden packages Rs. 140,000 se 260,000 tak hain. Asal rate mitti ki halat, grass type aur hardscape par depend karta hai.' },
      { q: 'What is the landscaping rate per square foot in Pakistan?', a: 'For lawns, our indicative installed rates are Rs. 45 (Bermuda), Rs. 55 (Dhaka) and Rs. 75 (Zoysia) per sq ft. Complete gardens with hardscape are priced as a package or itemised quote.' },
      { q: 'Is the site visit free?', a: 'Yes. The first site visit and consultation are free, and you get an itemised quotation afterwards.' }
    ],
    services: ['lawn-grass-installation', 'villa-farmhouse-landscaping', 'landscape-design']
  },
  {
    slug: 'lawn-grass-price-pakistan', kw: 'grass price in Pakistan / American grass price / Korean grass price',
    title: 'Lawn Grass Price in Pakistan | American, Dhaka & Korean Grass per Sq Ft',
    desc: 'Lawn grass price in Pakistan per square foot: American (Bermuda), Fine Dhaka and Korean (Zoysia) grass, supply-only vs installed rates, and how to choose.',
    badge: '🌱 Grass Rate Guide', h1a: 'Lawn Grass Price', h1b: 'in Pakistan per Sq Ft',
    lead: 'American, Dhaka ya Korean grass: kis ka kya rate hai, supply aur installation me kya farq hai, aur aap ke lawn ke liye konsi theek hai.',
    image: 'images/projects/carpet-grass-turf.jpg',
    table: { head: ['Grass', 'Installed rate (The Living Garden)', 'Best for'], rows: [
      ['American Bermuda', 'Rs. 45 / sq ft', 'Full sun, heavy use, farmhouses'],
      ['Fine Dhaka', 'Rs. 55 / sq ft', 'Soft formal front lawns'],
      ['Royal Zoysia (Korean)', 'Rs. 75 / sq ft', 'Dense carpet, less mowing, light shade']
    ]},
    sections: [
      { h: 'Why installed prices are higher than market grass rates', p: ['Property portals list supply-only grass prices that are much lower, for example Korean grass at around Rs. 15–20 and Fine Dhaka at around Rs. 8–10 per sq ft, and American grass at around Rs. 20–25 per sq ft. Installed rates also cover removing old soil and debris, adding sweet soil and compost, leveling with a drainage slope, laying, rolling and first watering. Bad soil prep is the main reason new lawns fail.'] },
      { h: 'Which grass should you buy?', list: ['Full sun and kids or pets: American Bermuda', 'Neat front lawn with regular mowing: Fine Dhaka', 'Light shade or low mowing: Korean (Zoysia)', 'Salty water near the coast (Karachi): Paspalum or salt-tolerant Bermuda', 'Deep shade: ground covers or paving instead of grass'] },
      { h: 'Best time to lay grass', p: ['Late February to April and late summer to early autumn are the best windows. Grass laid in peak winter roots slowly because warm-season grasses go dormant.'] }
    ],
    faqs: [
      { q: 'Korean grass ka rate kya hai?', a: 'Market me Korean (Zoysia) grass ki supply aam tor par Rs. 15–20 per sq ft ke qareeb milti hai. Hamara installed rate, mitti ki tayyari samet, taqreeban Rs. 75 per sq ft hai.' },
      { q: 'Which grass is cheapest to maintain?', a: 'Once established, Zoysia needs the least mowing. Bermuda is the toughest under heat and foot traffic but needs frequent mowing in summer.' }
    ],
    sources: [['Graana: Lawn grass in Pakistan', 'https://graana.com/blog/lawn-grass'], ['Zameen: Types of lawn grass in Pakistan', 'https://www.zameen.com/blog/types-lawn-grass-pakistan.html']],
    services: ['lawn-grass-installation', 'irrigation-sprinkler-systems', 'garden-maintenance']
  },

  // ---------- NICHE SERVICE KEYWORDS ----------
  {
    slug: 'artificial-grass-installation', kw: 'artificial grass Lahore / artificial grass price Pakistan / rooftop artificial grass',
    title: 'Artificial Grass Installation in Pakistan | Rooftops, Balconies & Lawns',
    desc: 'Artificial grass installation in Lahore, Islamabad, Karachi and across Pakistan for rooftops, balconies, play areas and shaded lawns, with proper base, drainage and edging.',
    badge: '🟩 Artificial Turf', h1a: 'Artificial Grass', h1b: 'Installation',
    lead: 'Jahan asli grass nahi lag sakti (chhat, balcony, ghani chhaon, kam paani) wahan artificial grass behtar option hai. Hum sahi base aur drainage ke saath lagate hain.',
    image: 'images/projects/rooftop-terrace.jpg',
    sections: [
      { h: 'Where artificial grass makes sense', list: ['Rooftops and terraces where weight and seepage matter', 'Balconies and small courtyards', 'Deep-shade areas where real grass fails', 'Kids play areas and pet zones', 'Low-water sites, especially in Karachi'] },
      { h: 'How we install it', list: ['Clean and level the base; on soil, compacted crush base', 'On roofs, protect the waterproofing and keep drains open', 'Weed membrane on soil areas', 'Turf rolled out with joins hidden and glued', 'Edges fixed neatly against beds and walls', 'Infill where the product needs it'] },
      { h: 'Choosing quality', p: ['Pile height, density and UV stability decide how real it looks and how long it lasts in Pakistani sun. Very cheap turf fades and flattens quickly. We help you choose by use: decorative, family use or play area.'] },
      { h: 'Real or artificial?', p: ['Hum jahan mumkin ho asli grass ka mashwara dete hain, kyun ke woh thandak deti hai aur zyada natural lagti hai. Artificial grass is best where real grass cannot thrive.'] }
    ],
    faqs: [
      { q: 'Artificial grass ka rate kya hai?', a: 'Rate quality (pile height, density, UV protection) aur area par depend karta hai. Karachi me listed supply rates kuch suppliers ke paas Rs. 50–60 per sq ft se shuru hote hain; installation aur base ka kaam alag hota hai. Hum site dekh kar itemised quote dete hain.' },
      { q: 'Does artificial grass get hot?', a: 'Yes, it can get hot in direct summer sun. Lighter colours, shade from pergolas and a quick water spray help. This is why we prefer real grass for big sunny lawns.' }
    ],
    sources: [['Graana: Artificial grass in Karachi', 'https://www.graana.com/blog/premium-artificial-grass-in-karachi-elevate-your-space/']],
    services: ['rooftop-terrace-gardens', 'pergolas-gazebos', 'vertical-gardens']
  },
  {
    slug: 'gardener-mali-service', kw: 'mali service Lahore / gardener service Islamabad / lawn maintenance',
    title: 'Professional Gardener (Mali) Service | Lawn & Garden Maintenance Plans',
    desc: 'Trained gardener (mali) service and monthly garden maintenance plans for homes, farmhouses and offices in Lahore, Islamabad and across Pakistan.',
    badge: '✂️ Mali Service', h1a: 'Professional Gardener', h1b: '(Mali) Service',
    lead: 'Har hafte ya mahine trained mali team: grass cutting, edging, khaad, pruning, keeray ka ilaj aur sprinkler checks, ek fixed plan ke saath.',
    image: 'images/projects/ficus-hedge-retaining.jpg',
    sections: [
      { h: 'What our gardeners do', list: ['Mowing and edging on schedule', 'Weeding beds and lawn', 'Seasonal fertiliser and compost', 'Hedge trimming and shrub pruning', 'Pest and fungus treatment', 'Watering and sprinkler timer adjustment', 'Seasonal flower changes'] },
      { h: 'Plans', list: ['Weekly visits for lawns in the growing season', 'Fortnightly or monthly visits for smaller gardens', 'Farmhouse plans with a dedicated team', 'Annual contracts for offices, schools and societies'] },
      { h: 'Why a managed service beats a casual mali', p: ['Ek supervised team calendar ke hisab se kaam karti hai: kab khaad deni hai, kab scarify karna hai, garmi aur sardi me paani kaise badalna hai. You get consistent results and one number to call.'] }
    ],
    faqs: [
      { q: 'Mali service ka monthly kharcha kitna hai?', a: 'Garden ke size aur visits ki tadaad par depend karta hai. Site visit ke baad fixed monthly plan diya jata hai.' },
      { q: 'Do you bring your own tools and mowers?', a: 'Yes. The team brings mowers, trimmers and tools. Fertiliser and plant replacements are charged as agreed in the plan.' }
    ],
    services: ['garden-maintenance', 'irrigation-sprinkler-systems', 'lawn-grass-installation']
  },

  // ---------- FARMHOUSE KEYWORDS ----------
  {
    slug: 'farmhouse-landscaping-lahore', kw: 'farmhouse landscaping Lahore / Bedian Road farmhouse garden', city: 'lahore',
    title: 'Farmhouse Landscaping in Lahore | Bedian Road, Raiwind & Barki Road',
    desc: 'Farmhouse landscaping in Lahore: master planning, lawns, palms, driveways, event lawns, water features, irrigation and lighting for Bedian Road, Raiwind and Barki Road farmhouses.',
    badge: '🌳 Lahore Farmhouses', h1a: 'Farmhouse Landscaping', h1b: 'in Lahore',
    lead: 'Bedian Road, Raiwind aur Barki Road ki farmhouses ke liye poori planning: entrance driveway, event lawn, palm avenues, privacy hedges, paani aur raushni.',
    image: 'images/projects/resort-patio.jpg',
    sections: [
      { h: 'Planning a Lahore farmhouse', p: ['Farmhouse plots are large, so the order of work matters. We start with levels and drainage, then irrigation mains, then the big structure of trees, palms and hedges, and finally lawns and decorative areas. This saves money and avoids digging up finished work.'] },
      { h: 'Typical scope', list: ['Entrance and driveway with palm or tree avenue', 'Main event lawn (Bermuda for heavy use)', 'Boundary privacy hedges and windbreak trees', 'Seating pavilions, pergolas and BBQ areas', 'Pool-side planting and paving', 'Rockery waterfall or fountain', 'Sprinkler and drip irrigation from tube-well', 'Driveway, path and tree lighting'] },
      { h: 'Lahore climate notes', list: ['Plan shade for summer events', 'Lay lawns in spring or late summer', 'Use hardy trees: neem, sukh chain, amaltas, date palms', 'Keep event lawns well drained for monsoon'] }
    ],
    areas: ['Bedian Road', 'Raiwind Road', 'Barki Road', 'Burki and Hadyara', 'Lake City surroundings', 'Thokar and Multan Road belt'],
    faqs: [
      { q: 'Farmhouse ke liye konsi grass behtar hai?', a: 'Event lawns aur zyada chalne phirne wali jagah ke liye American Bermuda sab se mazboot hai. Guest seating ke paas chhote formal lawns me Dhaka ya Zoysia lagayi ja sakti hai.' },
      { q: 'Can the work be done in phases?', a: 'Yes. Most farmhouses are done in phases: earthwork, irrigation and trees first, then lawns, then features and lighting.' }
    ],
    services: ['villa-farmhouse-landscaping', 'water-features-fountains', 'landscape-lighting']
  },
  {
    slug: 'farmhouse-landscaping-islamabad', kw: 'farmhouse landscaping Islamabad / Chak Shahzad / Park Road / Gulberg Greens', city: 'islamabad',
    title: 'Farmhouse Landscaping in Islamabad | Chak Shahzad, Park Road & Gulberg Greens',
    desc: 'Farmhouse landscaping in Islamabad for Chak Shahzad, Park Road, Gulberg Greens, Bani Gala and Lehtrar Road: slope leveling, drainage, lawns, terraces, orchards and lighting.',
    badge: '⛰️ Islamabad Farmhouses', h1a: 'Farmhouse Landscaping', h1b: 'in Islamabad',
    lead: 'Islamabad ki farmhouses me dhalwaan zameen, pathar aur barish ka paani bara masla hai. Hum terraces, drainage aur mazboot plants ke saath garden banate hain.',
    image: 'images/projects/zen-japanese-garden.jpg',
    sections: [
      { h: 'Working with slopes and rock', p: ['Many farmhouse plots around Islamabad are sloped or rocky. Instead of forcing one flat lawn, we create terraces with stone retaining walls, steps and level lawn pockets, and plan drainage so monsoon rain does not wash the soil away.'] },
      { h: 'Typical scope', list: ['Terracing and stone retaining walls', 'Drainage channels and soak pits', 'Main lawn and view terraces', 'Fruit orchard and kitchen garden areas', 'Pergolas and outdoor lounges with views', 'Drip irrigation from bore or storage', 'Path and landscape lighting'] },
      { h: 'Islamabad climate notes', list: ['Choose plants that handle winter cold and frost', 'Plant most trees in spring or monsoon', 'Expect more rain than Lahore: drainage first', 'Check bore water quality before drip lines'] }
    ],
    areas: ['Chak Shahzad', 'Park Road', 'Gulberg Greens', 'Bani Gala', 'Lehtrar Road', 'Simly Dam Road', 'Bhara Kahu side'],
    faqs: [
      { q: 'Pahari ya dhalwaan plot par lawn kaise banta hai?', a: 'Plot ko terraces me taqseem kiya jata hai, pathar ki deewaron se mitti roki jati hai aur har terrace par level lawn ya beds banaye jate hain. Drainage pehle tay hoti hai.' },
      { q: 'Which grass suits Islamabad farmhouses?', a: 'Bermuda in sunny areas and Zoysia in lightly shaded ones. Both go dormant in cold winters and green up in spring.' }
    ],
    services: ['villa-farmhouse-landscaping', 'hardscape-paving', 'irrigation-sprinkler-systems']
  },

  // ---------- AREA KEYWORDS ----------
  {
    slug: 'landscaping-dha-lahore', kw: 'landscaping DHA Lahore / lawn design DHA / garden DHA Phase 6', city: 'lahore',
    title: 'Landscaping in DHA Lahore | Lawns & Gardens for Phase 1–9, Prism & Raya',
    desc: 'Landscaping in DHA Lahore for 5 marla to 2 kanal homes in Phase 1–9, Prism and Raya: front lawns, back gardens, rooftops, sprinklers and lighting. Free site visit.',
    badge: '📍 DHA Lahore', h1a: 'Landscaping in', h1b: 'DHA Lahore',
    lead: 'DHA Phase 1 se 9, Prism aur Raya ke gharon ke liye front lawn, back garden, rooftop aur boundary greening, DHA ke design ke mutabiq.',
    image: 'images/projects/villa-landscaping.jpg',
    sections: [
      { h: 'What DHA homes usually need', list: ['Front lawn that matches the house elevation', 'Car porch edges and planters', 'Back garden with seating or BBQ corner', 'Boundary hedges for privacy', 'Rooftop or terrace garden', 'Sprinklers and warm lighting'] },
      { h: 'New houses vs older houses', p: ['Naye ghar (Phase 6 se 9, Prism, Raya) me aksar mitti me construction ka malba hota hai, is liye pehle mitti badalna aur leveling zaroori hai. Older phases often have mature trees and shade, so lawn type and plant choice must suit lower light.'] },
      { h: 'Good to know', list: ['Coordinate with your contractor before boundary and porch finishing', 'Lay sprinkler pipes before grass', 'Choose Zoysia or ground covers for shaded front lawns', 'Plan lighting points before final paving'] }
    ],
    areas: ['Phase 1 – 4', 'Phase 5 & 6', 'Phase 7 & 8', 'Phase 9 Prism', 'Phase 9 Town', 'DHA Raya', 'DHA Rahbar (Phase 11)'],
    faqs: [
      { q: 'DHA Lahore me 1 kanal front lawn ka kitna kharcha hai?', a: 'Hamare 1 kanal luxury garden packages Rs. 140,000 se 260,000 tak hain. Sirf front lawn ho to kam bhi ho sakta hai. Site visit ke baad itemised quote milta hai.' },
      { q: 'Do you work on DHA rooftops?', a: 'Yes. Rooftop gardens in DHA are built with waterproofing checks, drainage and lightweight planters.' }
    ],
    services: ['lawn-grass-installation', 'rooftop-terrace-gardens', 'landscape-lighting']
  },
  {
    slug: 'landscaping-bahria-town-lahore', kw: 'landscaping Bahria Town Lahore / garden Bahria Orchard', city: 'lahore',
    title: 'Landscaping in Bahria Town Lahore & Bahria Orchard | Lawns, Rooftops & Care',
    desc: 'Landscaping in Bahria Town Lahore and Bahria Orchard: front lawns, back gardens, rooftop gardens, vertical gardens, sprinklers and monthly maintenance.',
    badge: '📍 Bahria Town Lahore', h1a: 'Landscaping in', h1b: 'Bahria Town Lahore',
    lead: 'Bahria Town aur Bahria Orchard ke 5 marla se 1 kanal gharon ke liye lawn, rooftop, vertical garden aur mali service.',
    image: 'images/projects/rooftop-terrace.jpg',
    sections: [
      { h: 'Popular requests in Bahria', list: ['Compact front lawns for 5 to 10 marla homes', 'Rooftop seating gardens', 'Vertical green walls on boundary walls', 'Low-maintenance gravel and planter designs', 'Monthly gardener plans'] },
      { h: 'Small plot, big impact', p: ['Chhote plots me har foot qeemti hai. We use slim planters, vertical gardens, a neat lawn strip and one focal tree or palm so the house looks green without crowding the porch.'] }
    ],
    areas: ['Bahria Town sectors A to F', 'Bahria Orchard', 'Bahria Nasheman', 'Nearby: Lake City, Valencia, Wapda Town'],
    faqs: [
      { q: '5 marla ghar me garden kaise banayen?', a: 'Chhote ghar me patli lawn strip, gamle, ek vertical garden aur ek focal plant kaafi hota hai. 5 se 10 marla front lawn packages Rs. 45,000 se 85,000 tak hain.' },
      { q: 'Do you provide monthly maintenance in Bahria Town?', a: 'Yes, weekly, fortnightly or monthly gardener plans are available.' }
    ],
    services: ['vertical-gardens', 'rooftop-terrace-gardens', 'garden-maintenance']
  },
  {
    slug: 'landscaping-gulberg-model-town-lahore', kw: 'landscaping Gulberg Lahore / Model Town garden renovation', city: 'lahore',
    title: 'Garden Landscaping in Gulberg, Model Town & Cantt Lahore | Renovation',
    desc: 'Garden design and renovation for older homes in Gulberg, Model Town, Cantt and Shadman Lahore: reviving lawns, working with mature trees, shade planting and new hardscape.',
    badge: '📍 Central Lahore', h1a: 'Garden Renovation in', h1b: 'Gulberg & Model Town',
    lead: 'Purane gharon ke bare lawn aur purane darakht: hum garden ko naya bana dete hain, darakhton ko bachate hue.',
    image: 'images/projects/cobblestone-walkway.jpg',
    sections: [
      { h: 'Renovating mature gardens', list: ['Reviving tired or patchy lawns', 'Shade-tolerant grass and ground covers under big trees', 'Tree pruning and crown lifting for light', 'Replacing broken paths with natural stone', 'Adding irrigation to an existing garden', 'New lighting for evenings'] },
      { h: 'Keep the trees, fix the light', p: ['Bare darakht kaatne ke bajaye hum unki neeche wali shakhen halki karte hain taake lawn tak dhoop pohanche. Where grass still struggles, we use ground covers, gravel or paving designs that look intentional.'] }
    ],
    areas: ['Gulberg I – V', 'Model Town', 'Cantt', 'Shadman', 'Garden Town', 'Faisal Town', 'Johar Town'],
    faqs: [
      { q: 'Bare darakhton ke neeche grass kyun nahi lagti?', a: 'Zyada chhaon aur darakhton ki jaron ka paani lene ki wajah se. Halki pruning, Zoysia ya ground cover is ka hal hai.' },
      { q: 'Can you renovate only part of the garden?', a: 'Yes, we can redo the lawn, paths or lighting separately within an overall plan.' }
    ],
    services: ['landscape-design', 'hardscape-paving', 'garden-maintenance']
  },
  {
    slug: 'landscaping-dha-islamabad', kw: 'landscaping DHA Islamabad / garden design DHA Phase 2', city: 'islamabad',
    title: 'Landscaping in DHA Islamabad | Lawns, Terraces & Gardens Phase 1–5',
    desc: 'Landscaping in DHA Islamabad Phase 1 to 5: lawns, sloped-plot terracing, drainage, rooftop gardens and lighting suited to Islamabad\'s rain and winters.',
    badge: '📍 DHA Islamabad', h1a: 'Landscaping in', h1b: 'DHA Islamabad',
    lead: 'DHA Islamabad ke gharon ke liye lawn, terraces aur drainage, Islamabad ki barish aur sardi ko dekhte hue.',
    image: 'images/projects/swimming-pool-garden.jpg',
    sections: [
      { h: 'What matters in DHA Islamabad', list: ['Drainage for heavy rain', 'Leveling or terracing on uneven plots', 'Grass that recovers after cold winters', 'Plants that handle frost', 'Rooftop gardens with proper waterproofing'] },
      { h: 'Our approach', p: ['Har plot ki level aur paani ke bahao ko pehle dekha jata hai. Then we lay drainage and irrigation, improve the soil, and plant species that handle both summer heat and winter cold.'] }
    ],
    areas: ['DHA Phase 1', 'DHA Phase 2', 'DHA Phase 3', 'DHA Phase 4', 'DHA Phase 5', 'DHA Valley'],
    faqs: [
      { q: 'Islamabad me sardi me grass ka kya hota hai?', a: 'Bermuda aur Dhaka sardi me dormant ho kar halki peeli parti hain aur bahar me dobara hari ho jati hain. Sardi me paani kam dena chahiye.' },
      { q: 'Do you serve DHA Islamabad from Lahore?', a: 'We take projects across Pakistan, including Islamabad and Rawalpindi. Book a site visit and we schedule the team.' }
    ],
    services: ['lawn-grass-installation', 'hardscape-paving', 'irrigation-sprinkler-systems']
  },
  {
    slug: 'landscaping-bahria-town-islamabad', kw: 'landscaping Bahria Town Islamabad Rawalpindi / Bahria Enclave garden', city: 'islamabad',
    title: 'Landscaping in Bahria Town Islamabad, Rawalpindi & Bahria Enclave',
    desc: 'Landscaping in Bahria Town Islamabad and Rawalpindi (Phase 1–8) and Bahria Enclave: lawns, terraces on slopes, rooftops, vertical gardens and maintenance.',
    badge: '📍 Bahria Town Isb/Rwp', h1a: 'Landscaping in', h1b: 'Bahria Town Islamabad',
    lead: 'Bahria Town Phase 1 se 8 aur Bahria Enclave ke gharon ke liye lawn, dhalwaan par terraces, rooftop aur mali service.',
    image: 'images/projects/pergola-gazebo.jpg',
    sections: [
      { h: 'Common needs', list: ['Lawns on uneven or sloped plots', 'Retaining walls and steps', 'Rooftop seating with pergola', 'Vertical gardens on boundary walls', 'Drip irrigation where water supply is irregular', 'Monthly gardener plans'] },
      { h: 'Water-wise by design', p: ['Kuch ilaqon me paani ki supply be-qaida hoti hai. Timers, drip lines, mulching and hardy plants keep the garden alive through dry spells.'] }
    ],
    areas: ['Phase 1 – 6', 'Phase 7 & 8', 'Bahria Enclave', 'Safari Villas', 'Nearby: DHA Phase 1 & 2, Gulraiz'],
    faqs: [
      { q: 'Bahria Enclave ke dhalwaan plots par lawn ho sakta hai?', a: 'Ji haan, terraces aur retaining walls ke saath level lawn pockets banaye jate hain, aur drainage pehle tay ki jati hai.' },
      { q: 'Do you install drip irrigation with water tanks?', a: 'Yes. Drip systems can run from an overhead or underground tank with a small pump and timer.' }
    ],
    services: ['hardscape-paving', 'irrigation-sprinkler-systems', 'garden-maintenance']
  },
  {
    slug: 'landscaping-dha-karachi-clifton', kw: 'landscaping DHA Karachi / Clifton garden / coastal garden Karachi', city: 'karachi',
    title: 'Landscaping in DHA Karachi & Clifton | Salt-Tolerant Coastal Gardens',
    desc: 'Coastal landscaping in DHA Karachi and Clifton: salt-tolerant grass and plants, soil improvement, water-wise drip irrigation, rooftop and courtyard gardens.',
    badge: '📍 DHA & Clifton Karachi', h1a: 'Coastal Gardens in', h1b: 'DHA Karachi & Clifton',
    lead: 'Samandar ke qareeb namkeen hawa, ret wali mitti aur khara paani: hum aise plants aur grass chunte hain jo DHA aur Clifton me tik sakein.',
    image: 'images/projects/water-fountain.jpg',
    sections: [
      { h: 'Gardening by the sea', p: ['Homes close to the sea in DHA and Clifton face salt-laden wind, sandy or saline soil and often brackish water. Gardens succeed here with soil improvement, salt-tolerant species and careful watering.'] },
      { h: 'What we use', list: ['Paspalum or salt-tolerant Bermuda for lawns', 'Sweet soil and organic matter to improve sandy soil', 'Windbreak hedges on the sea-facing side', 'Hardy plants: bougainvillea, oleander, date palms, frangipani, coastal succulents', 'Drip irrigation and mulch to save water', 'Smaller lawns with gravel and paving'] }
    ],
    areas: ['DHA Phase 1 – 8', 'Clifton blocks', 'Bath Island', 'Nearby: PECHS, Bahria Town Karachi'],
    faqs: [
      { q: 'Karachi me samandar ke paas konsi grass lagti hai?', a: 'Paspalum aur salt-tolerant Bermuda namkeen paani aur hawa ko behtar bardasht karti hain. Mitti ko behtar karna bhi zaroori hai.' },
      { q: 'How can I save water in a Karachi garden?', a: 'Reduce lawn area, use drip irrigation on timers, mulch beds and choose drought and salt tolerant plants.' }
    ],
    sources: [['Zameen: Home gardening tips for Karachi', 'https://www.zameen.com/blog/home-gardening-tips-karachi-city.html']],
    services: ['lawn-grass-installation', 'irrigation-sprinkler-systems', 'vertical-gardens']
  },

  // ---------- MORE CITIES: AREA KEYWORDS ----------
  {
    slug: 'landscaping-faisalabad-canal-road', kw: 'landscaping Faisalabad / garden design Canal Road / lawn Peoples Colony', city: 'faisalabad',
    title: 'Landscaping in Faisalabad | Canal Road, Peoples Colony, Madina Town & Wapda City',
    desc: 'Landscaping in Faisalabad for Canal Road, Peoples Colony, Madina Town, Susan Road, Wapda City and Citi Housing: lawns, hardscape, rooftops, irrigation and maintenance.',
    badge: '📍 Faisalabad', h1a: 'Landscaping in', h1b: 'Faisalabad',
    lead: 'Faisalabad ke gharon, farmhouses aur factories ke liye lawn, pathways, rooftop aur sprinkler, yahan ki garmi aur paani ko dekhte hue.',
    image: 'images/projects/villa-landscaping.jpg',
    sections: [
      { h: 'Gardens for Faisalabad homes', list: ['Front lawns for 5 marla to 2 kanal homes', 'Back gardens with seating and BBQ corners', 'Rooftop gardens with waterproofing checks', 'Factory and office green belts', 'Canal Road farmhouse landscaping', 'Sprinkler and drip irrigation'] },
      { h: 'Check the water first', p: ['Faisalabad ke kuch ilaqon me boring ka paani khara ho sakta hai. We check water before choosing grass and plants, and use salt-tolerant options where needed.'] },
      { h: 'Industrial and commercial sites', p: ['Faisalabad is an industrial city, and factory frontages, offices and housing schemes need durable, low-maintenance landscaping. We design hardy green belts with efficient irrigation and offer annual maintenance contracts.'] }
    ],
    areas: ['Canal Road', 'Peoples Colony', 'Madina Town', 'Susan Road', 'D Ground', 'Wapda City', 'Citi Housing', 'Jaranwala Road'],
    faqs: [
      { q: 'Faisalabad me lawn banwane ka kharcha kitna hai?', a: 'Hamare 5 se 10 marla front lawn packages Rs. 45,000 se 85,000 aur 1 kanal garden Rs. 140,000 se 260,000 tak hain. Lahore se bahar ke projects me transport shamil ho sakta hai.' },
      { q: 'Do you landscape factories in Faisalabad?', a: 'Yes. We design and maintain factory frontages, green belts and office grounds, with annual maintenance contracts available.' }
    ],
    services: ['lawn-grass-installation', 'commercial-society-landscaping', 'irrigation-sprinkler-systems']
  },
  {
    slug: 'landscaping-dha-multan', kw: 'landscaping Multan / DHA Multan garden / heat tolerant lawn Multan', city: 'multan',
    title: 'Landscaping in Multan & DHA Multan | Heat-Proof Lawns and Gardens',
    desc: 'Landscaping in Multan and DHA Multan, Bosan Road, Gulgasht and Buch Villas: heat-tolerant lawns, shade trees, windbreak hedges, drip irrigation and maintenance.',
    badge: '📍 Multan', h1a: 'Landscaping in', h1b: 'Multan & DHA Multan',
    lead: 'Multan ki shadeed garmi aur aandhi me bhi hara bhara garden: garmi bardasht karne wali grass, chhaon dene wale darakht aur paani bachane wali drip.',
    image: 'images/projects/resort-patio.jpg',
    sections: [
      { h: 'Designing for extreme heat', list: ['Bermuda or Paspalum lawns for full sun', 'Shade trees on the west and south sides', 'Pergolas over seating areas', 'Windbreak hedges against dust storms', 'Mulched beds and drip irrigation', 'Smaller lawns with stone and gravel zones'] },
      { h: 'Watering that works in Multan', p: ['Garmi me dopahar ka paani zyada tar bhaap ban kar ur jata hai. Water before sunrise, deeply and less often, with timers so it happens every day without fail.'] }
    ],
    areas: ['DHA Multan', 'Bosan Road', 'Gulgasht Colony', 'Cantt', 'Wapda Town', 'Royal Orchard', 'Buch Villas', 'Shershah Road farmhouses'],
    faqs: [
      { q: 'Multan ki garmi me konsi grass zinda rehti hai?', a: 'American Bermuda sab se zyada garmi bardasht karti hai. Khare paani wali jagah par Paspalum behtar hai. Dono ko subah sawere paani dena zaroori hai.' },
      { q: 'Which trees give quick shade in Multan?', a: 'Neem, sukh chain and date palms handle the heat well. Neem and sukh chain give dense shade relatively quickly.' }
    ],
    services: ['lawn-grass-installation', 'pergolas-gazebos', 'irrigation-sprinkler-systems']
  },
  {
    slug: 'landscaping-hayatabad-peshawar', kw: 'landscaping Peshawar / Hayatabad garden / DHA Peshawar lawn', city: 'peshawar',
    title: 'Landscaping in Peshawar | Hayatabad, University Town & DHA Peshawar',
    desc: 'Landscaping in Peshawar for Hayatabad, University Town, DHA Peshawar and Regi Model Town: lawns, terraces, hedges, irrigation and gardens for hot summers and cold winters.',
    badge: '📍 Peshawar', h1a: 'Landscaping in', h1b: 'Peshawar & Hayatabad',
    lead: 'Hayatabad, University Town aur DHA Peshawar ke gharon ke liye lawn aur garden, jo garmi aur sardi dono me khoobsurat rahein.',
    image: 'images/projects/cobblestone-walkway.jpg',
    sections: [
      { h: 'Gardens for Peshawar\'s two seasons', list: ['Grass that recovers after cold winters', 'Frost-tolerant shrubs and hedges', 'Privacy hedges and boundary greening', 'Stone pathways and courtyards', 'Fruit trees and kitchen gardens', 'Tank-fed drip irrigation on timers'] },
      { h: 'Improving hard ground', p: ['Naye sectors me mitti aksar sakht aur kankar wali hoti hai. We remove gravel and debris, add sweet soil and compost, and level the lawn with a drainage slope.'] }
    ],
    areas: ['Hayatabad Phase 1 – 7', 'University Town', 'DHA Peshawar', 'Regi Model Town', 'Cantt', 'Warsak Road'],
    faqs: [
      { q: 'Peshawar me sardi me grass kyun peeli hoti hai?', a: 'Warm-season grasses thand me dormant ho jati hain. Bahar me dhoop aur garmi ke saath dobara hari ho jati hain. Sardi me paani kam dein.' },
      { q: 'Do you take projects in Peshawar?', a: 'Yes. We work across Pakistan. Book a site visit and we schedule the team for your location.' }
    ],
    services: ['lawn-grass-installation', 'hardscape-paving', 'garden-maintenance']
  },
  {
    slug: 'landscaping-sialkot-cantt', kw: 'landscaping Sialkot / garden Sialkot Cantt / Defence Road lawn', city: 'sialkot',
    title: 'Landscaping in Sialkot | Cantt, Defence Road, Model Town & Citi Housing',
    desc: 'Landscaping in Sialkot for Cantt, Defence Road, Model Town, Paris Road and Citi Housing: lawns with proper drainage, hedges, rooftops, lighting and maintenance.',
    badge: '📍 Sialkot', h1a: 'Landscaping in', h1b: 'Sialkot',
    lead: 'Sialkot me barish zyada hoti hai, is liye hum garden me drainage pehle banate hain, phir lawn aur plants lagate hain.',
    image: 'images/projects/swimming-pool-garden.jpg',
    sections: [
      { h: 'Built for a wetter climate', list: ['Drainage slope under every lawn', 'Raised beds where water collects', 'Fungus-resistant plant choices', 'Strong privacy hedges', 'Garden and facade lighting', 'Office and factory frontages for exporters'] },
      { h: 'Corporate and export-house greening', p: ['Sialkot ke export units aur offices ke liye saaf suthre entrance gardens, green belts aur vertical gardens, annual maintenance ke saath.'] }
    ],
    areas: ['Sialkot Cantt', 'Defence Road', 'Model Town', 'Paris Road', 'Citi Housing Sialkot', 'Sambrial Road'],
    faqs: [
      { q: 'Barish me lawn me paani kyun khara rehta hai?', a: 'Leveling ke waqt drainage slope na dene ki wajah se. Hum lawn ko halka dhalwan dete hain aur zaroorat ho to drain ya soak pit banate hain.' },
      { q: 'Do you landscape offices and factories in Sialkot?', a: 'Yes, including entrance gardens, green belts and annual maintenance.' }
    ],
    services: ['lawn-grass-installation', 'commercial-society-landscaping', 'landscape-lighting']
  },
  {
    slug: 'landscaping-dha-gujranwala', kw: 'landscaping Gujranwala / DHA Gujranwala garden / Citi Housing lawn', city: 'gujranwala',
    title: 'Landscaping in Gujranwala & DHA Gujranwala | Lawns, Rooftops & Care',
    desc: 'Landscaping in Gujranwala for DHA Gujranwala, Citi Housing, Model Town and Satellite Town: lawn installation, rooftops, vertical gardens, sprinklers and maintenance.',
    badge: '📍 Gujranwala', h1a: 'Landscaping in', h1b: 'Gujranwala',
    lead: 'DHA Gujranwala, Citi Housing aur Model Town ke naye aur purane gharon ke liye lawn, rooftop aur garden care, Lahore jaisi quality ke saath.',
    image: 'images/projects/carpet-grass-turf.jpg',
    sections: [
      { h: 'What Gujranwala homes need', list: ['New-house lawns with proper soil replacement', 'Front gardens matched to the elevation', 'Rooftop seating gardens', 'Vertical gardens on boundary walls', 'Sprinklers and lighting', 'Monthly maintenance plans'] },
      { h: 'New schemes, new soil', p: ['DHA aur Citi Housing ke naye plots me upar ki mitti ke neeche aksar malba hota hai. Grass lagane se pehle yeh nikalna aur sweet soil dalna lawn ki umar barhata hai.'] }
    ],
    areas: ['DHA Gujranwala', 'Citi Housing', 'Model Town', 'Satellite Town', 'Peoples Colony', 'Wapda Town', 'GT Road farmhouses'],
    faqs: [
      { q: 'Gujranwala Lahore ke qareeb hai, kya site visit jaldi ho sakti hai?', a: 'Ji haan. Lahore se qareeb hone ki wajah se Gujranwala ki site visits aasani se schedule ho jati hain.' },
      { q: 'Which grass is best in Gujranwala?', a: 'Bermuda for sunny lawns and heavy use, Dhaka for soft front lawns, and Zoysia for lightly shaded areas.' }
    ],
    services: ['lawn-grass-installation', 'rooftop-terrace-gardens', 'vertical-gardens']
  }
];
