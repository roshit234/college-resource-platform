const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const router = express.Router();

// Helper function to generate a JWT token
const generateToken = (id, name) => {
  return jwt.sign(
    { id, name },                    // data to store inside the token
    process.env.JWT_SECRET,          // secret key to sign with
    { expiresIn: '7d' }             // token expires in 7 days
  );
};

// ─────────────────────────────────────────
// POST /api/auth/signup
// Register a new user
// ─────────────────────────────────────────
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  // Check if user already exists
  const existingUser = UserModel.findByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  // Hash the password before saving
  // The '10' is the "salt rounds" — higher = more secure but slower
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user in our dummy database
  const user = UserModel.create(name, email, hashedPassword);

  // Return user info + token
  res.status(201).json({
    message: 'Account created successfully!',
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    },
    token: generateToken(user.id, user.name)
  });
});

// ─────────────────────────────────────────
// POST /api/auth/login
// Login an existing user
// ─────────────────────────────────────────
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  // Find the user by email
  const user = UserModel.findByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Compare the entered password with the stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Login successful — return user info + token
  res.json({
    message: 'Login successful!',
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    },
    token: generateToken(user.id, user.name)
  });
});

module.exports = router;