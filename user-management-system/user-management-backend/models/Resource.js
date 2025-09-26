const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: String,
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},{timestamps:true});

module.exports = mongoose.model('Resource', resourceSchema);
