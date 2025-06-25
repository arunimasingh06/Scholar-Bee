const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, requireRole } = require('../middleware/auth');
const { body } = require('express-validator');

router.get('/profile', verifyToken, userController.getProfile);
router.put('/profile', verifyToken, userController.updateProfile);
router.put(
  '/change-password',
  verifyToken,
  [
    body('oldPassword').notEmpty(),
    body('newPassword').isLength({ min: 6 })
  ],
  userController.changePassword
);

module.exports = router;

// user can -
// View their profile
// Edit their profile info (name, phone, institution, etc.)
// Change their password securely
