const Student = require("../models/student.model");
const Enrollment = require("../models/enrollment.model");

exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(200).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Soft delete student + cascade enrollment
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!student) return res.status(404).json({ error: "Student not found" });

    await Enrollment.updateMany({ studentId: id }, { isActive: false });
    res.json({ message: "Student and related enrollments deactivated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List active courses of student
exports.getStudentCourses = async (req, res) => {
  try {
    const { id } = req.params;
    const courses = await Enrollment.find({ studentId: id, isActive: true })
      .populate({ path: "courseId", match: { isActive: true } });

    const activeCourses = courses
      .filter(e => e.courseId !== null)
      .map(e => e.courseId);

    res.json(activeCourses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
