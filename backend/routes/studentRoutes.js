const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { verifyToken, requireRole } = require('../middleware/auth');

// Get student dashboard data
router.get('/dashboard', verifyToken, requireRole('student'), studentController.getStudentDashboard);

// Get student applications
router.get('/applications', verifyToken, requireRole('student'), studentController.getStudentApplications);

router.post('/apply/:scholarshipId', verifyToken, requireRole('student'), studentController.applyScholarship);

module.exports = router;