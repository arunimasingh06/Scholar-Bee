# 🎓 ScholarBEE Setup Guide for Beginners

Welcome to ScholarBEE! This guide will help you get both the frontend and backend running on your computer.

## 📋 Prerequisites

Before you start, make sure you have these installed:

1. **Node.js** (version 16 or higher)
   - Download from: https://nodejs.org/
   - To check if installed: `node --version`

2. **npm** (comes with Node.js)
   - To check if installed: `npm --version`

3. **MongoDB** (for the database)
   - **macOS**: `brew install mongodb-community`
   - **Windows**: Download from https://www.mongodb.com/try/download/community
   - **Linux**: `sudo apt install mongodb`

## 🚀 Quick Start (Recommended)

The easiest way to get started is using our automated script:

```bash
# Make sure you're in the ScholarBEE folder
cd /path/to/ScholarBEE

# Run the startup script
./start-dev.sh
```

This script will:
- ✅ Check if Node.js and npm are installed
- ✅ Check if MongoDB is running
- ✅ Create environment files automatically
- ✅ Install all dependencies
- ✅ Start both frontend and backend servers

## 🔧 Manual Setup

If you prefer to set up manually or the script doesn't work:

### Step 1: Set up Environment Files

**Backend:**
```bash
cd backend
cp env.development .env
```

**Frontend:**
```bash
cd frontend
cp env.development .env
```

### Step 2: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 3: Start MongoDB

**macOS:**
```bash
brew services start mongodb-community
```

**Windows:**
- Start MongoDB service from Services

**Linux:**
```bash
sudo systemctl start mongod
```

### Step 4: Start the Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## 🌐 Access Your Application

Once everything is running:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Health Check**: http://localhost:3000/api/health

## 📁 Project Structure

```
ScholarBEE/
├── backend/          # Node.js/Express API server
│   ├── controllers/  # API logic
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   └── middleware/   # Authentication & validation
├── frontend/         # React/Vite application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   └── services/    # API calls
│   └── public/          # Static files
└── start-dev.sh      # Quick start script
```

## 🔍 Troubleshooting

### Port Already in Use
If you see "port already in use" errors:
- Backend (3000): Kill the process using `lsof -ti:3000 | xargs kill`
- Frontend (5173): Kill the process using `lsof -ti:5173 | xargs kill`

### MongoDB Connection Issues
- Make sure MongoDB is running
- Check if the connection string in `backend/.env` is correct
- Default: `mongodb://localhost:27017/scholarbee`

### CORS Errors
- The backend is configured to allow requests from `http://localhost:5173`
- Make sure both servers are running on the correct ports

### Environment Variables
- If you change `.env` files, restart the servers
- Never commit `.env` files to git (they're in `.gitignore`)

## 🛠️ Development Tips

1. **Backend Development:**
   - API endpoints are in `backend/routes/`
   - Business logic is in `backend/controllers/`
   - Database models are in `backend/models/`

2. **Frontend Development:**
   - Pages are in `frontend/src/pages/`
   - Components are in `frontend/src/components/`
   - API calls are in `frontend/src/services/api.js`

3. **API Testing:**
   - Use the health check: http://localhost:3000/api/health
   - Use tools like Postman or Thunder Client (VS Code extension)

## 📚 Next Steps

1. Explore the codebase structure
2. Check out the API documentation in the route files
3. Try creating a new user account
4. Explore the different user roles (Student, Sponsor, Admin)

## 🆘 Need Help?

If you encounter issues:
1. Check the console output for error messages
2. Make sure all prerequisites are installed
3. Verify MongoDB is running
4. Check that environment files are created correctly

Happy coding! 🎉 