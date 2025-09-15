const express = require("express");
const { createPatient, getPatientDoctors, getMalePatients, deletePatient } = require("../controllers/patient.controller");

const router = express.Router();

router.post("/", createPatient);
router.get("/:id/doctors", getPatientDoctors);
router.get("/", getMalePatients); // e.g., /patients?gender=Male
router.delete("/:id", deletePatient);

module.exports = router;
