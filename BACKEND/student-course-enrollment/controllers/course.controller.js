const Course = require("../models/course.model");
const Enrollment = require("../models/enrollment.model");

exports.createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(200).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Soft delete course + cascade enrollment
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!course) return res.status(404).json({ error: "Course not found" });

    await Enrollment.updateMany({ courseId: id }, { isActive: false });
    res.json({ message: "Course and related enrollments deactivated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List active students of a course
exports.getCourseStudents = async (req, res) => {
  try {
    const { id } = req.params;
    const students = await Enrollment.find({ courseId: id, isActive: true })
      .populate({ path: "studentId", match: { isActive: true } });

    const activeStudents = students
      .filter(e => e.studentId !== null)
      .map(e => e.studentId);

    res.json(activeStudents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
