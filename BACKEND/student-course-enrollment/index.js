const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const studentRoutes = require("./routes/student.routes");
const courseRoutes = require("./routes/course.routes");
const enrollmentRoutes = require("./routes/enrollment.routes");

const app = express();
app.use(express.json());

// Routes
app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);
app.use("/", enrollmentRoutes);

// DB & Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error("DB Connection Error:", err));
