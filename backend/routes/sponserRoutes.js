const express = require('express');
const router = express.Router();
const sponsorController = require('../controllers/sponserController');
const { verifyToken, requireRole } = require('../middleware/auth');
const { body } = require('express-validator');

// Profile routes
router.get('/profile', verifyToken, requireRole('sponsor'), sponsorController.getProfile);
router.put('/profile', verifyToken, requireRole('sponsor'), sponsorController.updateProfile);

// Dashboard route
router.get('/dashboard', verifyToken, requireRole('sponsor'), sponsorController.getSponsorDashboard);

// Scholarship routes
router.get('/scholarships', verifyToken, requireRole('sponsor'), sponsorController.getSponsorScholarships);
router.post(
  '/scholarships/create',
  verifyToken,
  requireRole('sponsor'),
  [
    body('title').notEmpty(),
    body('amount').isNumeric(),
    body('numberOfAwards').isNumeric(),
    body('deadline').notEmpty()
  ],
  sponsorController.createScholarship
);
router.delete('/scholarships/:id/draft', verifyToken, requireRole('sponsor'), sponsorController.deleteDraftScholarship);
router.patch('/scholarships/:id/close', verifyToken, requireRole('sponsor'), sponsorController.closeScholarship);
router.put('/scholarships/:id', verifyToken, requireRole('sponsor'), sponsorController.updateScholarship);
router.get('/scholarships/:id', verifyToken, requireRole('sponsor'), sponsorController.getScholarshipById);

// Application routes
router.get('/scholarships/:scholarshipId/applications', verifyToken, requireRole('sponsor'), sponsorController.getScholarshipApplications);
router.patch('/applications/:id/decision', verifyToken, requireRole('sponsor'), sponsorController.decideApplication);

module.exports = router;
