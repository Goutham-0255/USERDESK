Let's create the README. Create a new file called `README.md` in the root `userdesk/` folder and paste this:

```markdown
# UserDesk 📋

A full-stack Single Page Application (SPA) built with Angular 21 and Node.js for user management and announcements.

---

## 🚀 Live Demo

> Coming soon after deployment

**Test Credentials:**

| Role | User ID | Password |
|------|---------|----------|
| Admin | admin001 | Admin@123 |
| General User | user001 | User@123 |

---

## 📌 Features

### General User
- Secure login with JWT authentication
- Personal profile card with user details
- Announcements table — real-time data from API

### Admin
- Everything a General User has
- User Activity Log — tracks all login activity with timestamps
- Admin Panel — full user management (add, edit, delete)
- Announcement management — create and delete announcements

### Technical Highlights
- **SPA** — Single Page Application, no full page reloads
- **Async processing** — RxJS `forkJoin` fires multiple API calls simultaneously on dashboard load
- **Delay parameter** — API supports `?delay=ms` to simulate real-world latency
- **Skeleton loaders** — smooth loading experience instead of blank screens
- **Route Guards** — unauthorized users cannot access protected routes
- **JWT Interceptor** — automatically attaches auth token to every API call
- **Lazy loading** — Admin module only loads when Admin visits the page
- **Modular architecture** — separate modules and services for each feature

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| Angular 21 | SPA Framework |
| TypeScript | Language |
| Angular Material | UI Components |
| RxJS | Async/Reactive programming |
| Angular Router | SPA Navigation |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | REST API Framework |
| TypeScript | Language |
| JWT | Authentication |
| Bcrypt | Password hashing |

### Database
| Technology | Purpose |
|------------|---------|
| MongoDB Atlas | Cloud Database |
| Mongoose | ODM |

---

## 📁 Project Structure

```
userdesk/
├── frontend/                   # Angular SPA
│   └── src/app/
│       ├── core/               # Guards, Interceptors, Auth Service
│       ├── shared/             # Models, Reusable components
│       └── modules/
│           ├── auth/           # Login page
│           ├── dashboard/      # Dashboard + Services
│           └── admin/          # Admin Panel (lazy loaded)
│
└── backend/                    # Node.js + Express API
    └── src/
        ├── models/             # MongoDB Schemas
        ├── controllers/        # Business Logic
        ├── routes/             # API Endpoints
        ├── middleware/         # JWT verification
        └── seed/               # Database seeding
```

---

## 🔌 API Endpoints

```
POST   /api/auth/login              # Login, returns JWT
GET    /api/users/me                # Get logged in user details
GET    /api/records?delay=2000      # Get announcements (with optional delay)
GET    /api/activity                # Get activity logs
GET    /api/admin/users             # Get all users (Admin only)
POST   /api/admin/users             # Add new user (Admin only)
PUT    /api/admin/users/:id         # Edit user (Admin only)
DELETE /api/admin/users/:id         # Delete user (Admin only)
POST   /api/admin/announcements     # Create announcement (Admin only)
DELETE /api/admin/announcements/:id # Delete announcement (Admin only)
```

---

## ⚙️ Running Locally

### Prerequisites
- Node.js v18+
- Angular CLI (`npm install -g @angular/cli`)
- MongoDB Atlas account

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:
```
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
PORT=3000
```

Seed the database:
```bash
npm run seed
```

Start the backend:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
ng serve
```

Open `http://localhost:4200` in your browser.

---

## 🔐 Security

- Passwords are hashed using **Bcrypt** — never stored as plain text
- All protected routes require a valid **JWT token**
- **Role-based access** — Admin routes are blocked for General Users on both frontend and backend
- JWT token automatically expires after **1 day**

---

## 💡 Design Decisions

- **MongoDB Atlas** chosen over local storage for real-world cloud database experience
- **Activity logs** are recorded dynamically on every login — not dummy data
- **forkJoin** used for parallel API calls on dashboard load — demonstrates async programming
- **Lazy loading** on Admin module — improves initial load performance
- **Standalone components** used throughout — follows latest Angular best practices

