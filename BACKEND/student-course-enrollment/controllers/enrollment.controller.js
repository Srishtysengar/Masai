const Enrollment = require("../models/enrollment.model");
const Student = require("../models/student.model");
const Course = require("../models/course.model");

exports.enrollStudent = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || !student.isActive)
      return res.status(400).json({ error: "Invalid or inactive student" });

    if (!course || !course.isActive)
      return res.status(400).json({ error: "Invalid or inactive course" });

    const enrollment = new Enrollment({ studentId, courseId });
    await enrollment.save();

    res.status(200).json(enrollment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
