const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file into process.env

const express = require('express');
const app = express();
const cors = require('cors');
const connectToDb = require('./db/db'); // Import database connection function

// Connect to MongoDB database
connectToDb();

// Route Imports - All API route modules
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const sponserRoutes = require('./routes/sponserRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const institutionalRoutes = require('./routes/institutionalRoutes');
const publicRoutes = require('./routes/publicRoute');
const walletRoutes = require('./routes/walletRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

//  Middleware Configuration
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

//  CORS Configuration - Allow frontend to communicate with backend
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://localhost:3000',
  'https://scholar-bee-ds1l.vercel.app', // ✅ Vercel frontend
  process.env.FRONTEND_URL // Optional fallback from .env
];

const corsOptions = {
  origin: function (origin, callback) {
  if (!origin || allowedOrigins.includes(origin)) {
    callback(null, true);
  } else {
    console.warn('❌ CORS blocked origin:', origin);
    callback(null, false); // 🔁 Allow graceful fail instead of crashing
  }
},
  credentials: true, // Allow cookies and authentication headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token', 'Origin', 'Accept'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // ✅ Handle preflight requests


// ✅ Custom CORS Headers middleware (fixes Render + Vercel issue)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'http://localhost:3000',
    'https://scholar-bee-ds1l.vercel.app',
    process.env.FRONTEND_URL
  ];

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-auth-token, Origin, Accept');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});


//  API Route Mounting - Organize routes by functionality
app.use('/api/auth', authRoutes);                 // Authentication: Login, Register, Forgot Password
app.use('/api/users', userRoutes);               // User Management: Profile, Change Password
app.use('/api/students', studentRoutes);         // Student Features: Dashboard, Applications
app.use('/api/sponsors', sponserRoutes);         // Sponsor Features: Dashboard, Scholarships
app.use('/api/applications', applicationRoutes); // Application Management
app.use('/api/admin', adminRoutes);              // Admin Dashboard & Management
app.use('/api/dashboards', dashboardRoutes);     // NGO and Student Progress Dashboards
app.use('/api/institutional', institutionalRoutes); // College and CSR Portals
app.use('/api/wallet', walletRoutes);            // Student Wallet Management
app.use('/api/payments', paymentRoutes);         // Sponsor Payment Management
app.use('/api', publicRoutes);                   // Public Pages: Landing, About, Contact, Courses

//  Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'ScholarBEE Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173'
  });
});

//  Global Error Handler
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err);
  res.status(500).json({ 
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

//  404 Handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    path: req.originalUrl,
    availableRoutes: [
      '/api/health',
      '/api/auth/*',
      '/api/users/*',
      '/api/students/*',
      '/api/sponsors/*',
      '/api/applications/*',
      '/api/admin/*',
      '/api/dashboards/*',
      '/api/institutional/*'
    ]
  });
});

module.exports = app;
