const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const User = require('../models/User');

// Get all users (admin only)
router.get('/', protect, authorize('admin'), async (req,res)=>{
  const users = await User.find().select('-password');
  res.json(users);
});

// Get own profile
router.get('/profile', protect, async (req,res)=>{
  res.json(req.user);
});

// Update own profile
router.put('/profile', protect, async (req,res)=>{
  const user = req.user;
  const {name,email,password} = req.body;
  if(name) user.name = name;
  if(email) user.email = email;
  if(password) user.password = password;
  await user.save();
  res.json(user);
});

module.exports = router;
