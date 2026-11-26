// Seed catalog for first-time database setup
module.exports = [
    {
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
      images_json: JSON.stringify([
        'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1597055181300-e3633a207518?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1000&auto=format&fit=crop'
      ]),
      variants_json: JSON.stringify({
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
      }),
      featured: 1
    },
    {
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
      images_json: JSON.stringify([
        'https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1000&auto=format&fit=crop'
      ]),
      variants_json: JSON.stringify({
        sizes: [
          { name: 'Standard Bush (1.5 ft)', price_delta: 0 },
          { name: 'Mature Bush with Flower Buds', price_delta: 450 }
        ],
        pots: [
          { name: 'Nursery Bag / Pot', price_delta: 0 },
          { name: 'Desi Red Clay Gamla (12-inch)', price_delta: 350 }
        ]
      }),
      featured: 1
    },
    {
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
      images_json: JSON.stringify([
        'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?q=80&w=1000&auto=format&fit=crop'
      ]),
      variants_json: JSON.stringify({
        sizes: [
          { name: 'Medium (4-5 leaves)', price_delta: 0 },
          { name: 'Large with Moss Stick (3-4 ft)', price_delta: 1950 }
        ],
        pots: [
          { name: 'Grower Pot', price_delta: 0 },
          { name: 'Ribbed Terracotta Pot', price_delta: 850 },
          { name: 'Matte Black Designer Planter', price_delta: 1600 }
        ]
      }),
      featured: 1
    },
    {
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
      images_json: JSON.stringify([
        'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1000&auto=format&fit=crop'
      ]),
      variants_json: JSON.stringify({
        sizes: [
          { name: 'Medium Trellis Creeper (3 ft)', price_delta: 0 },
          { name: 'Established Tall Creeper (6 ft)', price_delta: 900 }
        ],
        pots: [
          { name: 'Nursery Container', price_delta: 0 },
          { name: 'Large Clay Planter', price_delta: 600 }
        ]
      }),
      featured: 1
    },
    {
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
      images_json: JSON.stringify([
        'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1000&auto=format&fit=crop'
      ]),
      variants_json: JSON.stringify({
        sizes: [
          { name: 'Medium Trunk (6-8 ft Trunk)', price_delta: 0 },
          { name: 'Mature Architectural Trunk (10-12 ft)', price_delta: 14000 }
        ],
        pots: [
          { name: 'Field Balled & Burlapped (Ready for Soil Planting)', price_delta: 0 },
          { name: 'Giant Concrete Landscape Planter', price_delta: 4500 }
        ]
      }),
      featured: 1
    },
    {
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
      images_json: JSON.stringify([
        'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1572688484438-313a6e50c333?q=80&w=1000&auto=format&fit=crop'
      ]),
      variants_json: JSON.stringify({
        sizes: [
          { name: 'Standard 3-Stem (1.5 ft)', price_delta: 0 },
          { name: 'Lush Multi-Stem Clump (2.5 ft)', price_delta: 850 }
        ],
        pots: [
          { name: 'Basic Nursery Pot', price_delta: 0 },
          { name: 'Modern Fluted Ceramic Pot', price_delta: 950 }
        ]
      }),
      featured: 0
    },
    {
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
      images_json: JSON.stringify([
        'https://images.unsplash.com/photo-1617173944883-6ffbd35d584d?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1000&auto=format&fit=crop'
      ]),
      variants_json: JSON.stringify({
        sizes: [
          { name: 'Dense Bush (3 ft)', price_delta: 0 },
          { name: 'Tall Decorative Floor Specimen (5 ft)', price_delta: 1600 }
        ],
        pots: [
          { name: 'Grower Pot', price_delta: 0 },
          { name: 'Earthy Clay Pot with Tray', price_delta: 750 }
        ]
      }),
      featured: 0
    },
    {
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
      images_json: JSON.stringify([
        'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=1000&auto=format&fit=crop'
      ]),
      variants_json: JSON.stringify({
        sizes: [
          { name: 'Grafted Bush with initial fruits (2 ft)', price_delta: 0 },
          { name: 'Mature Heavy Bearer (4 ft)', price_delta: 850 }
        ],
        pots: [
          { name: 'Grower Polybag', price_delta: 0 },
          { name: '14-Inch Terracotta Fruit Tub', price_delta: 650 }
        ]
      }),
      featured: 0
    },
    {
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
      images_json: JSON.stringify([
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1496062031456-07b8f162a322?q=80&w=1000&auto=format&fit=crop'
      ]),
      variants_json: JSON.stringify({
        sizes: [
          { name: 'Bloomed Stem Plant', price_delta: 0 },
          { name: 'Twin Cluster Specimen', price_delta: 400 }
        ],
        pots: [
          { name: 'Nursery Bag', price_delta: 0 },
          { name: 'Traditional Clay Gamla', price_delta: 300 }
        ]
      }),
      featured: 0
    },
    {
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
      images_json: JSON.stringify([
        'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1598880940371-c756e015fea1?q=80&w=1000&auto=format&fit=crop'
      ]),
      variants_json: JSON.stringify({
        sizes: [
          { name: 'Bushy Tabletop (1.5 ft)', price_delta: 0 },
          { name: 'Floor Accent Large (2.5 ft)', price_delta: 1200 }
        ],
        pots: [
          { name: 'Nursery Pot', price_delta: 0 },
          { name: 'Minimalist White Ceramic Planter', price_delta: 950 }
        ]
      }),
      featured: 0
    }
];
