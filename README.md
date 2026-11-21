# 🌿 Lahore Botanica & Landscaping Platform

A high-speed, luxury botanical e-commerce and landscape architecture platform designed specifically for the Lahore, Pakistan market (DHA, Gulberg, Bahria Town, Model Town, Bedian Road Farmhouses, and all city sectors).

---

## 🌟 Key Features

### 1. Customer Storefront (Ultra-Fast & Mobile-First)
* **Shopify-Style Multi-Angle Showcase:** Clicking any plant opens an interactive inspection modal with:
  * Multi-angle high-resolution photographs (Front view, leaf texture close-up, living room perspective, pot view).
  * Dynamic size selector (e.g. 2-3 ft, 4-5 ft specimen) with live price updates.
  * Planter/Pot selector (Grower pot, Handcrafted Terracotta, Ceramic Planters).
  * Care badges tailored to Lahore climate (Sunlight, Water frequency, Pet-safety, 40°C+ heat tolerance).
  * One-Click **"Order Direct on WhatsApp"** button with pre-filled plant specifications.
* **Instant Live Search & Filters:**
  * Real-time search across common, botanical, and Urdu names (e.g. Ficus, Motia, Monstera, Date Palm).
  * Categorization: Indoor air-purifying, Fragrant flowering, Landscape trees & palms, Fruit plants & herbs.
  * Filters for Sunlight (Full Sun, Partial Shade, Indoor), Water need, Pet-friendly, and Price sorting.
* **Interactive Before / After Landscaping Slider:**
  * Interactive drag slider demonstrating barren plots transforming into lush landscaped estates.
  * 3-Step site inspection and free consultation booking form for villas and farmhouses.
* **Slide-Over Cart & Checkout:**
  * Cash on Delivery (COD), Direct Bank Transfer, JazzCash / EasyPaisa, or Direct WhatsApp Checkout.
  * Free Lahore delivery for orders above Rs. 3,500.

---

### 2. Custom Admin CMS (`/ #admin`)
* **Live Overview Metrics:** Total Revenue, Active Plants, Orders Count, Pending Landscaping Leads.
* **Plants Management:** Add, edit, or delete plants, update prices, stock, multi-angle images, and care badges.
* **Orders Tracking:** View customer details, Lahore area (DHA, Gulberg, etc.), items, total, and update dispatch status.
* **Landscaping Leads CRM:** Review consultation requests with direct WhatsApp chat links to reach clients instantly.

---

## 🚀 How to Run the Application

### Option A: One-Click Launch (Windows)
Double-click `start.bat` located inside this directory:
```
C:\Users\HP\.gemini\antigravity\scratch\lahore-botanica\start.bat
```

### Option B: Via Terminal / Command Line
```bash
node server.js
```
The server will start on:
* **Customer Store:** [http://localhost:3000](http://localhost:3000)
* **Admin CMS Dashboard:** [http://localhost:3000#admin](http://localhost:3000#admin)

---

## 🛠️ Architecture & Tech Stack
* **Runtime:** Zero-dependency Native Node.js HTTP Server.
* **Database:** Native SQLite (`node:sqlite`) storing plants, orders, landscaping inquiries, and configuration in `lahore_botanica.db`.
* **Frontend:** High-performance responsive UI styled with Tailwind CSS, Google Fonts (Playfair Display & Plus Jakarta Sans), and custom botanical styles.
