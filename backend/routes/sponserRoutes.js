const express = require('express');
const router = express.Router();
const sponsorController = require('../backend/controllers/sponsorController');
const { verifyToken, requireRole } = require('../middlewares/auth');
const { body } = require('express-validator');

// Add at the bottom of sponsorRoutes.js
router.get('/profile', verifyToken, requireRole('sponsor'), sponsorController.getProfile);
router.put('/profile', verifyToken, requireRole('sponsor'), sponsorController.updateProfile);


router.get('/dashboard', verifyToken, requireRole('sponsor'), sponsorController.getDashboard);
router.get('/scholarships', verifyToken, requireRole('sponsor'), sponsorController.listScholarships);
router.post(
  '/create',
  verifyToken,
  requireRole('sponsor'),
  [
    body('title').notEmpty(),
    body('amountPerStudent').isNumeric(),
    body('numberOfAwards').isNumeric(),
    body('deadline').notEmpty()
  ],
  sponsorController.createScholarship
);
router.put('/scholarships/:id', verifyToken, requireRole('sponsor'), sponsorController.updateScholarship);
router.patch('/scholarships/:id/close', verifyToken, requireRole('sponsor'), sponsorController.closeScholarship);

router.get('/applications/:id', verifyToken, requireRole('sponsor'), sponsorController.getApplications);
router.patch('/applications/:id/decision', verifyToken, requireRole('sponsor'), sponsorController.decideApplication);

module.exports = router;
