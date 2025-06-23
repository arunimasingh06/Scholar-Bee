const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { verifyToken, requireRole } = require('../middlewares/auth');

// NGO Dashboard
router.get('/ngo', verifyToken, requireRole('sponsor'), dashboardController.getNGODashboard);

// Student Progress Dashboard
router.get('/student-progress', verifyToken, requireRole('admin'), dashboardController.getStudentProgress);

module.exports = router;
