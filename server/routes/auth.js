const express = require('express');
const User = require('../models/User');
const { signToken, setAuthCookie, clearAuthCookie, requireAuth } = require('../middleware/auth');

const router = express.Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/auth/register
// Public self-registration. Always creates a "patient" account -- role is
// never taken from the request body, so nobody can register themselves as
// staff/admin.
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ error: 'Enter a valid email address' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: 'An account with that email already exists' });
    }

    const user = await User.create({ name, email, password, role: 'patient' });

    const token = signToken(user);
    setAuthCookie(res, token);
    res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    console.error('Failed to register:', err);
    res.status(500).json({ error: 'Could not create account' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Same generic error whether the email doesn't exist or the password is
    // wrong, so a caller can't use this endpoint to discover which emails
    // are registered.
    const genericError = () => res.status(401).json({ error: 'Invalid email or password' });

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) return genericError();

    const valid = await user.comparePassword(password);
    if (!valid) return genericError();

    const token = signToken(user);
    setAuthCookie(res, token);
    res.json({ id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    console.error('Failed to log in:', err);
    res.status(500).json({ error: 'Could not log in' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  clearAuthCookie(res);
  res.status(204).end();
});

// GET /api/auth/me — used by the frontend to check who's logged in.
router.get('/me', requireAuth, (req, res) => {
  const { _id, name, email, role } = req.user;
  res.json({ id: _id, name, email, role });
});

module.exports = router;