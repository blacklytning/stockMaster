const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { prisma } = require('../config/database');
const { sendOtpEmail } = require('../services/emailService');

// JWT Helper Functions
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || process.env.SESSION_SECRET, { expiresIn: '7d' });
};

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Register Controller
const register = async (req, res) => {
  try {
    const { name, email, password, language } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        language: language || 'en'
      }
    });

    res.status(201).json({
      message: 'User registered successfully',
      userId: user.id,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        language: user.language
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user.id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        language: user.language
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Get Profile Controller
const getProfile = async (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      language: req.user.language
    }
  });
};

// Forgot Password - Send OTP
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Don't reveal if user exists or not for security
      return res.json({
        message: 'If an account exists with this email, you will receive an OTP shortly',
        success: true
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Save OTP to database
    await prisma.user.update({
      where: { email },
      data: {
        resetOtp: otp,
        resetOtpExpiry: otpExpiry,
        resetOtpVerified: false
      }
    });

    // Send OTP email
    await sendOtpEmail(email, otp, user.name);

    console.log(`🔑 OTP for ${email}: ${otp} (expires in 10 minutes)`);

    res.json({
      message: 'OTP sent to your email address',
      success: true
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Verify OTP
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validation
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or OTP' });
    }

    // Check if OTP exists
    if (!user.resetOtp) {
      return res.status(400).json({ message: 'No OTP request found. Please request a new OTP.' });
    }

    // Check if OTP is expired
    if (new Date() > user.resetOtpExpiry) {
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    // Verify OTP
    if (user.resetOtp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
    }

    // Mark OTP as verified
    await prisma.user.update({
      where: { email },
      data: {
        resetOtpVerified: true
      }
    });

    res.json({
      message: 'OTP verified successfully',
      success: true
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Reset Password (only after OTP verification)
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Validation
    if (!email || !newPassword) {
      return res.status(400).json({ message: 'Email and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid request' });
    }

    // Check if OTP was verified
    if (!user.resetOtpVerified) {
      return res.status(400).json({ message: 'Please verify OTP first' });
    }

    // Check if OTP is still valid (within expiry time)
    if (new Date() > user.resetOtpExpiry) {
      return res.status(400).json({ message: 'OTP session expired. Please start over.' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    // Update password and clear OTP fields
    await prisma.user.update({
      where: { email },
      data: {
        passwordHash,
        resetOtp: null,
        resetOtpExpiry: null,
        resetOtpVerified: false
      }
    });

    res.json({
      message: 'Password reset successfully. You can now login with your new password.',
      success: true
    });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  forgotPassword,
  verifyOtp,
  resetPassword
};
