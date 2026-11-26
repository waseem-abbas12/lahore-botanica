# 🌿 Lahore Botanica — Plants Store + Landscaping CRM

Plant nursery e-commerce aur landscaping business ka web app: customer storefront, landscaping lead capture, real order tracking, aur password-protected admin panel.

## Features

**Customer side**
- Plant catalog: search, filters, multi-angle photos, size/pot variants
- Cart & checkout (COD, bank transfer, JazzCash, EasyPaisa). **Prices are recalculated on the server.** Stock decreases automatically.
- Order confirmation with an order number, plus a WhatsApp confirmation button
- **Real order tracking** by order number and/or phone, with a status timeline
- Landscaping consultation form, cost calculator, institutional free-plant requests: everything is saved in the database
- Customer reviews (show only after admin approval)
- 9 city SEO landing pages, sitemap, schema.org markup, PWA manifest + icons

**Admin panel (`/#admin`)**
- Password login (HttpOnly signed cookie, 12h session, brute-force throttling)
- **Leads CRM:** status pipeline (New → Contacted → Site Visit → Proposal → Won → In Progress → Completed / Lost), estimate, follow-up notes, WhatsApp/Call buttons, search, filter, CSV export
- **Orders:** status updates with history (shown to the customer on the tracking page), rider note, auto stock-return on cancel, CSV export
- **Plants:** add/edit/hide/delete, price, stock, images, size & pot variants
- **Reviews:** approve / hide / delete
- **Settings:** business name, WhatsApp number, phone, address, delivery fee, free-delivery limit (applied site-wide)

## Project structure

```
public/            Frontend (served as static files)
  index.html       Store + landscaping + admin (single page)
  app.js admin.js  Frontend logic
  tailwind.css     Pre-built Tailwind (main page)   ← npm run build:css
  city.css         Pre-built Tailwind (city pages)
  images/projects  Portfolio photos
api/handler.js     Vercel serverless entry → lib/api.js
lib/api.js         REST API (all routes)
lib/db.js          Postgres (DATABASE_URL) or embedded PGlite for local dev
lib/auth.js        Admin session
server.js          Local / VPS server (static + API)
tailwind/          Tailwind configs
```

## Run locally

```bash
npm install
npm start            # http://localhost:3000   admin: http://localhost:3000/#admin
```
Without `DATABASE_URL`, data is saved in `.data/pglite` (embedded Postgres, no setup needed).
Without `ADMIN_PASSWORD`, the local admin password is `admin123`.

## Deploy on Vercel (production)

1. Create a free Postgres database: **Neon** (neon.tech), **Supabase**, or Vercel → Storage → Postgres.
2. Vercel → Project → Settings → **Environment Variables**:
   | Name | Value |
   |---|---|
   | `DATABASE_URL` | Postgres connection string (`postgres://...`) |
   | `ADMIN_PASSWORD` | A strong password for the admin panel |
   | `SESSION_SECRET` | Any long random string (optional, recommended) |
3. Redeploy. Tables and the starter catalog are created automatically on the first request.
4. Open `/#admin` → **Settings** and enter your real WhatsApp number and business details.

> ⚠️ Without `DATABASE_URL` on Vercel, data is stored in temporary memory and **will be lost**. The admin panel shows a red warning when this happens.
> Without `ADMIN_PASSWORD` on Vercel, admin login stays disabled.

## API (summary)

| Public | Admin (login required) |
|---|---|
| `GET /api/plants`, `GET /api/plants/:id` | `POST/PUT/DELETE /api/plants` |
| `POST /api/orders`, `GET /api/orders/track` | `GET /api/orders`, `PUT /api/orders/:id` |
| `POST /api/leads` | `GET /api/leads`, `PUT/DELETE /api/leads/:id` |
| `GET/POST /api/reviews` | `PUT/DELETE /api/reviews/:id` |
| `GET /api/settings`, `GET /api/health` | `PUT /api/settings`, `GET /api/stats`, `GET /api/export/{orders,leads}.csv` |

## After changing HTML/JS classes

```bash
npm run build:css
```
