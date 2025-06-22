const mongoose = require('mongoose');

const sponsorSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
     },
  organizationType: String,
  phone: String,
  logo: String,
  mission: String
});

module.exports = mongoose.model('Sponsor', sponsorSchema);