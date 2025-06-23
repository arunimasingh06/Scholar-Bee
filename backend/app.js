const dotenv = require('dotenv');
dotenv.config(); // this loads environment variables from a .env file into process.env
const express = require('express');
const app = express();
const cors = require('cors');
const connectToDb = require('./db/db'); // Import the database connection function
connectToDb(); // Connect to the MongoDB database

// 📦 Route Imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const sponsorRoutes = require('./routes/sponsorRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const institutionalRoutes = require('./routes/institutionalRoutes');
const publicRoutes = require('./routes/publicRoutes');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS for all routes

// 🚀 Route Mounting
app.use('/api/auth', authRoutes);                 // Login, Register, Forgot Password
app.use('/api/users', userRoutes);               // Profile, Change Password

app.use('/api/students', studentRoutes);         // Student dashboard, applications
app.use('/api/sponsors', sponsorRoutes);         // Sponsor dashboard, scholarships
app.use('/api/applications', applicationRoutes); // Application management

app.use('/api/admin', adminRoutes);              // Admin dashboard
app.use('/api/dashboards', dashboardRoutes);     // NGO and Student Progress dashboards
app.use('/api/institutional', institutionalRoutes); // College and CSR portals

app.use('/api', publicRoutes);                   // Landing, About, Contact, Courses



module.exports = app;
// This is the main entry point for the backend server.
// It sets up an Express server that listens on port 4000.
// The server responds to GET requests at the root URL with a welcome message