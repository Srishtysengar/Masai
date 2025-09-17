const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const doctorRoutes = require("./routes/doctor.routes");
const patientRoutes = require("./routes/patient.routes");
const consultationRoutes = require("./routes/consultation.routes");
const connectToDb = require("./config/mongodb.config");

const app = express();
app.use(express.json());

connectToDb();

// Routes
app.use("/doctors", doctorRoutes);
app.use("/patients", patientRoutes);
app.use("/consultations", consultationRoutes);

app.use((req,res)=>{
    res.status(404).json({message:"Invalid Route"})
})

app.listen(process.env.PORT,()=>{
    console.log("Server Running...")
})
