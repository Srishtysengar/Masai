const Consultation = require("../models/consultation.model");
const Doctor = require("../models/doctor.model");
const Patient = require("../models/patient.model");

// Create consultation
exports.createConsultation = async (req, res) => {
  try {
    const { doctorId, patientId, notes } = req.body;

    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(patientId);

    if (!doctor || !doctor.isActive) return res.status(400).json({ error: "Invalid or inactive doctor" });
    if (!patient || !patient.isActive) return res.status(400).json({ error: "Invalid or inactive patient" });

    const consultation = new Consultation({ doctorId, patientId, notes });
    await consultation.save();

    res.json(consultation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Recent consultations
exports.getRecentConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find({ isActive: true })
      .populate("doctorId", "name specialization")
      .populate("patientId", "name age")
      .sort({ consultedAt: -1 })
      .limit(5);

    res.json(consultations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
