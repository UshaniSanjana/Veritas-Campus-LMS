const mongoose = require("mongoose");
const Course = require("../../models/courses.model");
const Enrollment = require("../../models/enrollment.model");
const Module = require("../../models/moduleModel");

exports.getCourseModules = async (req, res) => {
  const { id: courseId } = req.params;

  try {
    const modules = await Module.find({ course: courseId }); // course is the field in Module schema

    if (!modules || modules.length === 0) {
      return res.status(404).json({ message: "No modules found for this course" });
    }

    res.status(200).json(modules);
  } catch (error) {
    console.error("Error fetching course modules:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCourseDetails = async (req, res) => {
  const { title } = req.body;

  try {
    const course = await Course.findById(title);

    if (!course) {
      return res.status(400).json({ message: "Course not found!" });
    }

    res.status(200).json(course);
  } catch (error) {}
};

exports.moduleEnrollment = async (req, res) => {
  const { moduleId } = req.params;
  const { studentId, code } = req.body;

  if (!studentId || !moduleId) {
    return res
      .status(400)
      .json({ error: "studentId and moduleId are required." });
  }

  try {
    const module = await Module.findById(moduleId);
    if (!module) {
      return res.status(404).json({ error: "Module not found" });
    }

    if (module.code !== code) {
      return res.status(401).json({ error: "Incorrect code" });
    }

    const newEnrollment = new Enrollment({
      studentId,
      moduleId,
    });

    await newEnrollment.save();

    res.json({
      message: "Enrollment successful!",
      enrollment: newEnrollment,
    });
  } catch (err) {
    console.error("Enrollment Error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.GetEnrolledmodules = async (req, res) => {
  const { studentId } = req.params;

  try {
    const enrollments = await Enrollment.find({ studentId }).populate({
      path: "moduleId",
      populate: {
        path: "course",
        model: "Course",
      },
    });

    const modules = enrollments.map((enroll) => enroll.moduleId);
    res.json(modules);
  } catch (err) {
    console.error("Failed to fetch the enrollment list:", err);
    res.status(500).json({ message: "Server error" });
  }
};
