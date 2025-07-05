const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function testApplicationFlow() {
  try {
    console.log('🧪 Testing Student Application Flow');
    console.log('==================================');

    // Step 1: Register a student
    console.log('\n1. Registering student...');
    const studentData = {
      fullname: 'Test Student 3',
      email: 'teststudent3@example.com',
      password: 'password123',
      institution: 'Test University',
      educationLevel: 'Undergraduate',
      gpa: '3.5',
      familyIncome: '50000'
    };

    const studentResponse = await axios.post(`${BASE_URL}/auth/student/signup`, studentData);
    const studentToken = studentResponse.data.token;
    console.log('✅ Student registered successfully');

    // Step 2: Get available scholarships
    console.log('\n2. Getting available scholarships...');
    const scholarshipsResponse = await axios.get(`${BASE_URL}/scholarships`);
    const scholarships = scholarshipsResponse.data.scholarships;
    
    if (scholarships.length === 0) {
      console.log('❌ No scholarships available. Please create a scholarship first.');
      return;
    }
    
    const scholarship = scholarships[0];
    console.log(`✅ Found scholarship: ${scholarship.title}`);

    // Step 3: Submit application
    console.log('\n3. Submitting application...');
    const applicationData = {
      essay: 'I am passionate about learning and this scholarship will help me achieve my goals.',
      motivation: 'I want to improve my skills and contribute to society.',
      projectPlan: 'I will create a web application using modern technologies.',
      timeline: 'Week 1-2: Planning, Week 3-4: Development, Week 5-6: Testing',
      documents: ['resume.pdf', 'transcript.pdf'],
      amount: scholarship.amount
    };

    const applicationResponse = await axios.post(
      `${BASE_URL}/students/apply/${scholarship._id}`,
      applicationData,
      {
        headers: { Authorization: `Bearer ${studentToken}` }
      }
    );

    console.log('✅ Application submitted successfully');
    console.log('Response:', applicationResponse.data);

    // Step 4: Get student applications
    console.log('\n4. Getting student applications...');
    const applicationsResponse = await axios.get(
      `${BASE_URL}/students/applications`,
      {
        headers: { Authorization: `Bearer ${studentToken}` }
      }
    );

    const applications = applicationsResponse.data.applications;
    console.log(`✅ Found ${applications.length} applications`);
    
    if (applications.length > 0) {
      const latestApp = applications[0];
      console.log('Latest application:');
      console.log(`  - Scholarship: ${latestApp.scholarshipTitle}`);
      console.log(`  - Status: ${latestApp.status}`);
      console.log(`  - Amount: ₹${latestApp.amount}`);
      console.log(`  - Applied: ${new Date(latestApp.appliedDate).toLocaleDateString()}`);
    }

    console.log('\n🎉 Application flow test completed successfully!');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testApplicationFlow(); 