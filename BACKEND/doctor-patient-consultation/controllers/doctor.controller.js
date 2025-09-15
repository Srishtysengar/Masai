const Doctor = require("../models/doctor.model");
const Consultation = require("../models/consultation.model");

// Create doctor
exports.createDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// List patients for a doctor
exports.getDoctorPatients = async (req, res) => {
  try {
    const { id } = req.params;
    const consultations = await Consultation.find({ doctorId: id, isActive: true })
      .populate("patientId", "name age gender")
      .sort({ consultedAt: -1 })
      .limit(10);

    res.json(consultations.map(c => c.patientId));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Count consultations by doctor
exports.getConsultationCount = async (req, res) => {
  try {
    const { id } = req.params;
    const count = await Consultation.countDocuments({ doctorId: id, isActive: true });
    res.json({ doctorId: id, consultationCount: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Soft delete doctor + cascade consultations
exports.deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    await Consultation.updateMany({ doctorId: id }, { isActive: false });
    res.json({ message: "Doctor and related consultations deactivated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
