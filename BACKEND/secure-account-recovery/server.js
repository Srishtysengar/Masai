const express = require("express");
const dotenv = require("dotenv");
const connectToDb=require("./config/db");

dotenv.config();
connectToDb();

const app =express();
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`server running on port ${PORT}`));