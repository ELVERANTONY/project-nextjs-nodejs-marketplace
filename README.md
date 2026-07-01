# Marketplace Pro

Aplicacion web full-stack de marketplace con autenticacion JWT, panel de administracion, catalogo de productos con busqueda y filtros, y una interfaz de usuario moderna con modo oscuro. Construida con Node.js, Express, Sequelize, MySQL en Railway, Next.js 15, TypeScript y Tailwind CSS 4.

---

## Tabla de Contenidos

- [Descripcion del Proyecto](#descripcion-del-proyecto)
- [Arquitectura](#arquitectura)
- [Tecnologias](#tecnologias)
- [Enlaces de Despliegue](#enlaces-de-despliegue)
- [Credenciales de Prueba](#credenciales-de-prueba)
- [Estructura del Repositorio](#estructura-del-repositorio)
- [Backend](#backend)
  - [Instalacion Local](#instalacion-local-backend)
  - [Variables de Entorno](#variables-de-entorno-backend)
  - [API Endpoints](#api-endpoints)
  - [Despliegue en Render](#despliegue-en-render)
- [Frontend](#frontend)
  - [Instalacion Local](#instalacion-local-frontend)
  - [Variables de Entorno](#variables-de-entorno-frontend)
  - [Componentes Principales](#componentes-principales)
  - [Despliegue en Vercel](#despliegue-en-vercel)
- [Base de Datos](#base-de-datos)
  - [Esquema](#esquema)
  - [Poblado de Datos](#poblado-de-datos)
- [Funcionalidades](#funcionalidades)
- [Autor](#autor)

---

## Descripcion del Proyecto

Marketplace Pro es una plataforma de comercio electronico desarrollada como proyecto del curso de Desarrollo de Aplicaciones Web. El sistema permite la gestion de productos y categorias a traves de un panel de administracion, y ofrece una experiencia de navegacion moderna para los clientes.

El proyecto esta dividido en dos partes principales:

- **Backend**: API REST construida con Express y Sequelize, que proporciona autenticacion JWT con roles (ADMIN y CUSTOMER), operaciones CRUD completas para productos y categorias, y se conecta a una base de datos MySQL alojada en Railway.

- **Frontend**: Aplicacion de una sola pagina (SPA) construida con Next.js 15 y App Router, con renderizado del lado del cliente, autenticacion sincronizada entre el navegador y el servidor mediante cookies y localStorage, y una interfaz de usuario premium con animaciones GSAP y Framer Motion.

---

## Arquitectura

El proyecto sigue una arquitectura de monorepo donde el backend y el frontend coexisten en el mismo repositorio, cada uno en su propia carpeta. Ambas plataformas de despliegue (Render y Vercel) soportan esta configuracion mediante la opcion "Root Directory", lo que permite apuntar cada servicio a su subcarpeta correspondiente sin necesidad de repositorios separados.

```
project-nextjs-nodejs-marketplace/
|
+-- backend-marketplace/                # Servidor API Express
|   +-- src/
|   |   +-- config/
|   |   |   +-- database.js             # Configuracion de Sequelize + MySQL
|   |   +-- controllers/
|   |   |   +-- auth.controller.js      # Controlador de autenticacion
|   |   |   +-- category.controller.js  # Controlador de categorias
|   |   |   +-- product.controller.js   # Controlador de productos
|   |   +-- middleware/
|   |   |   +-- auth.js                 # Middleware JWT y autorizacion por roles
|   |   +-- models/
|   |   |   +-- index.js                # Punto de entrada de modelos con asociaciones
|   |   |   +-- Role.js                 # Modelo de roles
|   |   |   +-- User.js                 # Modelo de usuarios con bcrypt
|   |   |   +-- Category.js             # Modelo de categorias
|   |   |   +-- Product.js              # Modelo de productos
|   |   +-- routes/
|   |   |   +-- auth.js                 # Rutas de autenticacion
|   |   |   +-- categories.js           # Rutas de categorias
|   |   |   +-- products.js             # Rutas de productos
|   |   +-- seeders/
|   |   |   +-- seed.js                 # Script de poblado de datos
|   |   +-- app.js                      # Configuracion Express, CORS, rutas
|   |   +-- server.js                   # Punto de entrada del servidor
|   +-- .env                            # Variables de entorno (no incluido en git)
|   +-- .env.example                    # Plantilla de variables de entorno
|   +-- .gitignore
|   +-- package.json
|
+-- frontend-marketplace/               # Aplicacion Next.js
|   +-- src/
|   |   +-- app/
|   |   |   +-- admin/
|   |   |   |   +-- page.tsx            # Panel de administracion
|   |   |   +-- login/
|   |   |   |   +-- page.tsx            # Pagina de inicio de sesion
|   |   |   +-- products/
|   |   |   |   +-- [id]/
|   |   |   |       +-- page.tsx        # Detalle de producto
|   |   |   +-- register/
|   |   |   |   +-- page.tsx            # Pagina de registro
|   |   |   +-- globals.css             # Estilos globales y animaciones
|   |   |   +-- layout.tsx              # Layout principal con Navbar y Footer
|   |   |   +-- page.tsx                # Pagina principal (landing + productos)
|   |   +-- components/
|   |   |   +-- layout/
|   |   |   |   +-- Footer.tsx          # Pie de pagina
|   |   |   |   +-- Navbar.tsx          # Barra de navegacion
|   |   |   +-- ui/
|   |   |   |   +-- Button.tsx          # Boton con variantes (cva)
|   |   |   |   +-- Card.tsx            # Tarjeta con soporte para glow y hover
|   |   |   |   +-- EmptyState.tsx      # Estado vacio para listas
|   |   |   |   +-- Input.tsx           # Campo de texto con animacion GSAP
|   |   |   |   +-- Skeleton.tsx        # Esqueleto de carga
|   |   |   |   +-- Toast.tsx           # Sistema de notificaciones toast
|   |   |   |   +-- gaming-login.tsx    # Componente de login/register con video
|   |   |   |   +-- product-reveal-card.tsx  # Tarjeta de producto con hover reveal
|   |   |   +-- ProductCard.tsx         # Envoltura de ProductRevealCard
|   |   +-- context/
|   |   |   +-- AuthContext.tsx          # Contexto de autenticacion
|   |   +-- lib/
|   |   |   +-- api.ts                   # Cliente HTTP para la API
|   |   |   +-- utils.ts                 # Utilidades (cn, formatPrice, etc.)
|   |   +-- types/
|   |   |   +-- product.ts               # Tipos TypeScript
|   |   +-- middleware.ts                 # Middleware de Next.js para proteccion de rutas
|   +-- public/
|   |   +-- favicon.svg
|   +-- .env.example
|   +-- .gitignore
|   +-- next.config.ts
|   +-- package.json
|   +-- postcss.config.mjs
|   +-- tsconfig.json
|   +-- vercel.json
|
+-- schema.sql                          # Script SQL del esquema de base de datos
+-- seed.sql                            # Script SQL con datos de prueba
+-- README.md                           # Este archivo

```

---

## Tecnologias

### Backend

| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| Node.js | 18.x+ | Entorno de ejecucion |
| Express | 5.x | Framework web |
| Sequelize | 6.x | ORM para MySQL |
| MySQL2 | 3.x | Driver de base de datos |
| JSON Web Token | 9.x | Autenticacion basada en tokens |
| bcryptjs | 2.x | Hash de contrasenas |
| dotenv | 16.x | Gestion de variables de entorno |
| cors | 2.x | Control de acceso HTTP |
| nodemon | 3.x | Recarga automatica en desarrollo |

### Frontend

| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| Next.js | 15.x | Framework React con App Router |
| TypeScript | 5.x | Tipado estatico |
| React | 19.x | Libreria de interfaz de usuario |
| Tailwind CSS | 4.x | Framework de estilos utilitario |
| Framer Motion | 11.x | Animaciones declarativas |
| GSAP | 3.x | Animaciones de alto rendimiento |
| Lucide React | 0.400.x | Iconos SVG |
| class-variance-authority | 0.7.x | Variantes de componentes |
| tailwind-merge | 2.x | Fusion de clases Tailwind |
| clsx | 2.x | Construccion condicional de clases |

---

## Enlaces de Despliegue

| Componente | Plataforma | URL |
|------------|------------|-----|
| Repositorio (Backend y Frontend) | GitHub | https://github.com/ELVERANTONY/project-nextjs-nodejs-marketplace |
| Backend (API) | Render | https://marketplace-pro-backend.onrender.com/ |
| Frontend (Web) | Vercel | https://marketplace-pro-frontend.vercel.app/ |
| Base de Datos | Railway | MySQL en la nube (conexion via DATABASE_URL) |

---

## Credenciales de Prueba

El sistema cuenta con dos roles predefinidos. Las siguientes credenciales pueden utilizarse para probar todas las funcionalidades de la aplicacion:

| Rol | Nombre | Email | Contrasena |
|-----|--------|-------|------------|
| ADMIN | Admin | admin@marketplace.com | Admin123! |
| CUSTOMER | Antony | customer@marketplace.com | Customer123! |

El rol ADMIN tiene acceso al panel de administracion en /admin, donde puede crear, editar y eliminar productos y categorias. El rol CUSTOMER puede navegar el catalogo, iniciar sesion y visualizar productos.

---

## Backend

### Instalacion Local (Backend)

```bash
# Clonar el repositorio
git clone https://github.com/ELVERANTONY/project-nextjs-nodejs-marketplace.git
cd project-nextjs-nodejs-marketplace/backend-marketplace

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de base de datos

# Poblar la base de datos con datos de prueba
npm run seed

# Iniciar servidor de desarrollo
npm run dev
```

El servidor se iniciara en http://localhost:3001.

### Variables de Entorno (Backend)

Crear un archivo `.env` en la carpeta `backend-marketplace/` con las siguientes variables:

```env
# Base de datos en Railway (produccion) o local (desarrollo)
DATABASE_URL=mysql://usuario:contrasena@host:puerto/nombre_bd

# JWT
JWT_SECRET=tu_clave_secreta_aqui
JWT_EXPIRES_IN=7d

# Puerto del servidor (Render asigna automaticamente en produccion)
PORT=3001

# URL del frontend para CORS
FRONTEND_URL=http://localhost:3000
```

### API Endpoints

#### Autenticacion

| Metodo | Ruta | Descripcion | Autenticacion |
|--------|------|-------------|---------------|
| POST | /api/auth/register | Registrar un nuevo usuario | No |
| POST | /api/auth/login | Iniciar sesion y obtener token JWT | No |
| GET | /api/auth/profile | Obtener perfil del usuario autenticado | Bearer Token |

Ejemplo de login:

```bash
curl -X POST https://marketplace-pro-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@marketplace.com", "password": "Admin123!"}'
```

Respuesta esperada:

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "Admin",
    "email": "admin@marketplace.com",
    "roleId": 1,
    "role": { "id": 1, "name": "ADMIN" }
  }
}
```

#### Productos

| Metodo | Ruta | Descripcion | Autenticacion |
|--------|------|-------------|---------------|
| GET | /api/products | Listar todos los productos | No |
| GET | /api/products?categoryId=1 | Filtrar productos por categoria | No |
| GET | /api/products/:id | Obtener producto por ID | No |
| POST | /api/products | Crear nuevo producto | ADMIN |
| PUT | /api/products/:id | Actualizar producto existente | ADMIN |
| DELETE | /api/products/:id | Eliminar producto | ADMIN |

#### Categorias

| Metodo | Ruta | Descripcion | Autenticacion |
|--------|------|-------------|---------------|
| GET | /api/categories | Listar todas las categorias | No |
| GET | /api/categories/:id | Obtener categoria por ID | No |
| POST | /api/categories | Crear nueva categoria | ADMIN |
| PUT | /api/categories/:id | Actualizar categoria existente | ADMIN |
| DELETE | /api/categories/:id | Eliminar categoria | ADMIN |

#### Salud del Servicio

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | /api/health | Verificar estado del servidor |

### Despliegue en Render

Render es la plataforma utilizada para desplegar el backend. Los pasos para realizar el despliegue son los siguientes:

1. Crear una cuenta en https://render.com e iniciar sesion con GitHub.
2. Desde el dashboard, hacer clic en "New +" y seleccionar "Web Service".
3. Conectar el repositorio de GitHub: ELVERANTONY/project-nextjs-nodejs-marketplace.
4. Configurar el servicio con los siguientes valores:

   - **Name**: marketplace-pro-backend
   - **Root Directory**: backend-marketplace
   - **Runtime**: Node
   - **Build Command**: npm install
   - **Start Command**: npm start
   - **Plan**: Free

5. Agregar las siguientes variables de entorno:

   - DATABASE_URL: La URL de conexion MySQL obtenida de Railway (MYSQL_PUBLIC_URL).
   - JWT_SECRET: Una clave secreta para firmar los tokens JWT.

6. Hacer clic en "Deploy Web Service" y esperar a que el despliegue se complete.

7. Una vez desplegado, ejecutar el script de seed para poblar la base de datos. Esto puede hacerse desde la maquina local apuntando a la base de datos de Railway:

   ```bash
   DATABASE_URL="mysql://usuario:contrasena@host:puerto/nombre_bd" npm run seed
   ```

   O alternativamente, puede accederse al endpoint /api/run-seed (deshabilitado en produccion por seguridad).

---

## Frontend

### Instalacion Local (Frontend)

```bash
# Navegar a la carpeta del frontend
cd project-nextjs-nodejs-marketplace/frontend-marketplace

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Iniciar servidor de desarrollo
npm run dev
```

La aplicacion se iniciara en http://localhost:3000.

### Variables de Entorno (Frontend)

Crear un archivo `.env.local` en la carpeta `frontend-marketplace/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Para produccion, esta variable debe apuntar a la URL del backend desplegado:

```env
NEXT_PUBLIC_API_URL=https://marketplace-pro-backend.onrender.com/api
```

El codigo fuente incluye un valor por defecto que apunta al backend de produccion, por lo que esta variable es opcional en Vercel si se mantiene el fallback en el codigo.

### Componentes Principales

El frontend esta construido con los siguientes componentes clave:

- **Navbar**: Barra de navegacion superior con enlaces contextuales. Muestra enlaces de inicio y administracion (solo para usuarios ADMIN). Incluye menu movil responsivo.

- **Footer**: Pie de pagina con informacion del proyecto, enlaces rapidos y tecnologias utilizadas.

- **GamingAuth**: Pantalla de inicio de sesion y registro con estilo gaming, video de fondo, efecto glassmorphism y soporte para credenciales de prueba.

- **ProductRevealCard**: Tarjeta de producto con animacion hover que revela detalles del producto, calificacion por estrellas, descuentos y boton para ver producto.

- **Input**: Campo de formulario con animacion de borde gradiente que sigue el cursor del mouse utilizando GSAP.

- **Button**: Componente de boton con variantes (primary, secondary, outline, ghost, danger) usando class-variance-authority.

- **Toast**: Sistema de notificaciones desplegables con soporte para tipos success, error e info.

- **Card**: Componente de tarjeta con soporte para efecto glow y animacion hover.

- **Skeleton**: Esqueleto de carga para mejorar la percepcion de rendimiento.

### Despliegue en Vercel

Vercel es la plataforma utilizada para desplegar el frontend. Los pasos son los siguientes:

1. Crear una cuenta en https://vercel.com e iniciar sesion con GitHub.
2. Hacer clic en "Add New" y seleccionar "Project".
3. Importar el repositorio: ELVERANTONY/project-nextjs-nodejs-marketplace.
4. Configurar el proyecto:

   - **Project Name**: marketplace-pro-frontend
   - **Root Directory**: frontend-marketplace
   - **Framework Preset**: Next.js (se detecta automaticamente)

5. Agregar variable de entorno (opcional, el codigo tiene fallback):

   - NEXT_PUBLIC_API_URL: https://marketplace-pro-backend.onrender.com/api

6. Hacer clic en "Deploy".

Vercel detecta automaticamente Next.js, ejecuta `next build` y despliega la aplicacion. Cualquier push a la rama main del repositorio desencadena un nuevo despliegue automatico.

---

## Base de Datos

### Esquema

La base de datos esta alojada en Railway Cloud y consta de cuatro tablas principales. El archivo `schema.sql` en la raiz del proyecto contiene el script completo de creacion.

**Tabla: Roles**

| Columna | Tipo | Restricciones |
|---------|------|---------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT |
| name | VARCHAR(50) | NOT NULL, UNIQUE |
| createdAt | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP |
| updatedAt | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE |

**Tabla: Users**

| Columna | Tipo | Restricciones |
|---------|------|---------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT |
| name | VARCHAR(100) | NOT NULL |
| email | VARCHAR(150) | NOT NULL, UNIQUE |
| password | VARCHAR(255) | NOT NULL |
| roleId | INT | NOT NULL, FOREIGN KEY -> Roles(id), DEFAULT 2 |
| createdAt | DATETIME | NOT NULL |
| updatedAt | DATETIME | NOT NULL |

**Tabla: Categories**

| Columna | Tipo | Restricciones |
|---------|------|---------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT |
| name | VARCHAR(100) | NOT NULL, UNIQUE |
| description | TEXT | NULLABLE |
| createdAt | DATETIME | NOT NULL |
| updatedAt | DATETIME | NOT NULL |

**Tabla: Products**

| Columna | Tipo | Restricciones |
|---------|------|---------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT |
| nombre | VARCHAR(200) | NOT NULL |
| precio | DECIMAL(10,2) | NOT NULL |
| descripcion | TEXT | NULLABLE |
| imageUrl | VARCHAR(500) | NULLABLE |
| categoryId | INT | FOREIGN KEY -> Categories(id), ON DELETE SET NULL |
| createdAt | DATETIME | NOT NULL |
| updatedAt | DATETIME | NOT NULL |

**Relaciones:**

- Un Role tiene muchos Users (1:N)
- Un User pertenece a un Role (N:1)
- Una Category tiene muchos Products (1:N)
- Un Product pertenece a una Category (N:1)

### Poblado de Datos

El proyecto incluye dos metodos para poblar la base de datos con informacion de prueba:

**Mediante Sequelize (recomendado):**

El archivo `backend-marketplace/src/seeders/seed.js` contiene un script que crea:
- 2 roles (ADMIN, CUSTOMER)
- 2 usuarios (Admin y Antony)
- 4 categorias (Electronics, Fashion, Home & Garden, Sports)
- 10 productos con precios, descripciones e imagenes

Para ejecutarlo:

```bash
cd backend-marketplace
DATABASE_URL="mysql://usuario:contrasena@host:puerto/nombre_bd" npm run seed
```

**Mediante SQL directo:**

El archivo `seed.sql` en la raiz del proyecto contiene las sentencias INSERT para los mismos datos. Nota: las contrasenas en este archivo son referenciales, ya que el sistema utiliza bcrypt para hashear las contrasenas antes de almacenarlas.

---

## Funcionalidades

El sistema incluye las siguientes funcionalidades implementadas:

**Autenticacion y Seguridad:**
- Registro de nuevos usuarios con validacion de email
- Inicio de sesion con generacion de token JWT
- Proteccion de rutas del lado del servidor (middleware de Next.js)
- Proteccion de rutas del lado del cliente (React context)
- Sincronizacion del token entre localStorage y cookies
- Hash de contrasenas con bcrypt
- Roles de usuario: ADMIN y CUSTOMER

**Gestion de Productos (ADMIN):**
- Creacion de productos con nombre, precio, descripcion, imagen y categoria
- Edicion de productos existentes
- Eliminacion de productos
- Busqueda en tiempo real
- Vista de lista con tarjetas

**Gestion de Categorias (ADMIN):**
- Creacion de categorias con nombre y descripcion
- Edicion y eliminacion de categorias

**Catalogo (Cliente):**
- Visualizacion de productos en cuadricula
- Filtrado por categoria
- Busqueda por nombre
- Tarjetas con hover reveal y animaciones
- Pagina de detalle de producto

**Interfaz de Usuario:**
- Modo oscuro permanente
- Diseno responsivo (movil, tablet, escritorio)
- Animaciones con Framer Motion y GSAP
- Notificaciones toast
- Estados de carga (skeleton)
- Estados de error y vacio
- Pagina de login/register con video de fondo y efecto glassmorphism

**Panel de Administracion:**
- Dashboard contextual con resumen de productos y categorias
- CRUD completo de productos con formulario y previsualizacion
- CRUD completo de categorias
- Interfaz adaptada al modo oscuro

**Internacionalizacion:**
- Interfaz completa en espanol
- Formato de moneda en USD
- Formato de fechas en locale espanol

---

## Autor

**Antony Cholan** - Estudiante de Diseño y Desarrollo de Software
Desarrollo de Aplicaciones Web - Ciclo 5

Repositorio del proyecto: https://github.com/ELVERANTONY/project-nextjs-nodejs-marketplace
Backend desplegado: https://marketplace-pro-backend.onrender.com/
Frontend desplegado: https://marketplace-pro-frontend.vercel.app/
