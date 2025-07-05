const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  sponsorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  scholarshipId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scholarship',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  paymentMethod: {
    type: String,
    enum: ['upi', 'card', 'netbanking', 'wallet'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    unique: true,
    index: true
  },
  upiId: {
    type: String
  },
  cardDetails: {
    last4: String,
    brand: String
  },
  bankDetails: {
    bankName: String,
    accountNumber: String
  },
  description: {
    type: String,
    required: true
  },
  metadata: {
    type: Map,
    of: String
  },
  failureReason: {
    type: String
  },
  processedAt: {
    type: Date
  },
  refundedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for better query performance
paymentSchema.index({ sponsorId: 1, createdAt: -1 });
paymentSchema.index({ scholarshipId: 1 });
paymentSchema.index({ status: 1 });

// Generate transaction ID
paymentSchema.pre('save', function(next) {
  if (!this.transactionId) {
    this.transactionId = `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }
  next();
});

module.exports = mongoose.model('Payment', paymentSchema); 