const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register
router.post('/register', async (req,res)=>{
  const {name,email,password,role} = req.body;
  try{
    const user = await User.create({name,email,password,role});
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn:'1d'});
    res.json({token,user});
  } catch(err){
    res.status(400).json({error:err.message});
  }
});

// Login
router.post('/login', async (req,res)=>{
  const {email,password} = req.body;
  const user = await User.findOne({email});
  if(user && await user.matchPassword(password)){
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn:'1d'});
    res.json({token,user});
  } else{
    res.status(401).json({message:"Invalid credentials"});
  }
});

module.exports = router;
