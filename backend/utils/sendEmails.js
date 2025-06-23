const { sendEmail } = require('../services/emailService');

const sendBasicEmail = async (to, subject, message) => {
  const html = `
    <div style="font-family:sans-serif;">
      <h3>${subject}</h3>
      <p>${message}</p>
    </div>
  `;

  await sendEmail(to, subject, html);
};

module.exports = sendBasicEmail;
