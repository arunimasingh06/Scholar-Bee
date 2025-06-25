/**
 * 📧 Email Utility Functions
 * Simple email sending functionality (placeholder for production email service)
 */

const sendBasicEmail = async (to, subject, message) => {
  // For development, just log the email details
  console.log('📧 Email would be sent:');
  console.log(`   To: ${to}`);
  console.log(`   Subject: ${subject}`);
  console.log(`   Message: ${message}`);
  
  // In production, this would integrate with a real email service
  // like SendGrid, AWS SES, or Nodemailer
  
  return Promise.resolve();
};

module.exports = sendBasicEmail;
