const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { body } = require('express-validator');

// Student Signup
router.post(
  '/student/signup',
  [
    body('fullname').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('institution').notEmpty(),
    body('educationLevel').notEmpty(),
    body('gpa').notEmpty(),
    body('familyIncome').notEmpty()
  ],
  authController.registerStudent
);

// Sponsor Signup
router.post(
  '/sponsor/signup',
  [
    body('fullname').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('organizationType').notEmpty(),
    body('organizationName').notEmpty()
  ],
  authController.registerSponsor
);

// Common Login (student/sponsor)
router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').notEmpty()
  ],
  authController.login
);

// Forgot Password (sends email)
router.post(
  '/forgot-password',
  [body('email').isEmail()],
  authController.forgotPassword
);

// Reset Password using token
router.post(
  '/reset-password',
  [
    body('token').notEmpty(),
    body('newPassword').isLength({ min: 6 })
  ],
  authController.resetPassword
);

module.exports = router;
