const mongoose = require('mongoose');

/**
 * 🗄️ Database Connection Function
 * Connects to MongoDB using environment variables
 */
function connectToDb() {
    // Use MONGODB_URI from environment, fallback to local MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/scholarbee';
    
    mongoose.connect(mongoUri)
    .then(() => {
      console.log('✅ MongoDB connected successfully');
      console.log(`📍 Database: ${mongoUri.split('/').pop()}`);
    })
    .catch(err => {
      console.error('❌ MongoDB connection error:', err);
      console.log('💡 Make sure MongoDB is running and MONGODB_URI is set correctly');
      process.exit(1); // Exit if database connection fails
    });
}
 
module.exports = connectToDb;