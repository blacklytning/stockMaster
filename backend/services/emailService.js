const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  // For development, use Gmail or any SMTP service
  // For production, use a proper email service like SendGrid, AWS SES, etc.

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    // Using Gmail SMTP
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // App password, not regular password
      }
    });
  } else {
    // For testing without real email - logs to console
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'ethereal.user@ethereal.email',
        pass: 'ethereal.pass'
      }
    });
  }
};

// Send OTP email
const sendOtpEmail = async (email, otp, userName) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@authapp.com',
      to: email,
      subject: 'Password Reset OTP',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: 'Inter', Arial, sans-serif;
              background-color: #0f172a;
              color: #f8fafc;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
              border-radius: 16px;
              padding: 40px;
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 48px;
              margin-bottom: 10px;
            }
            h1 {
              background: linear-gradient(135deg, #2563eb 0%, #10b981 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              font-size: 28px;
              margin: 0;
            }
            .content {
              background: rgba(255, 255, 255, 0.05);
              border-radius: 12px;
              padding: 30px;
              margin: 20px 0;
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
            .otp-box {
              background: linear-gradient(135deg, #2563eb 0%, #10b981 100%);
              color: white;
              font-size: 32px;
              font-weight: bold;
              text-align: center;
              padding: 20px;
              border-radius: 12px;
              letter-spacing: 8px;
              margin: 20px 0;
              box-shadow: 0 8px 32px rgba(37, 99, 235, 0.3);
            }
            .info {
              color: #cbd5e1;
              font-size: 14px;
              line-height: 1.6;
              margin: 15px 0;
            }
            .warning {
              background: rgba(239, 68, 68, 0.1);
              border: 1px solid #ef4444;
              color: #fca5a5;
              padding: 15px;
              border-radius: 8px;
              margin-top: 20px;
              font-size: 13px;
            }
            .footer {
              text-align: center;
              color: #94a3b8;
              font-size: 12px;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🔐</div>
              <h1>Password Reset Request</h1>
            </div>

            <div class="content">
              <p style="color: #f8fafc; font-size: 16px;">Hello ${userName},</p>

              <p class="info">
                We received a request to reset your password. Use the OTP code below to verify your identity and reset your password.
              </p>

              <div class="otp-box">
                ${otp}
              </div>

              <p class="info">
                <strong>This OTP is valid for 10 minutes.</strong>
              </p>

              <p class="info">
                Enter this code on the password reset page to continue. If you didn't request this password reset, please ignore this email or contact support if you have concerns.
              </p>

              <div class="warning">
                ⚠️ <strong>Security Notice:</strong> Never share this OTP with anyone. Our team will never ask for your OTP.
              </div>
            </div>

            <div class="footer">
              <p>This is an automated message, please do not reply.</p>
              <p>&copy; 2024 Authentication App. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('✅ OTP Email sent successfully:', info.messageId);

    // For testing without real email
    if (!process.env.EMAIL_USER) {
      console.log('📧 Preview URL:', nodemailer.getTestMessageUrl(info));
      console.log('🔑 OTP (for testing):', otp);
    }

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
    // For development, log the OTP even if email fails
    console.log('🔑 OTP (email failed):', otp);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendOtpEmail
};
