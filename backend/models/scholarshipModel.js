// models/Scholarship.js
const mongoose = require("mongoose");

const scholarshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  deadline: {
    type: Date,
    required: true
  },
  sponsorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  requirements: [{
    type: String
  }],
  eligibilityCriteria: {
    type: String,
    required: true
  },
  submissionGuidelines: {
    type: String,
    required: true
  },
  evaluationCriteria: {
    type: String,
    default: ''
  },
  tags: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'completed', 'draft'],
    default: 'active'
  },
  numberOfAwards: {
    type: Number,
    default: 1
  },
  totalBudget: {
    type: Number,
    required: true
  },
  applicants: {
    type: Number,
    default: 0
  },
  approved: {
    type: Number,
    default: 0
  },
  rejected: {
    type: Number,
    default: 0
  },
  pending: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model("Scholarship", scholarshipSchema);
