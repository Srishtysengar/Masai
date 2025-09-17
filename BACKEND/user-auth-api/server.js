require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
app.use(express.json());

// DB Connection
connectDB();

// Routes
app.use("/auth", authRoutes);

// Protected Route Example
app.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to your profile 🎉", user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
