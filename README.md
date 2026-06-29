# Mahjong Booking Website - Backend API

This is the backend for the Mahjong booking platform, built with **NestJS**, **Prisma ORM**, and **PostgreSQL**.

## 📌 Prerequisites

Before you begin, ensure you have met the following requirements:
* **Node.js**: `v20` or higher recommended.
* **npm**: Node package manager.
* **Docker & Docker Compose**: Required for running the local PostgreSQL database.

---

## 🚀 Getting Started (Run from A-Z)

Follow these instructions to get the project up and running on your local machine.

### 1. Installation
Clone the repository (if applicable) and install the dependencies:
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory if it doesn't already exist. You can copy the `.env.example` if available.
The file should look like this:

```env
# Database configuration (Matches the docker-compose settings)
DATABASE_URL="postgresql://admin:admin_password@localhost:5433/booking_db?schema=public"

# JWT Secret for Authentication (Change this in production)
JWT_SECRET="super-secret-booking-key"

# Application Port
PORT=3000
```

### 3. Database Setup (Docker + Prisma)
We use Docker to easily manage our PostgreSQL instance.
1. Start the database container in the background:
   ```bash
   docker compose up -d
   ```
2. Wait a few seconds for the database to fully initialize.
3. Push the Prisma schema to the database (this creates the tables):
   ```bash
   npx prisma db push
   ```
4. Seed the database with the initial Admin account:
   ```bash
   npx prisma db seed
   ```

### 4. Running the Application
Once the database is ready, you can start the NestJS server.

```bash
# development mode
npm run start

# watch mode (Recommended for development - auto restarts on save)
npm run start:dev

# production mode
npm run start:prod
```
The server should now be running at `http://localhost:3000`.

---

## 🔑 Default Credentials (Seeder)

After running the seed script, an initial Admin account is created automatically so you can test the APIs.

* **Email**: `admin@example.com`
* **Password**: `admin123`
* **Role**: `ADMIN`

To authenticate, send a `POST` request to `http://localhost:3000/auth/login` with the above credentials in the JSON body. You will receive an `access_token` to use in subsequent requests as a Bearer Token.

---

## 📦 Prisma Studio (Database GUI)

If you want to view or edit the database records through a clean visual interface in your browser, you can use Prisma Studio:

```bash
npx prisma studio
```
It will open automatically at `http://localhost:5555`.
