import express from 'express';
import authenticate from '../middleware/authenticate.js';
import { register, login, logout } from '../controllers/authController.js';

const router = express.Router();

// Route to register a new user
router.post('/register', register);

// Route to log in a user
router.post('/login', login);

// Route to log out a user
router.post('/logout', logout);

// Route to get authenticated user details
router.get('/me', authenticate, async (req, res) => {
  try {
    // Here, `req.userId` is set by the `authenticate` middleware
    res.status(200).json({
      success: true,
      user: { id: req.userId }, // You can replace this with additional user details if needed
    });
  } catch (error) {
    console.error('Error in /me route:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user details',
    });
  }
});

export default router;




