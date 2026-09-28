# Mahjong Success - Project Installation Guide

This guide provides step-by-step instructions for installing and running the Mahjong Success platform (both Frontend and Backend).

## Prerequisites

- **Node.js**: v18 or newer
- **npm** or **yarn**
- **Docker** and **Docker Compose** (if running via Docker)
- **PostgreSQL** (if running locally without Docker)

---

## 🚀 Scenario 1: Running with Docker (Recommended)

This method sets up the database, backend, and frontend automatically using Docker.

1. **Clone the repositories**:
   Ensure you have both the frontend and backend in the same parent directory if you use a unified docker-compose, or just run them separately. Assuming you run them locally:

2. **Backend Setup (Docker for DB)**:
   Navigate to the backend directory:
   ```bash
   cd booking-website-backend
   ```
   Start the PostgreSQL database via Docker:
   ```bash
   docker-compose up -d
   ```
   Copy the environment variables and update if necessary:
   ```bash
   cp .env.example .env
   ```
   Install dependencies, generate Prisma client, and seed the database (this will load CMS default data):
   ```bash
   npm install
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```
   Start the backend server:
   ```bash
   npm run start:dev
   ```

3. **Frontend Setup**:
   Open a new terminal and navigate to the frontend directory:
   ```bash
   cd mahjong-frontend/mahjong-frontend
   ```
   Install dependencies:
   ```bash
   npm install
   ```
   Copy environment variables:
   ```bash
   cp .env.example .env
   # Make sure VITE_API_URL points to the backend (e.g. http://localhost:4000)
   ```
   Start the frontend:
   ```bash
   npm run dev
   ```

---

## 💻 Scenario 2: Running Locally without Docker

If you don't have Docker, you need to have a PostgreSQL instance running locally.

1. **Database Setup**:
   - Create a PostgreSQL database named `mahjong_db`.
   - Update the `.env` file in `booking-website-backend` to match your local database credentials:
     ```env
     DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/mahjong_db?schema=public"
     ```

2. **Backend Setup**:
   ```bash
   cd booking-website-backend
   npm install
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   npm run start:dev
   ```

3. **Frontend Setup**:
   ```bash
   cd mahjong-frontend/mahjong-frontend
   npm install
   npm run dev
   ```

---

## CMS Seeding & Default Admin

When you run `npx prisma db seed`, the following happens:
- A default admin is created: `admin@example.com` / `admin123`
- Default content is populated for the **Home**, **About Mahjong**, and **What You Receive** pages.
- The `uploads/` folder is included in version control so that default banner images are retained and displayed properly out-of-the-box.

You can log in to the admin panel at `http://localhost:5174/admin` using the default credentials to access the CMS Hub and live preview features.

---

## 🗄️ Database Backup & Safety Rules (Production Deployment)

Before executing any migrations or seeds on Production, always backup the database first:

```bash
# Backup Production DB to DATA/YYYY-MM-DD/
npm run db:backup:prod

# Backup Development DB
npm run db:backup:dev
```

See the full backup and rollback rules in [DATA/README.md](file:///d:/Freelancer/mahjong-backend/DATA/README.md) and SQL patches log in [database_patches/README.md](file:///d:/Freelancer/mahjong-backend/database_patches/README.md).
