const require = require('mongoose');    

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { 
    type: String,
    unique: true 
},
  password: String,
  
  role: { 
    type: String, 
    enum: ['student', 'sponsor', 'admin'] }
});

module.exports = mongoose.model('user', userSchema);
