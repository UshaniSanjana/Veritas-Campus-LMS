const Course = require("../../models/courses.model");
const Enrollment = require("../../models/enrollment.model");
const Module = require("../../models/moduleModel");

exports.getCourseModules = async (req, res) => {
  const courseId = req.params.id;
  try {
    const course = await Course.findById(courseId).select("modules");

    if (!course) {
      return res.status(400).json({ message: "Course not found!" });
    }

    res.status(200).json(course.modules);
  } catch (error) {
    console.error("Error fetching course modules:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCourseDetails = async (req, res) => {
  const { title } = req.body;

  try {
    const course = await Course.findOne({ title });

    if (!course) {
      return res.status(400).json({ message: "Course not found!" });
    }

    res.status(200).json(course);
  } catch (error) {}
};

exports.moduleEnrollment = async (req, res) => {
  const { moduleId } = req.params;
  const { studentId } = req.body;

  try {
    const module = await Module.findById(moduleId);

    if (!module) {
      return res.status(404).json({ error: "module not found" });
    }

    const newEnrollment = new Enrollment({
      studentId,
      moduleId,
    });

    await newEnrollment.save();

    res.json({
      message: "Enrollment successful!",
      Enrollment: newEnrollment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.GetEnrolledmodules = async (req, res) => {
  const { studentId } = req.params;

  try {
    const enrollments = await Enrollment.find({ studentId }).populate(
      "moduleId"
    );
    const modules = enrollments.map((enroll) => enroll.moduleId);
    res.json(modules);
  } catch (err) {
    res.json({ message: "failed to fetch the enrollment list" });
  }
};
