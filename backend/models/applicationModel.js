const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  scholarshipId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scholarship',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'in_review', 'funded'],
    default: 'pending'
  },
  essay: {
    type: String,
    required: true
  },
  motivation: {
    type: String,
    required: true
  },
  projectPlan: {
    type: String,
    required: true
  },
  timeline: {
    type: String,
    required: true
  },
  documents: [{
    type: String
  }],
  reviewNotes: {
    type: String
  },
  reviewedAt: {
    type: Date
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  paymentDate: {
    type: Date
  },
  amount: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
