#!/usr/bin/env node

/**
 * 🔗 ScholarBEE Connection Test
 * Simple script to test if frontend can connect to backend
 */

const http = require('http');

const API_URL = 'http://localhost:3000/api/health';

console.log('🔗 Testing ScholarBEE Backend Connection...');
console.log(`📍 Testing: ${API_URL}`);
console.log('');

// Test backend connection
const testBackend = () => {
  return new Promise((resolve, reject) => {
    const req = http.get(API_URL, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve({ status: res.statusCode, data: response });
        } catch (error) {
          reject(new Error('Invalid JSON response'));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
};

// Run the test
testBackend()
  .then((result) => {
    console.log('✅ Backend Connection Successful!');
    console.log(`📊 Status Code: ${result.status}`);
    console.log(`📝 Response:`, result.data);
    console.log('');
    console.log('🎉 Your ScholarBEE backend is working correctly!');
    console.log('🌐 You can now access:');
    console.log('   • Frontend: http://localhost:5173');
    console.log('   • Backend API: http://localhost:3000');
    console.log('   • Health Check: http://localhost:3000/api/health');
  })
  .catch((error) => {
    console.log('❌ Backend Connection Failed!');
    console.log(`📝 Error: ${error.message}`);
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('   1. Make sure the backend server is running');
    console.log('      cd backend && npm run dev');
    console.log('');
    console.log('   2. Check if MongoDB is running');
    console.log('      On macOS: brew services start mongodb-community');
    console.log('      On Windows: Start MongoDB service');
    console.log('      On Linux: sudo systemctl start mongod');
    console.log('');
    console.log('   3. Verify the backend is on port 3000');
    console.log('      Check: http://localhost:3000/api/health');
    console.log('');
    console.log('   4. Check environment variables');
    console.log('      Make sure backend/.env exists and is configured');
  }); 