require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);

// Simple health check
app.get("/", (req, res) => res.send("Blog API running"));

// Error handler fallback
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
