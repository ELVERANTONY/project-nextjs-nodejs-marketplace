# Marketplace Pro

A professional full-stack marketplace application built with Node.js, Express, Sequelize, MySQL, Next.js 15, TypeScript, and Tailwind CSS.

## Architecture

```
marketplace-pro/
├── backend-marketplace/         # Express API Server
│   ├── src/
│   │   ├── config/             # Database configuration
│   │   ├── controllers/        # Route handlers
│   │   ├── middleware/         # Auth & authorization middleware
│   │   ├── models/             # Sequelize models
│   │   ├── routes/             # Express routes
│   │   ├── seeders/            # Database seed script
│   │   ├── app.js              # Express app setup
│   │   └── server.js           # Entry point
│   ├── .env                    # Environment variables
│   └── package.json
│
└── frontend-marketplace/        # Next.js 15 Application
    ├── src/
    │   ├── app/                # App Router pages
    │   ├── components/         # React components
    │   ├── context/            # Auth context
    │   ├── lib/                # Utilities & API client
    │   └── types/              # TypeScript types
    ├── .env.local              # Environment variables
    └── package.json
```

## Tech Stack

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express 5
- **ORM:** Sequelize 6
- **Database:** MySQL
- **Auth:** JWT + bcryptjs
- **CORS:** Enabled with frontend domain

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel-ready

## Features

- JWT Authentication with role-based access control
- Admin and Customer roles
- Product CRUD with category filtering
- Category management
- Real-time search
- Responsive design
- Dark mode support
- Admin dashboard
- SEO optimized

## Getting Started

### Prerequisites
- Node.js 18+
- MySQL database

### Backend Setup

```bash
cd backend-marketplace
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run seed    # Seed database with test data
npm run dev     # Start development server
```

### Frontend Setup

```bash
cd frontend-marketplace
npm install
cp .env.example .env.local
# Edit .env.local if needed
npm run dev     # Start development server
```

## Test Credentials

| Role     | Email                     | Password      |
|----------|---------------------------|---------------|
| ADMIN    | admin@marketplace.com     | Admin123!     |
| CUSTOMER | customer@marketplace.com  | Customer123!  |

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get user profile (auth required)

### Products
- `GET /api/products` - List products (optional: `?categoryId=1`)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (ADMIN only)
- `PUT /api/products/:id` - Update product (ADMIN only)
- `DELETE /api/products/:id` - Delete product (ADMIN only)

### Categories
- `GET /api/categories` - List categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category (ADMIN only)
- `PUT /api/categories/:id` - Update category (ADMIN only)
- `DELETE /api/categories/:id` - Delete category (ADMIN only)

## Deployment

### Backend (Render)
1. Push to GitHub
2. Create a new Web Service on Render
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables from `.env.example`

### Frontend (Vercel)
1. Push to GitHub
2. Import project in Vercel
3. Set environment variable: `NEXT_PUBLIC_API_URL` = your Render URL

### CORS Configuration
Update `FRONTEND_URL` in backend `.env` with your Vercel deployment URL.
# project-nextjs-nodejs-marketplace
