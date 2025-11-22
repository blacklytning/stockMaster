const nodemailer = require('nodemailer');

async function testEmail() {
  const user = 'chetanshende137@gmail.com';
  const pass = 'uein oiab punv zhjs';

  console.log('1. Using credentials:');
  console.log('   User:', user);
  console.log('   Pass:', pass);

  console.log('2. Creating transporter...');
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: pass
    }
  });

  console.log('3. Sending test email...');
  try {
    const info = await transporter.sendMail({
      from: user,
      to: user,
      subject: 'Test Email from Auth App (Hardcoded)',
      text: 'If you receive this, the email configuration is working!',
      html: '<b>If you receive this, the email configuration is working!</b>'
    });

    console.log('✅ Email sent successfully!');
    console.log('   Message ID:', info.messageId);
  } catch (error) {
    console.error('❌ Error sending email:');
    console.error(error);
  }
}

testEmail();
