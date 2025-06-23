const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { verifyToken, requireRole } = require('../middlewares/auth');

router.get('/dashboard', verifyToken, requireRole('student'), studentController.getDashboard);
router.get('/applications', verifyToken, requireRole('student'), studentController.getApplications);
router.post('/apply/:scholarshipId', verifyToken, requireRole('student'), studentController.applyScholarship);

module.exports = router;