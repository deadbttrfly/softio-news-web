# SoftIO News

> A modern full-stack news platform built with Next.js, Express.js, MySQL, and JWT-based authentication.

SoftIO News is a full-stack news management platform designed to provide a modern news reading experience while providing administrators with a secure dashboard for managing news content.

The project was built to demonstrate practical full-stack development, including frontend development, REST API integration, database management, authentication, authorization, CRUD operations, pagination, and responsive UI development.

---

## Live Demo

**Public website (preview):** [https://softio-news-web.vercel.app](https://softio-news-web.vercel.app)

> ⚠️ This deployment is a **static preview only**. It runs on local dummy data instead of the live Express + MySQL API, so the admin dashboard and write operations (create/edit/delete) are not connected in this build. It exists purely to showcase the public reading experience. See [Full Stack Deployment](#full-stack-deployment-optional) below for how to run the complete system with a real backend and database.

---

## Preview

### Public Website

The public website provides users with a clean and responsive interface for discovering and reading news articles.

Features include:

- Featured news
- Breaking news ticker
- Latest news
- Category filtering
- Search
- Article detail pages
- Related articles
- Trending articles
- Newsletter subscription
- Responsive layout

### Admin Dashboard

The admin dashboard allows authorized administrators to manage news content through a protected interface.

Features include:

- Admin login
- JWT authentication
- Protected routes
- News management
- Create news
- Edit news
- Delete news
- Pagination
- Authentication handling

> Note: the admin dashboard is part of the codebase but is **not active in the public Vercel preview**, since that build uses static dummy data with no backend attached.

---

# Features

## Public Features

### 📰 News Feed

Users can browse the latest news articles through the main news feed.

### 🔥 Breaking News

A breaking news ticker displays the latest important articles at the top of the website.

### ⭐ Featured News

Important articles can be highlighted in the featured news section.

### 🔎 Search

Users can search for articles based on their titles, excerpts, or available tags.

### 🗂️ Category Filtering

Articles can be filtered based on their categories.

Example categories:

- Nasional
- Politik
- Ekonomi
- Olahraga
- Teknologi
- Hiburan
- Internasional
- Kesehatan

### 📖 Dynamic Article Pages

Every article has its own dynamic page based on its slug.

Example:

```text
/news/pemerintah-percepat-pembangunan
```

### 🔗 Related Articles

The article detail page provides related articles to help users discover more relevant content.

### 📈 Trending News

Popular or recent articles can be displayed in the trending section.

### 📬 Newsletter

Users can subscribe to the newsletter to receive news updates.

### 📱 Responsive Design

The website is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile

---

# Admin Features

## 🔐 Admin Authentication

Administrators can log in through a dedicated admin login page.

Authentication is handled through the backend API using JWT.

Authentication flow:

```text
Admin
  │
  ▼
Login Form
  │
  ▼
POST /api/auth/login
  │
  ▼
Express.js
  │
  ├── Find user
  ├── Verify password
  │
  ▼
Generate JWT
  │
  ▼
Frontend
  │
  ▼
Protected Admin Area
```

---

## 🛡️ JWT Authorization

Protected admin endpoints require a valid JWT token.

The backend verifies the token before allowing access to protected resources.

```text
Request
   │
   ▼
Authorization Header
   │
   ▼
JWT Middleware
   │
   ├── Invalid → 401 Unauthorized
   │
   └── Valid
        │
        ▼
     Controller
        │
        ▼
     Service
        │
        ▼
      MySQL
```

---

# CRUD News Management

Administrators can manage news articles through the dashboard.

The application supports complete CRUD operations:

```text
CREATE
   │
   ▼
READ
   │
   ▼
UPDATE
   │
   ▼
DELETE
```

### Create

Administrators can create new news articles.

### Read

Administrators can view existing articles.

### Update

Administrators can edit existing news content.

### Delete

Administrators can remove articles from the database.

---

# Pagination

News listings support pagination to improve performance and usability when the number of articles grows.

Example:

```text
GET /api/news?page=1&limit=10
```

The backend handles pagination parameters and returns the appropriate set of articles.

---

# Technology Stack

## Frontend

| Technology   | Purpose                                 |
| ------------ | ---------------------------------------- |
| Next.js      | React framework and application routing |
| React        | UI development                          |
| TypeScript   | Type safety                             |
| Tailwind CSS | Styling and responsive UI               |

## Backend

| Technology | Purpose                          |
| ---------- | --------------------------------- |
| Node.js    | JavaScript runtime               |
| Express.js | REST API framework               |
| JWT        | Authentication and authorization |
| bcrypt     | Password hashing                 |
| MySQL2     | MySQL database driver            |

## Database

| Technology | Purpose             |
| ---------- | -------------------- |
| MySQL      | Relational database |

## Development Tools

| Tool    | Purpose                 |
| ------- | ------------------------ |
| Git     | Version control         |
| GitHub  | Repository hosting      |
| VS Code | Development environment |
| npm     | Package management      |

---

# System Architecture

SoftIO News uses a separated frontend and backend architecture.

```text
                    ┌───────────────────────┐
                    │       Client          │
                    │   Browser / Mobile    │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │       Next.js         │
                    │      Frontend         │
                    └───────────┬───────────┘
                                │
                         HTTP / REST API
                                │
                                ▼
                    ┌───────────────────────┐
                    │      Express.js       │
                    │       Backend         │
                    └───────────┬───────────┘
                                │
                  ┌─────────────┴─────────────┐
                  │                           │
                  ▼                           ▼
        ┌─────────────────┐         ┌─────────────────┐
        │   JWT Auth      │         │      MySQL      │
        │  Authorization  │         │    Database     │
        └─────────────────┘         └─────────────────┘
```

> In the Vercel preview build, the Express + MySQL layer is replaced with a static dummy data source — the diagram above reflects the full local/production architecture.

---

# Request Flow

A typical public article request (full backend mode):

```text
User
 │
 │ GET /news/article-slug
 ▼
Next.js
 │
 │ GET /api/news/article-slug
 ▼
Express.js
 │
 ▼
Controller
 │
 ▼
Service
 │
 ▼
MySQL
 │
 ▼
Article Data
 │
 ▼
Next.js
 │
 ▼
User
```

Admin request:

```text
Admin
 │
 │ Login
 ▼
POST /api/auth/login
 │
 ▼
Express.js
 │
 ▼
Verify Credentials
 │
 ▼
JWT
 │
 ▼
Admin Dashboard
 │
 │ Authorization: Bearer <token>
 ▼
Protected API
 │
 ▼
JWT Middleware
 │
 ▼
Controller
 │
 ▼
Service
 │
 ▼
MySQL
```

---

# Project Structure

```text
softio-news-web/
│
├── public/
│
├── src/
│   │
│   ├── app/
│   │   │
│   │   ├── admin/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   └── news/
│   │   │       ├── page.tsx
│   │   │       ├── create/
│   │   │       │   └── page.tsx
│   │   │       └── edit/
│   │   │
│   │   ├── news/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── page.tsx
│   │   └── layout.tsx
│   │
│   ├── components/
│   │   ├── home/
│   │   ├── news/
│   │   ├── admin/
│   │   └── ui/
│   │
│   ├── lib/
│   │   ├── api.ts
│   │   ├── dummyNews.ts
│   │   └── utils.ts
│   │
│   └── types/
│       └── news.ts
│
├── .env.local
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

> `src/lib/dummyNews.ts` holds the static dataset used for the public Vercel preview. `src/lib/api.ts` switches between the live API and the dummy dataset depending on environment configuration.

> The actual project structure may evolve as additional features are implemented.

---

# Backend Repository

The frontend communicates with a separate Express.js REST API.

Backend repository:

```text
softio-news-api
```

Backend structure:

```text
softio-news-api/
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── news.controller.js
│   │
│   ├── middleware/
│   │   └── auth.middleware.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── news.routes.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   └── news.services.js
│   │
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

# API Endpoints

## Authentication

### Login

```http
POST /api/auth/login
```

Example request:

```json
{
  "username": "admin",
  "password": "your-password"
}
```

Successful authentication returns a JWT token.

---

# News API

## Get All News

```http
GET /api/news
```

Returns a list of news articles.

---

## Get News by Slug

```http
GET /api/news/:slug
```

Example:

```http
GET /api/news/pemerintah-percepat-pembangunan
```

---

## Create News

```http
POST /api/news
```

Requires authentication.

Example:

```json
{
  "slug": "contoh-berita",
  "title": "Contoh Berita",
  "excerpt": "Ringkasan berita.",
  "content": "Isi berita.",
  "category": "Nasional",
  "author": "Admin",
  "image_url": "https://example.com/image.jpg"
}
```

---

## Update News

```http
PUT /api/news/:id
```

Requires authentication.

Example:

```http
PUT /api/news/1
```

---

## Delete News

```http
DELETE /api/news/:id
```

Requires authentication.

Example:

```http
DELETE /api/news/1
```

---

# API Authentication

Protected endpoints require the JWT token in the request header.

Example:

```http
Authorization: Bearer <JWT_TOKEN>
```

Example request:

```text
POST /api/news

Authorization:
Bearer eyJhbGciOiJIUzI1NiIs...
```

---

# Database

The application uses MySQL as its primary relational database.

Main database:

```text
softio_news
```

Main tables:

```text
users
news
```

### Users

The `users` table stores administrator authentication data.

Example fields:

```text
id
username
password
created_at
```

Passwords are stored using secure hashing.

### News

The `news` table stores article information.

Example fields:

```text
id
slug
title
excerpt
content
category
author
image_url
created_at
updated_at
```

---

# Environment Variables

Create a `.env.local` file in the root of the frontend project.

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_USE_DUMMY_DATA=false
```

> Set `NEXT_PUBLIC_USE_DUMMY_DATA=true` to run the frontend against the static dummy dataset without needing the backend or database running — this is the mode used for the Vercel preview deployment.

For the backend, create a `.env` file:

```env
DB_HOST=localhost
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=softio_news
DB_PORT=3306

JWT_SECRET=your_jwt_secret
PORT=8000
```

> Never commit `.env` or `.env.local` files to GitHub.

---

# Getting Started

## Prerequisites

Make sure the following are installed:

- Node.js
- npm
- MySQL (only required for full backend mode)
- Git

---

# Frontend Setup

Clone the repository:

```bash
git clone https://github.com/your-username/softio-news-web.git
```

Enter the project:

```bash
cd softio-news-web
```

Install dependencies:

```bash
npm install
```

Create the environment file:

```bash
touch .env.local
```

Add (dummy data mode — no backend required):

```env
NEXT_PUBLIC_USE_DUMMY_DATA=true
```

Or, to use the real API:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/news
NEXT_PUBLIC_USE_DUMMY_DATA=false
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# Backend Setup

Clone the backend repository:

```bash
git clone https://github.com/your-username/softio-news-api.git
```

Enter the project:

```bash
cd softio-news-api
```

Install dependencies:

```bash
npm install
```

Create the environment file:

```bash
touch .env
```

Configure your database credentials and JWT secret.

Start the backend:

```bash
npm run dev
```

The API should run on:

```text
http://localhost:8000
```

---

# Running the Full Application

Both frontend and backend must be running.

### Terminal 1 — Backend

```bash
cd softio-news-api
npm run dev
```

Backend:

```text
http://localhost:8000
```

### Terminal 2 — Frontend

```bash
cd softio-news-web
npm run dev
```

Frontend:

```text
http://localhost:3000
```

---

# Development Environment

The application is developed using:

```text
Frontend
Next.js
     │
     ▼
localhost:3000

Backend
Express.js
     │
     ▼
localhost:8000

Database
MySQL
     │
     ▼
localhost:3306
```

---

# Deployment

## Static Preview (current — Vercel)

The public news website is deployed to Vercel as a **frontend-only static preview**, using the dummy dataset in `src/lib/dummyNews.ts` instead of a live API and database.

```text
                    ┌───────────────┐
                    │    Vercel     │
                    │    Next.js    │
                    │  (dummy data) │
                    └───────────────┘
```

This mode requires no backend hosting, no database hosting, and no environment secrets — it exists purely to showcase the reading experience for a portfolio.

## Full Stack Deployment (optional)

To run the complete system in production — including the admin dashboard, authentication, and live CRUD operations — the backend and database also need to be deployed:

```text
                         Internet
                            │
                            ▼
                    ┌───────────────┐
                    │    Vercel     │
                    │    Next.js    │
                    └───────┬───────┘
                            │
                         HTTPS
                            │
                            ▼
                    ┌───────────────┐
                    │    Express    │
                    │      API      │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │     MySQL     │
                    │    Database   │
                    └───────────────┘
```

Before full stack production deployment:

- Deploy `softio-news-api` to a Node-friendly host (e.g. Railway, Render)
- Provision a hosted MySQL instance
- Configure production environment variables
- Set `NEXT_PUBLIC_API_URL` on Vercel to the live backend URL
- Set `NEXT_PUBLIC_USE_DUMMY_DATA=false`
- Configure CORS
- Configure JWT secret
- Test authentication
- Test CRUD operations
- Test API endpoints
- Test responsive layout

---

# Production Environment Variables

Frontend (full stack mode):

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api/news
NEXT_PUBLIC_USE_DUMMY_DATA=false
```

Frontend (static preview mode, as currently deployed):

```env
NEXT_PUBLIC_USE_DUMMY_DATA=true
```

Backend:

```env
DB_HOST=your-production-db-host
DB_USER=your-production-db-user
DB_PASSWORD=your-production-db-password
DB_NAME=softio_news
DB_PORT=3306

JWT_SECRET=your-production-jwt-secret
PORT=8000
```

Production secrets should never be stored directly inside the source code.

---

# Build

Create a production build:

```bash
npm run build
```

Run the production application:

```bash
npm start
```

---

# Security

The project implements several basic security practices:

- JWT-based authentication
- Password hashing with bcrypt
- Protected admin routes
- Protected CRUD endpoints
- Environment variables for sensitive configuration
- Parameterized SQL queries
- CORS configuration

Sensitive information such as:

```text
Database passwords
JWT secrets
API credentials
```

should never be committed to the repository.

---

# Error Handling

The application handles common API scenarios including:

```text
200 OK
201 Created
400 Bad Request
401 Unauthorized
404 Not Found
500 Internal Server Error
```

The frontend handles failed API requests and unavailable resources through appropriate UI states.

---

# UI / UX

The public interface follows a modern editorial/news-inspired visual direction.

The design focuses on:

- Clear content hierarchy
- Strong typography
- Readability
- Responsive layouts
- Consistent spacing
- News-oriented visual hierarchy
- Simple navigation
- Accessible content presentation

---

# Responsive Design

The interface is designed to adapt to different screen sizes.

```text
Desktop
   │
   ├── Featured News
   ├── News Grid
   └── Sidebar

Tablet
   │
   ├── Featured News
   └── News Grid

Mobile
   │
   ├── Featured News
   └── News List
```

---

# Project Goals

The main goal of SoftIO News is to build a practical full-stack application while applying real-world development concepts.

The project focuses on:

- Frontend architecture
- Backend architecture
- REST API development
- Database integration
- Authentication
- Authorization
- CRUD operations
- API consumption
- Responsive UI
- Application architecture
- Production deployment

---

# What I Learned

Through this project, I practiced:

### Frontend Development

- Building applications with Next.js
- React component architecture
- TypeScript
- Dynamic routes
- API integration
- Responsive UI development
- Client/server interaction

### Backend Development

- Building REST APIs with Express.js
- Controller and service separation
- Routing
- Middleware
- Database interaction
- Authentication
- Authorization
- CRUD operations

### Database

- MySQL database design
- SQL queries
- Parameterized queries
- Relational data management

### Authentication

- Password hashing
- JWT generation
- JWT verification
- Protected API endpoints
- Admin authorization

### Deployment

- Deploying a Next.js frontend to Vercel
- Designing a static/dummy-data fallback mode for portfolio previews
- Planning a path to full backend + database deployment

---

# Future Improvements

Although the core application is complete, the project can be further improved with:

- [ ] Image upload system
- [ ] Rich text editor
- [ ] Role-based access control
- [ ] Advanced search
- [ ] News analytics
- [ ] User accounts
- [ ] Comments
- [ ] Social sharing
- [ ] Email newsletter automation
- [ ] Caching
- [ ] Automated testing
- [ ] CI/CD pipeline
- [ ] Rate limiting
- [ ] Full backend deployment alongside the Vercel preview

---

# Project Status

```text
Next.js Frontend        ████████████████████ 100%
News UI                 ████████████████████ 100%
Dynamic Article Page    ████████████████████ 100%
Express.js API          ████████████████████ 100%
MySQL Database          ████████████████████ 100%
API Integration         ████████████████████ 100%
Admin Authentication    ████████████████████ 100%
JWT Authentication      ████████████████████ 100%
Admin Dashboard         ████████████████████ 100%
CRUD News Management    ████████████████████ 100%
Pagination              ████████████████████ 100%
Related Articles        ████████████████████ 100%
Newsletter              ████████████████████ 100%
Static Preview (Vercel) ████████████████████ 100%
Full Stack Deployment   ██████░░░░░░░░░░░░░░  30%
```

**Status: Public preview live on Vercel (dummy data). Full stack deployment in progress.**

---

# Repository

Frontend:

```text
softio-news-web
```

Backend:

```text
softio-news-api
```

---

# Author

**Muhamad Irfan**

Information Systems graduate focused on software engineering and full-stack web development.

---

# License

This project was developed for educational and portfolio purposes.
