# Defense Coaching Center & IQ Test Platform

A professional full-stack web application for a Defense Coaching Center with an integrated IQ Test Platform.

## Features

- 🎯 **Public Landing Pages** - Modern, responsive UI/UX with SEO optimization
- 👤 **User Authentication** - Secure JWT-based login with role-based access control
- 📝 **IQ Testing System** - Timed tests with 100 questions and 30-minute duration
- 💳 **Payment Integration** - Manual bKash payment verification (API integration planned)
- 🎓 **Free Sample Test** - 20-question demo available to all visitors
- 🛡️ **Advanced Security** - One-device-per-user restriction, password hashing, rate limiting
- 👨‍💼 **Admin Portal** - Comprehensive question management, user management, and analytics
- 📊 **Results & Analytics** - Detailed performance tracking and reporting

## Tech Stack

### Frontend
- **Framework:** Next.js 14+ with TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Forms:** React Hook Form
- **API Client:** Axios

### Backend
- **Framework:** Django 5.x + Django REST Framework
- **Database:** PostgreSQL 15+
- **Authentication:** JWT (djangorestframework-simplejwt)
- **Password Hashing:** Argon2

### DevOps
- **Containerization:** Docker & Docker Compose
- **CI/CD:** GitHub Actions
- **Frontend Hosting:** Vercel
- **Backend Hosting:** Render/Railway
- **Database:** Managed PostgreSQL (Neon/Supabase)

## Quick Start

### Local Development with Docker

1. **Set up environment variables**
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env.local
   ```

2. **Start all services**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/api/docs/

### Local Development without Docker

#### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements/development.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

#### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

## Environment Variables

### Backend (.env)
```env
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://user:password@localhost:5432/online_edu
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Security Features

- ✅ JWT-based authentication with refresh tokens
- ✅ Password hashing with Argon2
- ✅ One-device-per-user restriction
- ✅ Rate limiting on authentication endpoints
- ✅ CORS policy enforcement
- ✅ Input validation and sanitization
- ✅ Backend timer enforcement to prevent cheating
- ✅ HTTPS enforcement in production

## License

Proprietary - All rights reserved
