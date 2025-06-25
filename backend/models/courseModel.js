const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  students: {
    type: Number,
    default: 0
  },
  price: {
    type: String,
    default: 'Free'
  },
  image: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }],
  scholarshipAvailable: {
    type: Boolean,
    default: true
  },
  scholarshipAmount: {
    type: Number,
    default: 0
  },
  link: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft'],
    default: 'active'
  }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema); 