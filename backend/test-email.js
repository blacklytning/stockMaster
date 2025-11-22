require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
  console.log('1. Loading credentials...');
  console.log('   User:', process.env.EMAIL_USER);
  console.log('   Pass:', process.env.EMAIL_PASS ? '**** (set)' : 'NOT SET');

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('❌ Missing email credentials in .env file');
    return;
  }

  console.log('2. Creating transporter...');
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  console.log('3. Sending test email...');
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: 'Test Email from Auth App',
      text: 'If you receive this, the email configuration is working!',
      html: '<b>If you receive this, the email configuration is working!</b>'
    });

    console.log('✅ Email sent successfully!');
    console.log('   Message ID:', info.messageId);
    console.log('   Response:', info.response);
  } catch (error) {
    console.error('❌ Error sending email:');
    console.error(error);
  }
}

testEmail();
