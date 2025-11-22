# 🚀 Quick Start Guide

## Prerequisites
- Node.js v16+
- PostgreSQL v12+

## 1️⃣ Database Setup (5 minutes)

```bash
# Start PostgreSQL service (if not running)
# Windows: Check Services or run:
# net start postgresql-x64-14

# Create database
psql -U postgres
CREATE DATABASE auth_db;
\q
```

## 2️⃣ Backend Setup (3 minutes)

```bash
cd backend

# Install dependencies (already done)
npm install

# Create .env file
copy .env.example .env

# Edit .env with your PostgreSQL credentials:
# DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/auth_db"

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Start server
npm run dev
```

✅ Backend running on **http://localhost:5000**

## 3️⃣ Frontend Setup (2 minutes)

```bash
cd frontend

# Install dependencies (already done)
npm install

# Start development server
npm run dev
```

✅ Frontend running on **http://localhost:5173**

## 4️⃣ Test the App (1 minute)

1. Open browser: **http://localhost:5173**
2. Click **"Sign Up"**
3. Fill the form:
   - Name: John Doe
   - Email: john@example.com
   - Password: password123
   - Confirm Password: password123
   - Language: English
4. Click **"Create Account"**
5. You'll be auto-logged in and redirected to Dashboard

## 📝 Common Commands

### Backend
```bash
# Development mode (auto-reload)
npm run dev

# Production mode
npm start

# View database in GUI
npm run prisma:studio

# Create new migration
npm run prisma:migrate

# Reset database (deletes all data!)
npx prisma migrate reset
```

### Frontend
```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔍 API Testing

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

### Get Profile (replace TOKEN)
```bash
curl http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🎨 Color Reference

Use these in your custom components:

```css
/* Primary Colors */
--primary-blue: #2563eb;
--mint-primary: #10b981;
--accent-cyan: #06b6d4;

/* Backgrounds */
--bg-primary: #0f172a;
--bg-secondary: #1e293b;

/* Text */
--text-primary: #f8fafc;
--text-secondary: #cbd5e1;

/* Gradients */
--gradient-primary: linear-gradient(135deg, #2563eb 0%, #10b981 100%);
```

## 🐛 Troubleshooting

### "Cannot connect to database"
- Check if PostgreSQL is running
- Verify DATABASE_URL in .env
- Test connection: `psql -U postgres -d auth_db`

### "Port 5000 already in use"
- Change PORT in backend/.env
- Or kill the process: `netstat -ano | findstr :5000`

### "CORS error"
- Ensure backend is running
- Check ALLOWED_ORIGINS in backend/.env
- Clear browser cache

### "Prisma Client not generated"
```bash
cd backend
npm run prisma:generate
```

### "Module not found"
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

## 📂 File Locations

### Environment Config
- Backend: `backend/.env`
- Frontend: No .env needed (uses localhost:5000)

### Database Schema
- Location: `backend/prisma/schema.prisma`
- Migrations: `backend/prisma/migrations/`

### Main Files
- Backend Entry: `backend/server.js`
- Frontend Entry: `frontend/src/main.jsx`
- Auth Logic: `backend/controllers/authController.js`
- Auth Context: `frontend/src/contexts/AuthContext.jsx`

## 🔐 Default Ports

- **Backend API**: 5000
- **Frontend Dev**: 5173
- **PostgreSQL**: 5432
- **Prisma Studio**: 5555

## 📱 Pages

- **Login**: http://localhost:5173/login
- **Register**: http://localhost:5173/register
- **Dashboard**: http://localhost:5173/dashboard (protected)

## ✅ Checklist

Before running:
- [ ] PostgreSQL installed and running
- [ ] Database `auth_db` created
- [ ] Backend .env configured
- [ ] Backend dependencies installed
- [ ] Prisma client generated
- [ ] Migrations run
- [ ] Frontend dependencies installed

## 🎯 Next Steps

1. **Customize the theme**: Edit `frontend/src/index.css`
2. **Add more fields to User**: Edit `backend/prisma/schema.prisma`
3. **Add password reset**: Create new endpoints in authController
4. **Add email verification**: Integrate email service
5. **Add profile editing**: Create update endpoint
6. **Deploy to production**: See README.md for deployment guide

## 📚 Documentation

- **Full Guide**: README.md
- **Directory Structure**: DIRECTORY_STRUCTURE.md
- **Migration Details**: MIGRATION_SUMMARY.md
- **This Guide**: QUICK_START.md

---

**Need help?** Check the full README.md or MIGRATION_SUMMARY.md

**Ready to code!** 🚀
