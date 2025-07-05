const Payment = require('../models/paymentModel');
const Scholarship = require('../models/scholarshipModel');
const xss = require('xss');

// Create payment for scholarship
exports.createPayment = async (req, res) => {
  try {
    const { scholarshipId, paymentMethod, paymentDetails } = req.body;
    
    if (!scholarshipId || !paymentMethod || !paymentDetails) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Verify scholarship exists and belongs to sponsor
    const scholarship = await Scholarship.findOne({
      _id: scholarshipId,
      sponsorId: req.user.id
    });

    if (!scholarship) {
      return res.status(404).json({
        success: false,
        message: 'Scholarship not found'
      });
    }

    // Calculate total amount
    const totalAmount = scholarship.amount * scholarship.numberOfAwards;

    // Validate payment method and details
    let paymentData = {
      sponsorId: req.user.id,
      scholarshipId: scholarshipId,
      amount: totalAmount,
      paymentMethod: xss(paymentMethod),
      description: `Payment for scholarship: ${scholarship.title}`,
      metadata: new Map()
    };

    // Add payment method specific details
    switch (paymentMethod) {
      case 'upi':
        if (!paymentDetails.upiId || !paymentDetails.upiId.includes('@')) {
          return res.status(400).json({
            success: false,
            message: 'Please provide a valid UPI ID'
          });
        }
        paymentData.upiId = xss(paymentDetails.upiId);
        break;

      case 'card':
        if (!paymentDetails.cardNumber || !paymentDetails.expiryMonth || !paymentDetails.expiryYear || !paymentDetails.cvv) {
          return res.status(400).json({
            success: false,
            message: 'Please provide complete card details'
          });
        }
        paymentData.cardDetails = {
          last4: paymentDetails.cardNumber.slice(-4),
          brand: paymentDetails.brand || 'Unknown'
        };
        paymentData.metadata.set('cardNumber', paymentDetails.cardNumber);
        paymentData.metadata.set('expiryMonth', paymentDetails.expiryMonth);
        paymentData.metadata.set('expiryYear', paymentDetails.expiryYear);
        break;

      case 'netbanking':
        if (!paymentDetails.bankName || !paymentDetails.accountNumber) {
          return res.status(400).json({
            success: false,
            message: 'Please provide bank details'
          });
        }
        paymentData.bankDetails = {
          bankName: xss(paymentDetails.bankName),
          accountNumber: xss(paymentDetails.accountNumber)
        };
        break;

      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid payment method'
        });
    }

    // Create payment record
    const payment = new Payment(paymentData);
    await payment.save();

    // Simulate payment processing (in real app, integrate with payment gateway)
    setTimeout(async () => {
      try {
        payment.status = 'completed';
        payment.processedAt = new Date();
        await payment.save();

        // Update scholarship status to active only after successful payment
        scholarship.status = 'active';
        scholarship.paymentStatus = 'paid';
        await scholarship.save();

        console.log(`Payment ${payment.transactionId} completed for scholarship ${scholarship.title}`);
      } catch (error) {
        console.error('Error processing payment:', error);
        // If payment fails, keep scholarship as draft
        payment.status = 'failed';
        await payment.save();
      }
    }, 2000); // Simulate 2 second processing time

    res.json({
      success: true,
      message: 'Payment initiated successfully',
      payment: {
        id: payment._id,
        transactionId: payment.transactionId,
        amount: payment.amount,
        status: payment.status,
        paymentMethod: payment.paymentMethod
      }
    });

  } catch (err) {
    console.error('❌ Create payment error:', err);
    res.status(500).json({ success: false, message: 'Failed to create payment' });
  }
};

// Get payment status
exports.getPaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findOne({
      _id: paymentId,
      sponsorId: req.user.id
    }).populate('scholarshipId', 'title amount numberOfAwards');

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    res.json({
      success: true,
      payment: {
        id: payment._id,
        transactionId: payment.transactionId,
        amount: payment.amount,
        status: payment.status,
        paymentMethod: payment.paymentMethod,
        description: payment.description,
        createdAt: payment.createdAt,
        processedAt: payment.processedAt,
        scholarship: payment.scholarshipId
      }
    });

  } catch (err) {
    console.error('❌ Get payment status error:', err);
    res.status(500).json({ success: false, message: 'Failed to get payment status' });
  }
};

// Get sponsor's payment history
exports.getPaymentHistory = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    let query = { sponsorId: req.user.id };
    if (status && ['pending', 'processing', 'completed', 'failed', 'refunded'].includes(status)) {
      query.status = status;
    }

    const payments = await Payment.find(query)
      .populate('scholarshipId', 'title amount numberOfAwards category')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Payment.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      payments: payments.map(payment => ({
        id: payment._id,
        transactionId: payment.transactionId,
        amount: payment.amount,
        status: payment.status,
        paymentMethod: payment.paymentMethod,
        description: payment.description,
        createdAt: payment.createdAt,
        processedAt: payment.processedAt,
        scholarship: payment.scholarshipId
      })),
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalPayments: total,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });

  } catch (err) {
    console.error('❌ Get payment history error:', err);
    res.status(500).json({ success: false, message: 'Failed to get payment history' });
  }
};

// Process payment (simulate payment gateway)
exports.processPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findOne({
      _id: paymentId,
      sponsorId: req.user.id,
      status: 'pending'
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found or already processed'
      });
    }

    // Simulate payment processing
    payment.status = 'processing';
    await payment.save();

    // Simulate processing delay
    setTimeout(async () => {
      try {
        // Simulate 90% success rate
        const isSuccess = Math.random() > 0.1;
        
        if (isSuccess) {
          payment.status = 'completed';
          payment.processedAt = new Date();
          
          // Update scholarship status
          const scholarship = await Scholarship.findById(payment.scholarshipId);
          if (scholarship) {
            scholarship.status = 'active';
            scholarship.paymentStatus = 'paid';
            await scholarship.save();
          }
        } else {
          payment.status = 'failed';
          payment.failureReason = 'Payment gateway error';
        }
        
        await payment.save();
        console.log(`Payment ${payment.transactionId} ${payment.status}`);
      } catch (error) {
        console.error('Error processing payment:', error);
      }
    }, 3000);

    res.json({
      success: true,
      message: 'Payment processing initiated',
      payment: {
        id: payment._id,
        transactionId: payment.transactionId,
        status: payment.status
      }
    });

  } catch (err) {
    console.error('❌ Process payment error:', err);
    res.status(500).json({ success: false, message: 'Failed to process payment' });
  }
};

// Get payment statistics
exports.getPaymentStats = async (req, res) => {
  try {
    const stats = await Payment.aggregate([
      { $match: { sponsorId: req.user._id } },
      {
        $group: {
          _id: null,
          totalPayments: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
          completedPayments: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          completedAmount: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, '$amount', 0] }
          },
          pendingPayments: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
          },
          failedPayments: {
            $sum: { $cond: [{ $eq: ['$status', 'failed'] }, 1, 0] }
          }
        }
      }
    ]);

    const monthlyStats = await Payment.aggregate([
      { $match: { sponsorId: req.user._id, status: 'completed' } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          amount: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 6 }
    ]);

    res.json({
      success: true,
      stats: stats[0] || {
        totalPayments: 0,
        totalAmount: 0,
        completedPayments: 0,
        completedAmount: 0,
        pendingPayments: 0,
        failedPayments: 0
      },
      monthlyStats
    });

  } catch (err) {
    console.error('❌ Get payment stats error:', err);
    res.status(500).json({ success: false, message: 'Failed to get payment statistics' });
  }
}; 