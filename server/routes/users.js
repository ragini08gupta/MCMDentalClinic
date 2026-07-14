const express = require('express');
const User = require('../models/User');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();

// GET /api/users — admin only. Never includes password (schema default).
router.get('/', requireAuth, requireRole('admin'), async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
});

// PATCH /api/users/:id/role — admin only, e.g. promote a patient to staff.
router.patch('/:id/role', requireAuth, requireRole('admin'), async (req, res) => {
  const { role } = req.body;
  if (!['patient', 'staff', 'admin'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.role = role;
  await user.save();
  res.json({ id: user._id, name: user.name, email: user.email, role: user.role });
});

module.exports = router;
