# 🐝 ScholarBEE - Empowering Students Through Scholarships

A modern, full-stack scholarship management platform that connects students with educational opportunities and sponsors.

## 🚀 Features

### 👨‍🎓 For Students
- Browse available scholarships
- Submit applications with essays and documents
- Track application status
- Manage profile and preferences

### 💼 For Sponsors
- Create and manage scholarship programs
- Review and process applications
- Track scholarship performance
- Manage institutional partnerships

### 🏢 For Institutions
- College portal for student management
- CSR portal for corporate social responsibility
- Analytics and reporting tools

### 👨‍💼 For Administrators
- User management and oversight
- System analytics and monitoring
- Content management

## 🏗️ Architecture

```
ScholarBEE/
├── backend/          # Node.js + Express API
├── frontend/         # React + Vite + TypeScript
└── README.md
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **CORS**: Cross-origin resource sharing enabled

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React

## 🚀 Quick Start (Beginner Friendly!)

### Prerequisites
- Node.js (v16 or higher) - [Download here](https://nodejs.org/)
- npm (comes with Node.js)
- MongoDB - [Installation guide](https://docs.mongodb.com/manual/installation/)

### 🎯 Easiest Way to Get Started

**Option 1: Automated Setup (Recommended for Beginners)**
```bash
# Clone the repository
git clone <repository-url>
cd ScholarBEE

# Run the automated setup script
./start-dev.sh
```

This script will:
- ✅ Check if Node.js and npm are installed
- ✅ Check if MongoDB is running
- ✅ Create environment files automatically
- ✅ Install all dependencies
- ✅ Start both frontend and backend servers

**Option 2: Manual Setup**
See detailed instructions in [SETUP_GUIDE.md](./SETUP_GUIDE.md)

### 🌐 Access Your Application
Once everything is running:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Health Check**: http://localhost:3000/api/health

### 🔗 Test Connection
```bash
# Test if backend is working
node test-connection.js
```

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev          # Start with nodemon
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
```

### Frontend Development
```bash
cd frontend
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 🌐 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints
- `POST /auth/login` - User login
- `POST /auth/register/student` - Student registration
- `POST /auth/register/sponsor` - Sponsor registration
- `POST /auth/forgot-password` - Password reset request
- `POST /auth/reset-password` - Password reset

### Student Endpoints
- `GET /students/dashboard` - Get student dashboard
- `GET /students/applications` - Get student applications
- `POST /students/apply/:id` - Apply for scholarship

### Sponsor Endpoints
- `GET /sponsors/dashboard` - Get sponsor dashboard
- `POST /sponsors/scholarships` - Create scholarship
- `GET /sponsors/scholarships` - Get sponsor's scholarships
- `PUT /sponsors/scholarships/:id` - Update scholarship
- `DELETE /sponsors/scholarships/:id` - Delete scholarship

### Admin Endpoints
- `GET /admin/dashboard` - Get admin dashboard
- `GET /admin/users` - Get all users
- `PUT /admin/users/:id/status` - Update user status

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=3000
HOST=localhost
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/scholarbee
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=24h
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=ScholarBEE
VITE_APP_VERSION=1.0.0
```

## 📁 Project Structure

### Backend Structure
```
backend/
├── controllers/     # Request handlers
├── models/         # Database models
├── routes/         # API routes
├── middleware/     # Custom middleware
├── db/            # Database connection
├── utils/         # Utility functions
├── app.js         # Express app configuration
├── server.js      # Server entry point
└── package.json
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── contexts/      # React contexts
│   └── main.jsx       # App entry point
├── public/            # Static assets
└── package.json
```

## 🔍 Troubleshooting

### Common Issues
1. **Port already in use**: Kill the process using `lsof -ti:3000 | xargs kill`
2. **MongoDB not running**: Start MongoDB service
3. **CORS errors**: Check if both servers are running on correct ports
4. **Environment variables**: Make sure `.env` files exist and are configured

### Getting Help
- Check the [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions
- Run `node test-connection.js` to test backend connectivity
- Check console output for error messages

## 📚 Next Steps

1. Explore the codebase structure
2. Check out the API documentation in the route files
3. Try creating a new user account
4. Explore the different user roles (Student, Sponsor, Admin)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Happy coding! 🎉**

For detailed setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md) 