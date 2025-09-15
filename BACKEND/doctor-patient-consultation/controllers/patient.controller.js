const Patient = require("../models/patient.model");
const Consultation = require("../models/consultation.model");

// Create patient
exports.createPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// List doctors for a patient
exports.getPatientDoctors = async (req, res) => {
  try {
    const { id } = req.params;
    const consultations = await Consultation.find({ patientId: id, isActive: true })
      .populate("doctorId", "name specialization");
    res.json(consultations.map(c => c.doctorId));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get male patients (active only)
exports.getMalePatients = async (req, res) => {
  try {
    const patients = await Patient.find({ gender: "Male", isActive: true });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Soft delete patient + cascade consultations
exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!patient) return res.status(404).json({ error: "Patient not found" });

    await Consultation.updateMany({ patientId: id }, { isActive: false });
    res.json({ message: "Patient and related consultations deactivated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
