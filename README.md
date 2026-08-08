# Sareleb Web Application

A full-stack web application built for Sareleb, an industrial equipment supplier (since 1994).
This project features a modern dark blue/gold theme, built entirely with Next.js (App Router), Node.js (Express), and SQLite.

## Technologies Used

- **Frontend:** Next.js 14+ (App Router), Tailwind CSS, React Context
- **Backend:** Node.js, Express.js, Joi validation
- **Database:** SQLite (using `better-sqlite3`)
- **Security:** Helmet.js, CORS, bcrypt, JWT for auth (admin)

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Setup Instructions

### 1. Database & Backend Setup

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (already created by setup) or verify it has:
   ```env
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=supersecret_sareleb_key_2026
   ```
4. Seed the database with initial categories, products, testimonials, and the admin user:
   ```bash
   node database/seed.js
   ```
   *(This creates `sareleb.db` inside `backend/database/`)*
5. Start the backend server:
   ```bash
   npm run dev
   ```
   *(Running on http://localhost:5000)*

### 2. Frontend Setup (Next.js)

1. Open a new terminal window and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   *(Running on http://localhost:3000)*

## API Endpoints

### Categories
- `GET /api/categories` - Fetch all categories
- `GET /api/categories/:slug` - Fetch specific category by ID or slug
- `GET /api/categories/:slug/products` - Fetch products belonging to a category

### Products
- `GET /api/products` - Fetch products. Query params: `category` (slug or ID), `search` (name, reference), `limit`, `offset`
- `GET /api/products/featured` - Fetches 6 featured products
- `GET /api/products/slug/:slug` - Fetch single product by reference
- `GET /api/products/:id` - Fetch single product by ID

### Search
- `GET /api/search?q=query` - Global search across categories and products

### Contact & Testimonials
- `POST /api/contact` - Submit a contact message (name, email, subject, message)
- `GET /api/testimonials` - Fetch all testimonials

### Auth 
- `POST /api/auth/login` - Authenticate admin (`admin@sareleb.com` / `admin123`)

## Features Implemented
- ✅ Beautiful Mobile-First Next.js frontend with Tailwind CSS
- ✅ Responsive Header, Hamburger Menu, Footer
- ✅ Dynamic Global Search Bar with API autocomplete
- ✅ Filterable Product Catalogue
- ✅ Dynamic Product Details Page
- ✅ "Add to Quote" functionality with Toast Notifications
- ✅ Contact form with frontend simulation + Backend validation
- ✅ SQLite relational database with seeded categories and products schema
- ✅ Full REST API architecture

## Deployment Guide

### Vercel (Frontend)
1. Push `frontend` to a GitHub repository.
2. Import the project in Vercel.
3. Set the Environment Variable `NEXT_PUBLIC_API_URL` to your production API URL.
4. Deploy!

### VPS / Docker (Backend)
1. Install Node.js and PM2 on your Linux VPS.
2. Clone the `backend` folder.
3. Run `npm install` and ensure SQLite compiles correctly (`build-essential` needed on Linux).
4. Run `pm2 start src/app.js --name sareleb-api`
5. Map your Nginx reverse proxy to port 5000.
