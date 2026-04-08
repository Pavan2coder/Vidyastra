# Vidyastra — The Modern Gurukul

> *"Vidya Dadati Vinayam"* — Knowledge gives discipline.

A full-stack educational platform that bridges ancient Indian wisdom with modern learning. Vidyastra connects students, teachers (Gurus), and mentors (Saarthis) on a single platform built with Node.js, Express, and vanilla HTML/CSS/JS.

---

## Live Demo

Run locally at `http://localhost:5000` after following the setup steps below.

---

## Features

### For Students (Shishya)
- Browse and watch real video courses (YouTube embeds via freeCodeCamp)
- Track course progress module by module
- AI Solver Agent — ask any question, get instant answers
- Doubt Solver — subject-specific help (HTML, CSS, JS, Maths, Physics)
- Connect with mentors for 1-on-1 guidance sessions
- Personal profile management

### For Teachers (Guru)
- Create, edit, and delete courses
- Upload course content and manage modules
- View student enrollment and course performance analytics
- Classroom discussion threads

### For Mentors (Saarthi)
- Book and manage mentorship sessions
- View mentee progress and growth
- Accept/reject session requests

### Platform
- JWT authentication (login & signup)
- Single unified login/signup page with role tabs (Student / Guru / Saarthi)
- Dark mode + 4 themes (Default, Vedic Warm, Modern, Academic)
- 3 font options
- Fully responsive design
- REST API with MVC architecture

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Auth | JWT (jsonwebtoken), bcryptjs |
| Data | In-memory arrays (no database) |
| Styling | Custom CSS with CSS variables & themes |
| Videos | YouTube iframe embeds (freeCodeCamp) |

---

## Project Structure

```
Vidyastra/
├── frontend/                  # All HTML pages + assets
│   ├── css/
│   │   ├── style.css          # Main design system
│   │   └── splash-theme.css   # Entry/splash page styles
│   ├── js/
│   │   ├── api.js             # API client (fetch wrapper)
│   │   ├── login.js           # Login handler
│   │   ├── signup.js          # Signup handler
│   │   ├── profile.js         # Profile page logic
│   │   ├── courses.js         # Courses page logic
│   │   ├── teacher.js         # Teacher dashboard logic
│   │   ├── mentor.js          # Mentor sessions logic
│   │   └── main.js            # Appearance panel + animations
│   ├── login.html             # Unified login (all 3 roles)
│   ├── signup.html            # Unified signup (all 3 roles)
│   ├── learning-home.html     # Student dashboard
│   ├── teacher-home.html      # Teacher dashboard
│   ├── mentor-home.html       # Mentor dashboard
│   ├── course-player.html     # Video player + AI/Doubt solver
│   ├── courses.html           # Course catalog
│   ├── profile.html           # User profile
│   ├── choose-path.html       # Role selection
│   └── ...                    # Other pages
│
└── backend/                   # Express API server
    ├── server.js              # Entry point
    ├── .env                   # Environment variables (not committed)
    ├── data/
    │   └── store.js           # In-memory dummy data
    ├── controllers/
    │   ├── authController.js  # Login & signup logic
    │   ├── userController.js  # User profile CRUD
    │   ├── courseController.js# Course CRUD
    │   └── mentorController.js# Mentor sessions CRUD
    ├── middleware/
    │   ├── auth.js            # JWT protect + role authorize
    │   └── errorHandler.js    # Global error handler
    └── routes/
        ├── authRoutes.js
        ├── userRoutes.js
        ├── courseRoutes.js
        └── mentorRoutes.js
```

---

## Getting Started

### Prerequisites
- Node.js v18+ 
- npm v9+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Pavan2coder/Vidyastra.git
cd Vidyastra

# 2. Install backend dependencies
cd backend
npm install

# 3. Create environment file
echo PORT=5000 > .env
echo JWT_SECRET=vidyastra_secret_key_2026 >> .env
echo JWT_EXPIRES_IN=7d >> .env

# 4. Start the server
npm start
```

### Open in Browser

```
http://localhost:5000
```

The backend serves the frontend statically — one command runs everything.

---

## API Reference

### Auth (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login, returns JWT |

### Users (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Get own profile |
| PUT | `/api/users/profile` | Update own profile |
| GET | `/api/users` | List all users (teacher/mentor only) |
| GET | `/api/users/:id` | Get user by ID |
| DELETE | `/api/users/:id` | Delete user |

### Courses (Public GET, Protected POST/PUT/DELETE)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/courses` | List all courses |
| GET | `/api/courses/:id` | Get course by ID |
| POST | `/api/courses` | Create course (teacher only) |
| PUT | `/api/courses/:id` | Update course (teacher only) |
| DELETE | `/api/courses/:id` | Delete course (teacher only) |

### Mentors (Public GET, Protected sessions)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/mentors` | List all mentors |
| GET | `/api/mentors/sessions` | My sessions |
| POST | `/api/mentors/sessions` | Book session (student only) |
| PUT | `/api/mentors/sessions/:id` | Update session |
| DELETE | `/api/mentors/sessions/:id` | Cancel session |

For protected routes, include:
```
Authorization: Bearer <token>
```

---

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Student | arjun@vidyastra.in | password123 |
| Teacher | priya@vidyastra.in | password123 |
| Mentor | ravi@vidyastra.in | password123 |

> Note: Data resets on server restart (in-memory store).

---

## Pages Overview

| Page | URL | Description |
|------|-----|-------------|
| Splash | `/` | Auto-redirects to home |
| Home | `/home.html` | Landing page |
| Choose Path | `/choose-path.html` | Role selection |
| Login | `/login.html` | Unified login (all roles) |
| Sign Up | `/signup.html` | Unified signup (all roles) |
| Student Dashboard | `/learning-home.html` | Student home |
| Teacher Dashboard | `/teacher-home.html` | Teacher home |
| Mentor Dashboard | `/mentor-home.html` | Mentor home |
| Course Player | `/course-player.html` | Video + AI solver |
| Courses | `/courses.html` | Course catalog |
| Profile | `/profile.html` | User profile |
| Mentor Connect | `/mentor-connect.html` | Find mentors |
| Create Course | `/create-course.html` | Teacher course creation |

---

## Themes & Appearance

The platform supports 4 visual themes and 2 font options, all switchable via the Appearance panel (top-right on every page):

- **Default Light** — Warm parchment tones
- **Vedic Warm** — Deep saffron accents
- **Modern Minimal** — Clean blue palette
- **Academic Calm** — Teal scholarly feel
- **Dark Mode** — Full dark mode across all themes

---

## License

MIT License — free to use, modify, and distribute.

---

*Built with purpose for seekers of wisdom. — Vidyastra 2026*
