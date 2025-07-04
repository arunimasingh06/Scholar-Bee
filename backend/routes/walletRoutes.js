const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');
const { verifyToken, requireRole } = require('../middleware/auth');
const { body } = require('express-validator');

// All routes require authentication and student role
router.use(verifyToken);
router.use(requireRole('student'));

// Get student wallet
router.get('/', walletController.getWallet);

// Update UPI ID
router.put('/upi', [
  body('upiId').notEmpty().withMessage('UPI ID is required')
], walletController.updateUpiId);

// Get transaction history
router.get('/transactions', walletController.getTransactions);

// Withdraw funds
router.post('/withdraw', [
  body('amount').isNumeric().withMessage('Amount must be a number')
], walletController.withdrawFunds);

// Credit wallet (for sponsors when approving applications)
router.post('/credit', [
  body('applicationId').notEmpty().withMessage('Application ID is required'),
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('description').notEmpty().withMessage('Description is required')
], walletController.creditWallet);

// Get wallet statistics
router.get('/stats', walletController.getWalletStats);

module.exports = router; 