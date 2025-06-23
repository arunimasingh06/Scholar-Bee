const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fullname: {
     type: String, 
     required: true
     },
  email: { 
    type: String,
    required: true, 
    unique: true
     },
  password: {
    type: String, 
    required: true
  },
  role: {
    type: String, 
    enum: ['student', 'sponsor', 'admin'], 
    required: true
  },
  phone: String,
  profilePic: String,

  // Student specific fields
  institution: String,
  educationLevel: String,
  gpa: String,
  familyIncome: String,
  skills: [String],
  resumeUrl: String,

  // Sponsor specific fields
  organizationType: String,
  organizationName: String,
  missionStatement: String,
  logoUrl: String

}, { timestamps: true });

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.static.hashPassword = async function(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports = mongoose.model('User', userSchema);