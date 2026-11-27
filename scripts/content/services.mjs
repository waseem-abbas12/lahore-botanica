// Service pages for The Living Garden. Prices only where the site already publishes them;
// everything else is quoted after a free site visit.
export const SERVICES = [
  {
    slug: 'landscape-design',
    name: 'Landscape Design & 3D Master Planning',
    short: 'Site survey, zoning, planting plan and 3D visuals before a single tile is laid.',
    tag: 'Design Studio',
    image: 'images/projects/zen-japanese-garden.jpg',
    metaTitle: 'Landscape Design & 3D Garden Planning in Pakistan | The Living Garden',
    metaDesc: 'Professional landscape design in Pakistan: site survey, zoning, planting plans, hardscape layout and 3D visuals for homes, farmhouses and commercial sites. Free site visit.',
    intro: [
      'Har acha garden ek ache plan se shuru hota hai. Our design team visits the site, measures it, checks sun direction, soil, drainage and water source, and then turns your wish-list into a clear landscape master plan.',
      'You see the layout, the plant palette and the hardscape in a 3D view first, so changes happen on screen and not after the concrete has set. The same drawings guide our build team, which keeps cost and timeline under control.'
    ],
    includes: [
      'On-site survey: measurements, levels, sun and shade mapping, soil and drainage check',
      'Zoning plan: lawn, seating, play area, pathways, parking and service zones',
      'Planting plan matched to your city climate, sunlight and maintenance budget',
      'Hardscape layout: paving, pergolas, water features, lighting points',
      '3D visuals and a revision round before final drawings',
      'Itemised bill of quantities so you know exactly what you are paying for'
    ],
    bestFor: ['New houses before the boundary wall is finished', 'Farmhouses and large plots that need phasing', 'Renovating a tired or patchy garden', 'Societies and commercial sites that need approved drawings'],
    price: 'Design is quoted with the build. For design-only work, the fee depends on plot size and is shared after the site visit.',
    faqs: [
      { q: 'Kya design ke baghair seedha kaam shuru ho sakta hai?', a: 'Chhote front lawns par haan, lekin 1 kanal se bare plots, farmhouses aur rooftops par pehle plan banana behtar hai. Plan se drainage, levels aur pipe routes pehle tay ho jate hain, jis se baad me tor phor nahi karni parti.' },
      { q: 'How long does a landscape design take?', a: 'For a typical home garden, the survey takes one visit and the first concept is usually ready within a few working days. Larger farmhouse or commercial plans take longer because of levels and phasing.' },
      { q: 'Do you design for low maintenance?', a: 'Yes. Tell us how much time and water you have. We can reduce lawn area, use hardy local plants, add drip irrigation and use gravel or paving in hard-to-maintain corners.' }
    ],
    related: ['lawn-grass-installation', 'hardscape-paving', 'villa-farmhouse-landscaping']
  },
  {
    slug: 'lawn-grass-installation',
    name: 'Lawn & Grass Installation',
    short: 'Soil preparation, leveling and Bermuda, Dhaka or Zoysia grass laid for a dense, even lawn.',
    tag: 'Softscape',
    image: 'images/projects/carpet-grass-turf.jpg',
    metaTitle: 'Lawn Grass Installation in Pakistan | Bermuda, Dhaka & Korean Grass',
    metaDesc: 'Lawn grass installation with proper soil preparation and leveling. American Bermuda, Fine Dhaka and Zoysia (Korean) grass for homes and farmhouses across Pakistan.',
    intro: [
      'A lawn is only as good as the soil under it. Hum pehle purani mitti, malba aur jangli ghaas nikalte hain, phir sweet soil (bhal mitti) aur organic compost ki layer dal kar zameen ko level karte hain, taake paani kahin khara na ho.',
      'Then we lay the grass that suits your sunlight, water and foot traffic, roll it, and hand over a simple watering schedule for the first weeks while the roots settle.'
    ],
    includes: [
      'Removal of old grass, weeds, construction debris and stones',
      'Sweet soil (bhal mitti) and compost layer, then fine leveling with a slope for drainage',
      'Grass laid as carpet strips or planted as plugs, depending on type and budget',
      'Rolling and first deep watering',
      'Edging along beds and pathways',
      'Written aftercare: watering, first mowing and feeding'
    ],
    grassTable: [
      { name: 'American Bermuda', rate: 'Rs. 45 / sq ft installed', note: 'Heat and drought hardy, spreads fast, recovers from foot traffic. Needs full sun.' },
      { name: 'Fine Dhaka', rate: 'Rs. 55 / sq ft installed', note: 'Soft, fine blade and deep green. Popular for front lawns. Needs regular mowing.' },
      { name: 'Royal Zoysia (Korean)', rate: 'Rs. 75 / sq ft installed', note: 'Very dense, carpet-like and slow growing, so less mowing. Handles light shade better.' }
    ],
    bestFor: ['New house lawns', 'Replacing a patchy or weedy lawn', 'Farmhouse lawns and event areas', 'Play areas and backyards'],
    price: 'Indicative installed rates: Bermuda Rs. 45, Dhaka Rs. 55 and Zoysia Rs. 75 per sq ft. Final cost depends on soil work and site access, confirmed after the free site visit.',
    faqs: [
      { q: 'Pakistan me konsi grass sab se behtar hai?', a: 'Full dhoop aur zyada chalne phirne wali jagah ke liye American Bermuda. Soft aur gehri hari front lawn ke liye Fine Dhaka. Kam mowing aur carpet look ke liye Zoysia (Korean). Sahi choice dhoop ke ghanton aur paani par depend karti hai.' },
      { q: 'What is the best season to lay grass?', a: 'Warm-season grasses establish best from late February to April and again in late summer to early autumn (roughly August to October). Avoid peak cold months, when grass goes dormant and roots slowly.' },
      { q: 'How soon can we walk on a new lawn?', a: 'Light walking is fine after about two to three weeks, once the roots grip the soil. Avoid heavy use, parties or games for four to six weeks.' },
      { q: 'Does grass grow in shade?', a: 'Bermuda struggles in shade. Zoysia tolerates light shade better. In deep shade under trees or between buildings, we suggest ground covers, gravel or paving instead of grass.' }
    ],
    related: ['irrigation-sprinkler-systems', 'garden-maintenance', 'landscape-design']
  },
  {
    slug: 'villa-farmhouse-landscaping',
    name: 'Villa & Farmhouse Landscaping',
    short: 'Turnkey gardens for kanal homes and farmhouses: lawns, palms, pathways, water and lights.',
    tag: 'Turnkey Residential',
    image: 'images/projects/swimming-pool-garden.jpg',
    metaTitle: 'Villa & Farmhouse Landscaping in Pakistan | Turnkey Garden Design & Build',
    metaDesc: 'Turnkey landscaping for 1-2 kanal villas and farmhouses in Pakistan: lawns, palms, pathways, pergolas, water features, irrigation and lighting by one team.',
    intro: [
      'Kanal homes and farmhouses need more than grass. They need a plan for driveways, guest seating, a family lawn, privacy along the boundary, shade, and water that reaches every corner.',
      'The Living Garden handles it end to end: design, earthwork, planting, hardscape, irrigation and lighting by one team, with one point of contact and one schedule.'
    ],
    includes: [
      'Master plan with phasing for large plots',
      'Earthwork, leveling and soil improvement',
      'Main lawn, flower beds and boundary privacy hedges',
      'Specimen palms and shade trees (date palms from Rs. 18,000 each, installed)',
      'Pathways, patios, pergolas and BBQ or seating areas',
      'Sprinkler and drip irrigation, landscape lighting, water features'
    ],
    bestFor: ['1 kanal and 2 kanal homes', 'Farmhouses (2 to 8 kanal and above)', 'Weekend houses and event lawns', 'Homes with swimming pools'],
    price: '1 kanal luxury garden packages start from Rs. 140,000 to 260,000. Farmhouses are quoted after a site visit because scope varies a lot.',
    faqs: [
      { q: 'Farmhouse landscaping me kitna waqt lagta hai?', a: 'Scope par depend karta hai. Ek 1 kanal ghar ka garden aam tor par kuch hafton me mukammal ho jata hai. Bari farmhouses ko phases me kiya jata hai, taake har hissa mausam ke hisab se lagaya ja sake.' },
      { q: 'Can you work on a farmhouse outside Lahore?', a: 'Yes. We take projects across Pakistan. For distant sites, the team plans material delivery and stays on site for the build phases.' },
      { q: 'Do you plant mature trees?', a: 'Yes. Mature palms and selected trees can be transplanted for an instant look. We advise on which species handle transplanting well in your climate.' }
    ],
    related: ['landscape-design', 'water-features-fountains', 'landscape-lighting']
  },
  {
    slug: 'hardscape-paving',
    name: 'Hardscape, Paving & Pathways',
    short: 'Natural stone, cobblestone and tile pathways, patios, steps, edging and retaining walls.',
    tag: 'Hardscape',
    image: 'images/projects/cobblestone-walkway.jpg',
    metaTitle: 'Hardscape & Garden Paving in Pakistan | Stone Pathways & Patios',
    metaDesc: 'Garden hardscape in Pakistan: natural stone and cobblestone pathways, patios, steps, edging, planters and retaining walls built on a proper base.',
    intro: [
      'Hardscape gives a garden its structure. Pathways guide people, patios give space to sit, and edging keeps the lawn neat. Agar base sahi na ho to tiles beth jati hain aur barish ka paani khara rehta hai.',
      'We build on a compacted base with the right slope, choose stone that stays cool and non-slip, and blend paving with planting so it looks natural rather than heavy.'
    ],
    includes: [
      'Pathways in natural stone, cobblestone, pavers or stepping stones',
      'Patios and seating areas with drainage slope',
      'Garden steps, raised beds and planters',
      'Kerb and lawn edging',
      'Retaining walls and level changes',
      'Gravel and pebble zones for low maintenance'
    ],
    bestFor: ['Front yards and driveways edges', 'Seating and BBQ areas', 'Sloped plots', 'Low-water gardens'],
    price: 'Priced per square foot or running foot depending on material. Shared as an itemised quote after the site visit.',
    faqs: [
      { q: 'Garmi me konsa stone thanda rehta hai?', a: 'Halke rang ke natural stones aur textured finish wale pavers dhoop me kam garam hote hain aur phislan bhi kam hoti hai. Glossy aur dark tiles se outdoor me parhez behtar hai.' },
      { q: 'Will paving stop rainwater from draining?', a: 'Not if it is built right. We give every patio and path a slight slope towards beds or drains, and can use permeable gravel or gaps between stepping stones.' }
    ],
    related: ['pergolas-gazebos', 'landscape-lighting', 'landscape-design']
  },
  {
    slug: 'pergolas-gazebos',
    name: 'Pergolas, Gazebos & Outdoor Living',
    short: 'Wooden, steel and composite pergolas, gazebos and shaded seating built for Pakistani summers.',
    tag: 'Outdoor Living',
    image: 'images/projects/pergola-gazebo.jpg',
    metaTitle: 'Pergolas & Gazebos in Pakistan | Garden Shade Structures',
    metaDesc: 'Custom pergolas and gazebos for gardens, rooftops and farmhouses in Pakistan. Wood, steel and composite structures with climbers, lighting and seating.',
    intro: [
      'Shade turns a lawn into a place you actually use. A pergola over a seating area, a gazebo by the lawn or a covered BBQ corner makes the garden usable on summer evenings and winter afternoons alike.',
      'We design the structure to suit the house, anchor it properly, and plan climbers such as bougainvillea, jasmine or grape vine to soften it over time.'
    ],
    includes: [
      'Design matched to the house style and space',
      'Treated wood, powder-coated steel or composite options',
      'Proper footings and anchoring for wind',
      'Climbing plants and planters around the structure',
      'Lighting and fan points, if needed',
      'Optional seating, swings and outdoor kitchen corners'
    ],
    bestFor: ['Lawn seating areas', 'Rooftop terraces', 'Farmhouse lounges', 'Poolside shade'],
    price: 'Depends on size and material. Quoted after the site visit with drawings.',
    faqs: [
      { q: 'Lakri ki pergola kitne saal chalti hai?', a: 'Treated aur sealed lakri sahi dekh bhal ke saath kai saal chalti hai. Har saal ya do saal baad sealing/polish karwana chahiye. Kam maintenance chahiye to steel ya composite behtar hain.' },
      { q: 'Can a pergola go on a rooftop?', a: 'Yes, if the roof can take the load and the footings do not damage the waterproofing. We check the slab and use base plates rather than drilling through the waterproofing where possible.' }
    ],
    related: ['rooftop-terrace-gardens', 'hardscape-paving', 'landscape-lighting']
  },
  {
    slug: 'water-features-fountains',
    name: 'Water Features, Fountains & Rockeries',
    short: 'Rockery waterfalls, fountains, reflecting pools and koi ponds with recirculating pumps.',
    tag: 'Water Features',
    image: 'images/projects/rockery-waterfall.jpg',
    metaTitle: 'Garden Water Features & Fountains in Pakistan | Rockery Waterfalls',
    metaDesc: 'Garden water features in Pakistan: rockery waterfalls, fountains, reflecting pools and koi ponds with recirculating pumps, lighting and easy maintenance.',
    intro: [
      'Paani ki awaaz garden ka mahol badal deti hai. A small wall fountain suits a courtyard, while a natural boulder rockery with a waterfall can become the centrepiece of a farmhouse lawn.',
      'Our water features recirculate the same water, so running cost is low. We plan the pump, filter, overflow and lighting so the feature stays clean and easy to look after.'
    ],
    includes: [
      'Natural boulder rockeries and cascading waterfalls (rockery add-on from Rs. 45,000)',
      'Wall fountains and standalone fountains',
      'Reflecting pools and koi ponds',
      'Recirculating pump, filtration and overflow',
      'Underwater and accent lighting',
      'Planting around the feature'
    ],
    bestFor: ['Lawn centrepieces', 'Entrances and courtyards', 'Farmhouses and resorts', 'Commercial lobbies and plazas'],
    price: 'Rockery waterfall add-on starts from Rs. 45,000. Larger ponds and fountains are quoted after the site visit.',
    faqs: [
      { q: 'Kya water feature me paani bohat zaya hota hai?', a: 'Nahi. Hamare features recirculating hote hain, yani wohi paani ghoomta rehta hai. Sirf garmi me bukharat (evaporation) ki wajah se kabhi kabhar paani top-up karna parta hai.' },
      { q: 'How do you stop mosquitoes and algae?', a: 'Moving water, a proper filter and some shade keep algae down. In ponds, fish help control mosquito larvae. We also show you a simple cleaning routine.' }
    ],
    related: ['villa-farmhouse-landscaping', 'landscape-lighting', 'hardscape-paving']
  },
  {
    slug: 'vertical-gardens',
    name: 'Vertical Gardens & Green Walls',
    short: 'Living green walls for homes, offices and boundary walls with built-in drip irrigation.',
    tag: 'Vertical Greening',
    image: 'images/projects/vertical-green-wall.jpg',
    metaTitle: 'Vertical Gardens & Green Walls in Pakistan | Living Wall Installation',
    metaDesc: 'Vertical garden and green wall installation in Pakistan for homes, offices, restaurants and boundary walls, with drip irrigation and plants chosen for your climate.',
    intro: [
      'Jab zameen kam ho to deewar istemal karein. Vertical gardens add greenery to boundary walls, balconies, office lobbies and restaurant facades without taking floor space.',
      'We use a modular frame that keeps moisture off the wall, built-in drip lines on a timer, and plants that suit the light at that wall, whether it is full sun or indoor.'
    ],
    includes: [
      'Wall survey: light, wind, water point and wall condition',
      'Modular planter or felt-pocket system with a gap from the wall',
      'Drip irrigation with a timer and drainage tray',
      'Plant palette for sun, shade or indoor light',
      'Optional artificial or mixed walls for no-water spots',
      'Maintenance visits to trim and replace plants'
    ],
    bestFor: ['Boundary and facade walls', 'Balconies and small courtyards', 'Office receptions and cafes', 'Hiding service walls'],
    price: 'Priced per square foot of wall, depending on system and plants. Quoted after the site visit.',
    faqs: [
      { q: 'Kya vertical garden se deewar me seelan aati hai?', a: 'Sahi system me nahi. Hum frame ko deewar se thora hata kar lagate hain aur neeche drainage tray dete hain, is liye paani deewar tak nahi pohanchta.' },
      { q: 'Which plants work on a sunny wall?', a: 'Hardy succulents, ornamental grasses, wandering jew, asparagus fern and some trailing flowering plants handle sun well. Shaded and indoor walls suit pothos, ferns, philodendron and peace lily.' }
    ],
    related: ['rooftop-terrace-gardens', 'irrigation-sprinkler-systems', 'commercial-society-landscaping']
  },
  {
    slug: 'rooftop-terrace-gardens',
    name: 'Rooftop & Terrace Gardens',
    short: 'Seepage-safe rooftop gardens with waterproofing, drainage, lightweight soil and planters.',
    tag: 'Rooftop',
    image: 'images/projects/rooftop-terrace.jpg',
    metaTitle: 'Rooftop Garden Design in Pakistan | Waterproof Terrace Gardens',
    metaDesc: 'Rooftop and terrace garden design in Pakistan with waterproofing, drainage, lightweight soil, planters, pergolas and drip irrigation. Seepage-safe build.',
    intro: [
      'Chhat par garden ka sab se bara dar seelan (seepage) hai. A rooftop garden is safe only when waterproofing, drainage and load are planned first, and plants come last.',
      'We check the slab, add or test waterproofing, lay drainage and protection layers, and use lightweight soil mixes and raised planters so the roof stays dry and the garden stays green.'
    ],
    includes: [
      'Slab and load check, existing waterproofing inspection',
      'Waterproofing membrane and flood test before planting',
      'Drainage layer, root barrier and filter fabric',
      'Lightweight soil mix and raised planters',
      'Artificial or natural grass, decking, pergola and seating',
      'Drip irrigation on a timer'
    ],
    bestFor: ['Flat roofs of homes', 'Apartment terraces and penthouses', 'Restaurant and cafe rooftops', 'Office terraces'],
    price: 'Modern rooftop packages range from Rs. 65,000 to 150,000 depending on size and finishes. Waterproofing is quoted separately if needed.',
    faqs: [
      { q: 'Kya rooftop garden se chhat kharab hoti hai?', a: 'Agar waterproofing, drainage aur root barrier sahi lage hon to nahi. Hum planting se pehle flood test karte hain taake koi leak pehle hi pakra jaye.' },
      { q: 'Can I have real grass on the roof?', a: 'Yes, on a properly waterproofed roof with drainage and enough soil depth. Many clients prefer a mix: planters and artificial grass on the main area to keep weight and water use low.' }
    ],
    related: ['vertical-gardens', 'pergolas-gazebos', 'irrigation-sprinkler-systems']
  },
  {
    slug: 'irrigation-sprinkler-systems',
    name: 'Irrigation & Sprinkler Systems',
    short: 'Automatic pop-up sprinklers and drip lines on timers to save water and labour.',
    tag: 'Irrigation',
    image: 'images/projects/turf-maintenance.jpg',
    metaTitle: 'Automatic Sprinkler & Drip Irrigation in Pakistan | Garden Irrigation',
    metaDesc: 'Automatic sprinkler and drip irrigation systems for lawns, farmhouses and rooftops in Pakistan. Timers, zones and water-saving design.',
    intro: [
      'Hand watering is uneven and takes time every day. An automatic system waters each zone the right amount at the right time, usually early morning, even when you are away.',
      'We design zones by plant type: pop-up sprinklers for lawns and drip lines for beds, hedges, trees and planters. Pipes are laid before the grass, so nothing has to be dug up later.'
    ],
    includes: [
      'Water source and pressure check, pump sizing if needed',
      'Zone design: lawn sprinklers, bed and tree drip lines',
      'Underground pipes laid before planting',
      'Pop-up sprinklers and drip emitters',
      'Timer or controller with seasonal settings',
      'Handover training and winter or summer schedule'
    ],
    bestFor: ['Lawns over 5 marla', 'Farmhouses', 'Rooftops and planters', 'Busy families and offices'],
    price: 'Sprinkler system add-on starts from Rs. 35,000 for a standard home lawn. Larger systems are quoted by zone count.',
    faqs: [
      { q: 'Drip behtar hai ya sprinkler?', a: 'Lawn ke liye sprinkler, aur beds, hedges, trees aur gamlon ke liye drip. Zyada tar gardens me dono ka mix best rehta hai. Drip paani kafi bachata hai kyun ke seedha jar tak jata hai.' },
      { q: 'What if water pressure is low?', a: 'We check pressure first. With low pressure, we either add a small booster pump, split the system into more zones, or use more drip, which needs less pressure.' }
    ],
    related: ['lawn-grass-installation', 'garden-maintenance', 'rooftop-terrace-gardens']
  },
  {
    slug: 'landscape-lighting',
    name: 'Landscape & Garden Lighting',
    short: 'Warm path, tree and accent lighting that makes the garden safe and beautiful at night.',
    tag: 'Lighting',
    image: 'images/projects/outdoor-lighting.jpg',
    metaTitle: 'Garden & Landscape Lighting in Pakistan | Outdoor LED Lighting',
    metaDesc: 'Landscape lighting in Pakistan: warm LED path lights, tree uplights, bollards, water feature and facade lighting with weatherproof wiring and timers.',
    intro: [
      'Raat ko garden ki khoobsurti lighting se hi nazar aati hai. Good lighting also makes steps, paths and entrances safe after dark.',
      'We use warm-white, weatherproof LED fittings, hide the source where possible, and put lights on timers or photocells so they switch on and off by themselves.'
    ],
    includes: [
      'Lighting plan: paths, steps, trees, walls and water',
      'Bollards and path lights',
      'Tree uplights and wall washers',
      'Underwater and fountain lights',
      'Weatherproof cabling and junctions',
      'Timers or dusk-to-dawn sensors'
    ],
    bestFor: ['Villa lawns and driveways', 'Farmhouse events', 'Pergolas and seating areas', 'Commercial frontages'],
    price: 'Lighting add-on starts from Rs. 25,000 for a standard home garden. Larger schemes are quoted by fixture count.',
    faqs: [
      { q: 'Kya solar lights kaafi hain?', a: 'Halki decorative lighting ke liye solar theek hai, lekin sardi, smog aur badal me un ki roshni kam ho jati hai. Paths aur steps ke liye wired low-voltage LED zyada reliable hai.' },
      { q: 'Is garden lighting safe in rain?', a: 'Yes, when fittings are rated for outdoor use and cables run through proper conduits and sealed junctions. We install with that standard.' }
    ],
    related: ['water-features-fountains', 'pergolas-gazebos', 'hardscape-paving']
  },
  {
    slug: 'garden-maintenance',
    name: 'Garden Maintenance & Lawn Care',
    short: 'Scheduled mowing, feeding, pruning, pest control and seasonal care by trained gardeners.',
    tag: 'Maintenance',
    image: 'images/projects/ficus-hedge-retaining.jpg',
    metaTitle: 'Garden Maintenance Services in Pakistan | Lawn Care Contracts',
    metaDesc: 'Garden maintenance and lawn care in Pakistan: mowing, edging, fertiliser, pruning, hedge trimming, pest control and seasonal care on monthly contracts.',
    intro: [
      'Garden lagwana aadha kaam hai, usay sambhalna baqi aadha. Regular care keeps the lawn dense, the hedges sharp and the plants healthy through the summer heat, monsoon and winter smog.',
      'Our maintenance plans follow a seasonal calendar: what to feed, when to scarify, how to adjust watering, and what to prune, so problems are caught early.'
    ],
    includes: [
      'Mowing, edging and clean-up',
      'Seasonal fertiliser and soil feeding',
      'Hedge trimming and shrub pruning',
      'Pest and fungus control',
      'Scarifying, aeration and top-dressing in season',
      'Irrigation checks and timer adjustment'
    ],
    bestFor: ['Homes with new lawns', 'Farmhouses with part-time staff', 'Offices and societies', 'Restaurants and hotels'],
    price: 'Monthly plans depend on garden size and visit frequency. Shared after a site visit.',
    faqs: [
      { q: 'Grass kitni dafa kaatni chahiye?', a: 'Garmi aur barsaat me jab grass tez barhti hai to aam tor par hafte me ek baar. Sardi me jab growth slow ho jati hai to kam. Ek waqt me patti ka ek tihai se zyada nahi kaatna chahiye.' },
      { q: 'Do you take over gardens built by others?', a: 'Yes. We start with an assessment visit, fix urgent issues, and then move to a regular plan.' }
    ],
    related: ['lawn-grass-installation', 'irrigation-sprinkler-systems', 'commercial-society-landscaping']
  },
  {
    slug: 'commercial-society-landscaping',
    name: 'Commercial & Housing Society Landscaping',
    short: 'Parks, boulevards, offices, hotels, schools and plazas designed and maintained at scale.',
    tag: 'Commercial',
    image: 'images/projects/commercial-park.jpg',
    metaTitle: 'Commercial & Housing Society Landscaping in Pakistan',
    metaDesc: 'Landscaping for housing societies, parks, boulevards, offices, hotels, schools and plazas in Pakistan: design, plantation, irrigation and maintenance contracts.',
    intro: [
      'Commercial and society projects need durable designs, clear drawings and a team that can deliver to a schedule. Hum parks, green belts, boulevards, office campuses, hotels, schools aur plazas par kaam karte hain.',
      'We focus on hardy plant choices, efficient irrigation, safe hardscape and a maintenance plan that keeps the site looking good long after handover.'
    ],
    includes: [
      'Design drawings and bill of quantities for approvals',
      'Parks, green belts, roundabouts and boulevards',
      'Office, hotel, school and hospital grounds',
      'Bulk plantation of trees, hedges and ground covers',
      'Central irrigation design',
      'Annual maintenance contracts'
    ],
    bestFor: ['Housing societies and developers', 'Corporate offices and factories', 'Hotels, restaurants and malls', 'Schools, universities and hospitals'],
    price: 'Quoted per project with a detailed bill of quantities.',
    faqs: [
      { q: 'Kya aap tender ya BOQ ke mutabiq kaam karte hain?', a: 'Ji haan. Hum drawings ya BOQ ke mutabiq quote dete hain, aur zaroorat ho to apni design aur BOQ bhi bana kar dete hain.' },
      { q: 'Do you offer annual maintenance contracts?', a: 'Yes. Commercial sites can take an annual contract with a fixed visit schedule, reporting and replacement of failed plants.' }
    ],
    related: ['garden-maintenance', 'irrigation-sprinkler-systems', 'landscape-design']
  }
];

// Service × city pages (top cities, core services)
export const CITY_SERVICE_CITIES = ['lahore', 'islamabad', 'karachi', 'rawalpindi', 'faisalabad', 'multan', 'peshawar', 'sialkot', 'gujranwala'];
export const CITY_SERVICE_SLUGS = ['lawn-grass-installation', 'villa-farmhouse-landscaping', 'rooftop-terrace-gardens', 'vertical-gardens', 'irrigation-sprinkler-systems', 'garden-maintenance'];

// Local angle per city, used to make service×city pages specific
export const CITY_ANGLES = {
  lahore: {
    challenge: 'Lahore has very hot summers, a humid monsoon and heavy winter smog. Most of the city sits on fertile alluvial soil, but new plots in housing schemes are often filled with construction debris.',
    water: 'Tube-well and WASA water is usually fine for lawns, but summer evaporation is high, so early-morning watering and drip lines in beds make a real difference.',
    tips: ['Lay new grass in spring (Feb to Apr) or late summer (Aug to Oct)', 'Wash dust and smog off leaves in winter so plants can breathe', 'Plan shade for west-facing lawns and seating'],
    areas: 'DHA, Gulberg, Model Town, Bahria Town, Lake City, Johar Town, Wapda Town, Cantt and the Bedian Road farmhouse belt'
  },
  islamabad: {
    challenge: 'Islamabad has a milder climate with real winters, frequent rain and some frost in colder months. Soil in many sectors is rocky or clay-heavy, and plots on slopes need careful leveling and drainage.',
    water: 'Rainfall is higher than in the plains, so drainage matters as much as irrigation. Boring water quality varies by sector and should be checked before installing drip lines.',
    tips: ['Choose grasses and plants that handle winter cold and frost', 'Build proper drainage on sloped and rocky plots', 'Use the spring season for most new planting'],
    areas: 'F, E and G sectors, DHA and Bahria Town Islamabad, Gulberg Greens, B-17, Park Road and farmhouses around Chak Shahzad'
  },
  karachi: {
    challenge: 'Karachi is humid and warm almost all year, with salty sea breeze and often sandy or saline soil. Water is scarce and expensive in many areas, so every design must be water-wise.',
    water: 'Tanker and borehole water can be brackish. We favour salt-tolerant grasses such as Paspalum and Bermuda, drip irrigation, mulching and plants that cope with salt.',
    tips: ['Improve sandy soil with sweet soil and organic matter', 'Use salt-tolerant plants near the coast', 'Reduce lawn size and use gravel or paving to save water'],
    areas: 'DHA, Clifton, Bahria Town Karachi, Gulshan-e-Iqbal, PECHS, KDA Scheme 1 and farmhouses along the Super Highway'
  },
  rawalpindi: {
    challenge: 'Rawalpindi shares Islamabad\'s seasons with hot summers, cold winters and strong monsoon rain. Many plots are uneven, and soil can be hard or stony.',
    water: 'Water supply can be unreliable in some areas, so storage, timers and drip lines help keep a garden alive through dry spells.',
    tips: ['Level uneven plots and add proper drainage before planting', 'Use drip irrigation to cope with irregular water supply', 'Pick hardy plants that handle both summer heat and winter cold'],
    areas: 'Bahria Town, DHA Phase 1 and 2, Chaklala Scheme III, Westridge, Satellite Town, Askari and the Gulraiz area'
  },
  faisalabad: {
    challenge: 'Faisalabad has very hot, dry summers, cool winters and a short monsoon. Soil is mostly fertile canal-irrigated loam, but new housing schemes often have compacted fill and construction waste.',
    water: 'Groundwater in parts of the district can be brackish, so we check water before choosing grass and drip lines. Early-morning watering and mulched beds cut summer losses.',
    tips: ['Test boring water before planting salt-sensitive plants', 'Lay new lawns in spring or late summer', 'Use shade trees on west-facing lawns to beat the heat'],
    areas: 'Canal Road, Peoples Colony, Madina Town, Susan Road, D Ground, Wapda City and Citi Housing'
  },
  multan: {
    challenge: 'Multan is one of the hottest cities in Pakistan, with long, very hot summers, dust storms and little rain. Plants must be heat-hardy, and lawns need careful watering and some shade.',
    water: 'Evaporation is extreme in summer, so drip lines, mulch, timers and smaller lawn areas make a big difference. Water quality varies and should be checked before installation.',
    tips: ['Choose Bermuda or Paspalum for full-sun lawns', 'Plant windbreak hedges against dust storms', 'Water before sunrise, never at midday'],
    areas: 'DHA Multan, Bosan Road, Gulgasht Colony, Cantt, Wapda Town, Royal Orchard and Buch Villas'
  },
  peshawar: {
    challenge: 'Peshawar has hot summers, cold winters with occasional frost and moderate rain. Soil ranges from fertile valley loam to hard, gravelly ground on newer schemes.',
    water: 'Tube-well water is common; pressure and supply can vary, so storage tanks with timers and drip lines keep gardens reliable.',
    tips: ['Pick plants that handle both summer heat and winter frost', 'Improve gravelly soil with sweet soil and compost', 'Plant trees in spring or monsoon'],
    areas: 'Hayatabad, University Town, DHA Peshawar, Regi Model Town, Cantt and Warsak Road'
  },
  sialkot: {
    challenge: 'Sialkot is greener and wetter than most of Punjab, with hot humid summers, a strong monsoon and cool winters. Drainage and fungus control matter as much as watering.',
    water: 'Rainfall is relatively high, so lawns need a drainage slope and beds must not stay waterlogged. Irrigation can be lighter outside the dry months.',
    tips: ['Build a drainage slope before laying grass', 'Watch for fungus in humid monsoon weeks', 'Use the rains for tree planting'],
    areas: 'Cantt, Defence Road, Model Town, Paris Road, Citi Housing Sialkot and Sambrial Road'
  },
  gujranwala: {
    challenge: 'Gujranwala shares Lahore\'s plains climate: very hot summers, a humid monsoon and winter smog. New schemes often have filled plots with debris under the topsoil.',
    water: 'Groundwater is generally usable for gardens, but summer evaporation is high, so early watering and drip lines in beds help.',
    tips: ['Replace debris-filled topsoil before laying grass', 'Wash smog dust off leaves in winter', 'Plant hedges early for privacy'],
    areas: 'DHA Gujranwala, Citi Housing, Model Town, Satellite Town, Peoples Colony and Wapda Town'
  }
};
