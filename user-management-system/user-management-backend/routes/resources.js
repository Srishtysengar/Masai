const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const Resource = require('../models/Resource');

// Create
router.post('/', protect, authorize('admin','moderator'), async (req,res)=>{
  const resource = await Resource.create({...req.body, owner:req.user._id});
  res.json(resource);
});

// Get all
router.get('/', protect, async (req,res)=>{
  const resources = await Resource.find().populate('owner','name email');
  res.json(resources);
});

// Update
router.put('/:id', protect, authorize('admin','moderator'), async (req,res)=>{
  const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(resource);
});

// Delete
router.delete('/:id', protect, authorize('admin','moderator'), async (req,res)=>{
  await Resource.findByIdAndDelete(req.params.id);
  res.json({message:"Deleted"});
});

module.exports = router;
