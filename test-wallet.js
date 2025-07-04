const axios = require('axios');

const API_BASE = 'http://localhost:3000/api';

async function testWallet() {
  try {
    console.log('🧪 Testing Wallet System...\n');

    // Test 1: Student Registration
    console.log('1. Registering a test student...');
    const studentData = {
      name: 'Test Student',
      email: 'teststudent@example.com',
      password: 'password123',
      phone: '+91 9876543210',
      institution: 'Test University',
      course: 'Computer Science',
      year: '3rd Year',
      gpa: '8.5',
      city: 'Mumbai'
    };

    const studentResponse = await axios.post(`${API_BASE}/auth/student/signup`, studentData);
    const studentToken = studentResponse.data.token;
    console.log('✅ Student registered successfully');

    // Test 2: Get Student Wallet
    console.log('\n2. Getting student wallet...');
    const walletResponse = await axios.get(`${API_BASE}/wallet`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    console.log('✅ Wallet retrieved:', walletResponse.data.wallet);

    // Test 3: Update UPI ID
    console.log('\n3. Updating UPI ID...');
    const upiResponse = await axios.put(`${API_BASE}/wallet/upi`, 
      { upiId: 'teststudent@okicici' },
      { headers: { Authorization: `Bearer ${studentToken}` } }
    );
    console.log('✅ UPI ID updated:', upiResponse.data);

    // Test 4: Get Wallet Stats
    console.log('\n4. Getting wallet statistics...');
    const statsResponse = await axios.get(`${API_BASE}/wallet/stats`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    console.log('✅ Wallet stats:', statsResponse.data.stats);

    // Test 5: Get Transactions
    console.log('\n5. Getting transaction history...');
    const transactionsResponse = await axios.get(`${API_BASE}/wallet/transactions`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    console.log('✅ Transactions retrieved:', transactionsResponse.data.transactions.length, 'transactions');

    console.log('\n🎉 All wallet tests passed!');
    console.log('\n📋 Summary:');
    console.log('- Student wallet created successfully');
    console.log('- UPI ID can be updated');
    console.log('- Wallet statistics are working');
    console.log('- Transaction history is accessible');
    console.log('\n💡 Next steps:');
    console.log('- Test wallet crediting when sponsors approve applications');
    console.log('- Test withdrawal functionality');
    console.log('- Test frontend wallet interface');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testWallet(); 