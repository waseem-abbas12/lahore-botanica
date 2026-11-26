// lib/db.js - Postgres data layer.
// Production: set DATABASE_URL (Neon / Supabase / Vercel Postgres).
// Local dev without DATABASE_URL: embedded Postgres (PGlite) stored in ./.data/pglite
const path = require('node:path');
const seedPlants = require('./seed-plants.js');

let clientPromise = null;

async function createClient() {
  if (process.env.DATABASE_URL) {
    const { Pool } = require('pg');
    const url = process.env.DATABASE_URL;
    const needsSsl = !/localhost|127\.0\.0\.1/.test(url) && !/sslmode=disable/.test(url);
    const pool = new Pool({
      connectionString: url,
      ssl: needsSsl ? { rejectUnauthorized: false } : false,
      max: 3
    });
    return {
      kind: 'postgres',
      query: async (sql, params = []) => (await pool.query(sql, params)).rows,
      exec: async (sql) => { await pool.query(sql); }
    };
  }

  const { PGlite } = require('@electric-sql/pglite');
  // On serverless hosts without DATABASE_URL only /tmp is writable (data is NOT durable there).
  const isServerless = !!(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
  const dataDir = process.env.PGLITE_DIR ||
    (isServerless ? '/tmp/pglite' : path.join(__dirname, '..', '.data', 'pglite'));
  if (isServerless) {
    console.warn('[db] DATABASE_URL is not set: using temporary storage. Orders and leads WILL be lost. Set DATABASE_URL in Vercel.');
  }
  require('node:fs').mkdirSync(dataDir, { recursive: true });
  const pg = new PGlite(dataDir);
  await pg.waitReady;
  return {
    kind: 'pglite',
    query: async (sql, params = []) => (await pg.query(sql, params)).rows,
    exec: async (sql) => { await pg.exec(sql); }
  };
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS plants (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  botanical_name TEXT DEFAULT '',
  urdu_name TEXT DEFAULT '',
  category TEXT NOT NULL DEFAULT 'indoor',
  price INTEGER NOT NULL,
  stock INTEGER NOT NULL DEFAULT 20,
  description TEXT DEFAULT '',
  sunlight TEXT DEFAULT 'full_sun',
  water TEXT DEFAULT 'moderate',
  difficulty TEXT DEFAULT 'Easy',
  pet_friendly INTEGER DEFAULT 0,
  lahore_hardy INTEGER DEFAULT 1,
  images_json TEXT NOT NULL DEFAULT '[]',
  variants_json TEXT DEFAULT '{}',
  featured INTEGER DEFAULT 0,
  active INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  city_area TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  items_json TEXT NOT NULL,
  subtotal INTEGER NOT NULL,
  delivery_fee INTEGER NOT NULL,
  total INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending',
  history_json TEXT NOT NULL DEFAULT '[]',
  notes TEXT DEFAULT '',
  admin_notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  source TEXT NOT NULL DEFAULT 'consultation',
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  project_type TEXT DEFAULT '',
  area_size TEXT DEFAULT '',
  location TEXT DEFAULT '',
  message TEXT DEFAULT '',
  preferred_date TEXT DEFAULT '',
  estimate INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'New Lead',
  admin_notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  area TEXT DEFAULT '',
  rating INTEGER NOT NULL,
  comment TEXT NOT NULL,
  approved INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
);

CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders (customer_phone);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
`;

const DEFAULT_SETTINGS = {
  store_name: 'Lahore Botanica & Landscaping',
  phone: '+92 300 8456789',
  whatsapp: '923008456789',
  email: '',
  address: 'Main Boulevard, Gulberg III / Nursery Farm, Bedian Road, Lahore',
  delivery_fee: '250',
  free_delivery_min: '3500'
};

async function init(client) {
  await client.exec(SCHEMA);

  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
    await client.query(
      'INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO NOTHING',
      [key, value]
    );
  }

  const [{ count }] = await client.query('SELECT COUNT(*)::int AS count FROM plants');
  if (count === 0) {
    for (const p of seedPlants) {
      await client.query(
        `INSERT INTO plants (name, botanical_name, urdu_name, category, price, stock, description,
          sunlight, water, difficulty, pet_friendly, lahore_hardy, images_json, variants_json, featured)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`,
        [p.name, p.botanical_name, p.urdu_name, p.category, p.price, p.stock, p.description,
          p.sunlight, p.water, p.difficulty, p.pet_friendly, p.lahore_hardy,
          p.images_json, p.variants_json, p.featured]
      );
    }
  }
}

async function getDb() {
  if (!clientPromise) {
    clientPromise = (async () => {
      const client = await createClient();
      await init(client);
      return client;
    })().catch(err => {
      clientPromise = null;
      throw err;
    });
  }
  return clientPromise;
}

async function query(sql, params) {
  const db = await getDb();
  return db.query(sql, params);
}

async function one(sql, params) {
  const rows = await query(sql, params);
  return rows[0] || null;
}

module.exports = { getDb, query, one, DEFAULT_SETTINGS };
