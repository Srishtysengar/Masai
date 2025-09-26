require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const resourceRoutes = require('./routes/resources');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/resources', resourceRoutes);

// Connect DB & Start
mongoose.connect(process.env.MONGO_URI)
  .then(()=> app.listen(process.env.PORT || 5000, ()=> console.log('Server running')))
  .catch(err=> console.error(err));
