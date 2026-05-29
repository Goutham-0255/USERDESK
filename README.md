# UserDesk 📋


A full-stack **Single Page Application** built with **Angular 21** and **Node.js + TypeScript**, featuring role-based authentication, async data loading, and a cloud-deployed backend.

---

## 🔗 Live Demo

**[https://userdesk-black.vercel.app](https://userdesk-black.vercel.app)**

| Role | User ID | Password |
|------|---------|----------|
| Admin | user005 | admin123 |
| General User | user006 | user123
---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 21, TypeScript, Angular Material, RxJS |
| Backend | Node.js, Express.js, TypeScript |
| Database | MongoDB Atlas (Cloud) |
| Auth | JWT + Bcrypt |
| Deployment | Vercel (Frontend) + Render (Backend) |

---

## 📌 Features

### General User
- JWT secured login
- Profile card showing name, email, user ID and role
- Announcements table — data fetched live from API

### Admin
- Everything a General User has
- User Activity Log — real login timestamps recorded dynamically
- Admin Panel — add, edit and delete users
- Announcement management — create announcements visible to all users

### Technical Highlights
- Role-based route guards on both frontend and backend
- RxJS `forkJoin` fires multiple API calls simultaneously on dashboard load
- `?delay` parameter on records API to demonstrate async processing
- Skeleton loaders for smooth loading experience
- JWT Interceptor automatically attaches token to every API call
- Admin module is lazy loaded — only downloaded when Admin visits
- Standalone Angular components throughout

---

## 📁 Project Structure

```
userdesk/
├── frontend/                   # Angular SPA
│   └── src/app/
│       ├── core/               # Auth guard, Role guard, JWT interceptor
│       ├── shared/             # TypeScript models
│       └── modules/
│           ├── auth/           # Login page
│           ├── dashboard/      # Dashboard + Services
│           └── admin/          # Admin panel (lazy loaded)
│
└── backend/                    # Node.js + Express API
    └── src/
        ├── models/             # MongoDB schemas
        ├── controllers/        # Business logic
        ├── routes/             # API endpoint definitions
        ├── middleware/         # JWT + role verification
        └── seed/               # Database seeding script
```

---

## 🔌 API Endpoints

```
POST   /api/auth/login                   Login, returns JWT token
GET    /api/users/me                     Get logged in user details
GET    /api/records?delay=2000           Get announcements with optional delay
GET    /api/activity                     Get activity logs
GET    /api/admin/users                  Get all users (Admin only)
POST   /api/admin/users                  Add new user (Admin only)
PUT    /api/admin/users/:id              Edit user (Admin only)
DELETE /api/admin/users/:id              Delete user (Admin only)
POST   /api/admin/announcements          Create announcement (Admin only)
DELETE /api/admin/announcements/:id      Delete announcement (Admin only)
```

---

## ⚙️ Running Locally

### Backend
```bash
cd backend
npm install
```

Create `.env` file in `backend/`:
```
MONGO_URI=Mongodb uri
JWT_SECRET= JWT secret
```

```bash
npm run seed
npm run dev
```

### Frontend
```bash
cd frontend
npm install --legacy-peer-deps
ng serve
```

Open `http://localhost:4200`

---

## 🔐 Security

- Passwords hashed with **Bcrypt** — never stored as plain text
- All API routes protected with **JWT middleware**
- Admin routes blocked on both frontend (route guard) and backend (role middleware)
- JWT tokens expire after **1 day**

---

## 💡 Key Design Decisions

- **MongoDB Atlas** — cloud database to demonstrate real-world deployment knowledge
- **Activity logs recorded dynamically** — real login timestamps, not hardcoded dummy data
- **forkJoin for parallel API calls** — demonstrates proper async programming with RxJS
- **Lazy loading on Admin module** — improves app performance
- **Standalone components** — follows the latest Angular 17+ best practices

---
