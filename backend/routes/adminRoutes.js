const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, requireRole } = require('../middlewares/auth');

// Admin Dashboard Overview
router.get('/dashboard', verifyToken, requireRole('admin'), adminController.getAdminDashboard);

module.exports = router;
