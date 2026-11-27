# 🌿 The Living Garden — Landscaping Company Website + CRM

Plant nursery e-commerce aur landscaping business ka web app: customer storefront, landscaping lead capture, real order tracking, aur password-protected admin panel.

## Features

**Website (`/`)**
- Landscaping company site: services, sectors, projects portfolio, 5-step process, lawn cost estimator, maintenance plans, cities served, FAQ, reviews
- "Book a free site visit" form (project type, location, size, budget, timeline, visit date) saved as a lead
- Portfolio comes from the admin **Projects** section; until projects are added, generic service examples are shown
- Company name, phone, WhatsApp, address, hours, stats and social links come from admin **Settings**
- 9 city SEO landing pages, sitemap, schema.org (business + FAQ), PWA manifest

**Admin (`/admin`)**
- Password login (HttpOnly signed cookie, 12h session, brute-force throttling)
- **Leads CRM:** New → Contacted → Site Visit → Proposal → Won → In Progress → Completed / Lost, quote value, notes, WhatsApp/Call, search, CSV export
- **Projects:** add/edit/hide portfolio projects with photos, location, year, area and scope
- **Reviews:** approve / hide / delete
- **Settings:** business details and homepage stats

## Brand

Logo: **Sprout Circle** (a leaf growing out of a garden circle). Files in `public/brand/`:

| File | Use |
|---|---|
| `logo-mark.svg` / `logo-mark.png` | Mark on light backgrounds |
| `logo-mark-light.svg` | Mark on dark (forest green) backgrounds |
| `logo-horizontal.svg` / `.png` | Mark + wordmark (letterheads, social, print) |
| `app-icon.svg` | Favicon / app icon source (`public/icons/*.png` are rendered from it) |
| `og-image.png` | 1200×630 link preview image |

Colors: forest `#133E2B`, terracotta `#C86D51`, cream `#FCFAF6`. Fonts: Playfair Display (wordmark), Plus Jakarta Sans.

## Project structure

```
public/            Frontend (served as static files)
  index.html       Company website        app.js   website logic
  admin.html       Staff portal           admin.js portal logic
  site.css         Custom components
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
