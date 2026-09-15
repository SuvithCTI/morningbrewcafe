# ☕ Morning Brew Cafe - 3D Animated Modern Cafe Platform

A modern fullstack café web application crafted with **React, Three.js 3D animations, Tailwind CSS, Node.js, Express, and MongoDB**.

---

## ✨ Features & Highlights

### 🎨 1. Rich 3D Graphics & Visual Aesthetic
- **Interactive 3D Coffee Cup**: Three.js WebGL canvas rendering with ceramic gloss, crema latte art texture, rising particle steam, and interactive mouse parallax response.
- **Dynamic 3D Liquid Customizer**: Real-time coffee mixer that adjusts liquid levels, micro-crema foam density, plant-based milks, and syrup drizzles.
- **3D Floating Coffee Beans**: Real-time tumbling coffee beans and glowing golden bokeh particles.
- **Vibrant Ambiance**: Colorful animated glowing mesh background with glassmorphism and warm espresso-amber gradients.

### 🍽️ 2. Comprehensive Customer Experience
- **Home**: Dynamic 3D Hero, 3D Brew customizer, Chef specials, artisanal timeline, customer reviews slider.
- **About**: "Bean-to-Cup" 4-stage interactive journey, master barista showcases, sustainability pledge, and cafe gallery.
- **Menu**: Categorized items (Signature Coffee, Cold Brew, Artisanal Teas, Fresh Bakery, Gourmet Breakfast, Savory Bites), search bar, dietary filters (Vegan, Gluten-Free, Organic), calorie & caffeine indicators, and 3D tilt cards.
- **Customization Modal**: Modify cup size, milk type, sweetness, extra espresso shots, and flavor syrups.
- **Slide-over Cart & Checkout**: Promo codes (`BREW20` for 20% off, `FIRSTSIP` for $3 off), tip selector, dining modes (Dine-in, Takeaway, Express Delivery), and multi-method simulated payment gateway (3D flip credit card, UPI QR scanner, Apple/GPay, Cash on Counter).
- **Interactive 3D Table Reservation**: Visual cafe floor plan with live availability, date/time pickers, party size, and instant confirmation ticket with QR code.
- **Live 4-Stage Order Tracker**: Real-time progress bar (Placed ➔ Brewing ➔ Quality Check ➔ Ready / Out for Delivery), live barista status, and printable digital receipt invoice.
- **Contact & Reviews**: Interactive 5-star rating submission with experience tags and like counters, cafe location details, and FAQ accordion.
- **User Profile & Loyalty Program**: Gold Barista tier with points tracker, unlockable rewards, past orders, and saved reservations.

### 🛡️ 3. Admin Operations Panel
- **Analytics Overview**: Revenue metrics, daily orders, table occupancy rate, and peak hourly sales breakdown.
- **Live Kitchen Queue**: Real-time order management with 1-click status advances (`Brewing`, `Ready`, `Delivered`).
- **Menu CRUD Manager**: Add, edit, and delete cafe items with images, pricing, and dietary tags.
- **Table Booking Manager**: Inspect and manage customer reservations.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Both Backend & Frontend Concurrently
```bash
npm run dev
```

- **Frontend Application**: `http://localhost:5173`
- **Backend API Server**: `http://localhost:5001`

### 3. Production Build
```bash
npm run build
npm start
```

---

## 🔑 Demo Accounts (1-Click Login Available in UI)

| Role | Email | Password | Access |
|---|---|---|---|
| **Customer** | `customer@morningbrew.com` | `user` | Orders, Cart, Table Booking, Loyalty Points |
| **Admin Manager** | `admin@morningbrew.com` | `admin` | Full Admin Dashboard, Live Kitchen Queue, Menu CRUD |
