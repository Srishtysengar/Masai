const express = require("express");
const { createDoctor, getDoctorPatients, getConsultationCount, deleteDoctor } = require("../controllers/doctor.controller");

const router = express.Router();

router.post("/", createDoctor);
router.get("/:id/patients", getDoctorPatients);
router.get("/:id/consultations/count", getConsultationCount);
router.delete("/:id", deleteDoctor);

module.exports = router;
