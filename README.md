# Marketplace Pro

Aplicación full-stack de marketplace con Node.js, Express, Sequelize, MySQL (Railway), Next.js 15, TypeScript y Tailwind CSS.

## Despliegue

| Plataforma | URL |
|------------|-----|
| **Frontend (Vercel)** | https://marketplace-pro-frontend.vercel.app |
| **Backend (Render)** | https://marketplace-pro-backend.onrender.com |
| **Base de Datos (Railway)** | MySQL en la nube |

## Credenciales de Prueba

| Rol | Email | Contraseña |
|-----|-------|------------|
| **ADMIN** | admin@marketplace.com | Admin123! |
| **CUSTOMER** | customer@marketplace.com | Customer123! |

## Arquitectura

```
project-root/
├── backend-marketplace/          # Express API Server
│   ├── src/
│   │   ├── config/database.js    # Conexión MySQL (Railway)
│   │   ├── controllers/          # Controladores
│   │   ├── middleware/auth.js    # JWT + roles
│   │   ├── models/               # Sequelize models
│   │   ├── routes/               # Rutas REST
│   │   └── seeders/seed.js       # Poblado de datos
│   ├── .env.example
│   └── package.json
├── frontend-marketplace/         # Next.js 15
│   ├── src/
│   │   ├── app/                  # App Router
│   │   ├── components/           # Componentes UI
│   │   ├── context/AuthContext   # Auth state management
│   │   └── lib/api.ts            # Cliente HTTP
│   ├── vercel.json
│   └── package.json
├── schema.sql                    # Esquema de base de datos
├── seed.sql                      # Datos de prueba (referencia)
└── README.md
```

## Tecnologías

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express 5
- **ORM:** Sequelize 6
- **Base de datos:** MySQL (Railway Cloud)
- **Autenticación:** JWT + bcryptjs
- **Despliegue:** Render

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS 4
- **Animaciones:** Framer Motion, GSAP
- **Iconos:** Lucide React
- **Despliegue:** Vercel

## Variables de Entorno

### Backend (Railway / Render)

| Variable | Requerida | Descripción |
|----------|-----------|-------------|
| `DATABASE_URL` | ✅ | URL de conexión MySQL de Railway |
| `JWT_SECRET` | ✅ | Clave secreta para JWT |
| `PORT` | ❌ | Render asigna automáticamente |
| `FRONTEND_URL` | ❌ | URL del frontend para CORS |

### Frontend (Vercel)

| Variable | Requerida | Descripción |
|----------|-----------|-------------|
| `NEXT_PUBLIC_API_URL` | ✅ | URL del backend (https://.../api) |

## API Endpoints

### Auth
- `POST /api/auth/register` — Registrar usuario
- `POST /api/auth/login` — Iniciar sesión
- `GET /api/auth/profile` — Perfil (requiere token)

### Products
- `GET /api/products` — Listar productos
- `GET /api/products/:id` — Producto por ID
- `POST /api/products` — Crear (ADMIN)
- `PUT /api/products/:id` — Actualizar (ADMIN)
- `DELETE /api/products/:id` — Eliminar (ADMIN)

### Categories
- `GET /api/categories` — Listar categorías
- `GET /api/categories/:id` — Categoría por ID
- `POST /api/categories` — Crear (ADMIN)
- `PUT /api/categories/:id` — Actualizar (ADMIN)
- `DELETE /api/categories/:id` — Eliminar (ADMIN)

## Instalación Local

### Prerrequisitos
- Node.js 18+
- MySQL (local o Railway)

### Backend
```bash
cd backend-marketplace
npm install
cp .env.example .env
# Editar .env con tus credenciales
npm run seed
npm run dev
```

### Frontend
```bash
cd frontend-marketplace
npm install
cp .env.example .env.local
npm run dev
```

## Despliegue

### Backend en Render
1. Subir el repo a GitHub
2. Crear Web Service en Render
3. Root Directory: `backend-marketplace`
4. Build: `npm install`
5. Start: `npm start`
6. Variables: `DATABASE_URL` (desde Railway), `JWT_SECRET`

### Frontend en Vercel
1. Importar repo desde Vercel
2. Root Directory: `frontend-marketplace`
3. Variables: `NEXT_PUBLIC_API_URL` = URL del backend

### Base de Datos en Railway
1. Crear proyecto en Railway
2. Agregar MySQL
3. Copiar `MYSQL_PUBLIC_URL` → usarlo como `DATABASE_URL`
4. Ejecutar seed: `DATABASE_URL="<url>" npm run seed`
