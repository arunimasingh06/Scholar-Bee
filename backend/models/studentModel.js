const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
 },
  gpa: Number,

  institution: String,

  income: Number,

  profilePic: String,

  resumeLink: String
});

module.exports = mongoose.model('student', studentSchema);