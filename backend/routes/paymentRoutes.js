const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { verifyToken, requireRole } = require('../middleware/auth');
const { body } = require('express-validator');

// All routes require authentication and sponsor role
router.use(verifyToken);
router.use(requireRole('sponsor'));

// Create payment for scholarship
router.post('/create', [
  body('scholarshipId').notEmpty().withMessage('Scholarship ID is required'),
  body('paymentMethod').isIn(['upi', 'card', 'netbanking', 'wallet']).withMessage('Invalid payment method'),
  body('paymentDetails').isObject().withMessage('Payment details are required')
], paymentController.createPayment);

// Get payment status
router.get('/status/:paymentId', paymentController.getPaymentStatus);

// Get sponsor's payment history
router.get('/history', paymentController.getPaymentHistory);

// Process payment (simulate payment gateway)
router.post('/process/:paymentId', paymentController.processPayment);

// Get payment statistics
router.get('/stats', paymentController.getPaymentStats);

module.exports = router; 