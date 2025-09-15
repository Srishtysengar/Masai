const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("Student", studentSchema);
