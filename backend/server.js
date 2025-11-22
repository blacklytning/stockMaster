const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import configurations
const { connectDB } = require('./config/database');
const { authenticateToken } = require('./middleware/authMiddleware');

// Import controllers
const authController = require('./controllers/authController');

const app = express();

// Connect to PostgreSQL
connectDB();

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    // Allow any localhost origin for development
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }

    // In production, you would specify exact domains
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Authentication API is running',
    timestamp: new Date().toISOString()
  });
});

// Authentication routes
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);
app.get('/api/auth/profile', authenticateToken, authController.getProfile);

// Password Reset routes
app.post('/api/auth/forgot-password', authController.forgotPassword);
app.post('/api/auth/verify-otp', authController.verifyOtp);
app.post('/api/auth/reset-password', authController.resetPassword);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Authentication Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 API Health Check: http://localhost:${PORT}/api/health`);
});
