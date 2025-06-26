const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Course = require('../models/Courses');
const Enrollment = require('../models/enrollment.model');
const LectureMaterial = require('../models/Material');
const Exam = require('../models/Exam');
const Quiz = require('../models/Quiz');
const Assignment = require('../models/assignmentmodel');

// GET all courses with stats
router.get('/stats', async (req, res) => {
  try {
    const courses = await Course.find();

    const details = await Promise.all(
      courses.map(async (course) => {
        const studentCount = await Enrollment.countDocuments({ courseID: course._id });
        const moduleCount = await LectureMaterial.countDocuments({ courseId: course._id });

        return {
          _id: course._id,
          title: course.title,
          instructor: course.instructor,
          instructorCount: course.instructor.length,
          description: course.description,
          numStudents: studentCount,
          numModules: moduleCount,
        };
      })
    );

    res.json(details);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET course details by id
router.get('/details/:id', async (req, res) => {
  try {
    const courseId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: 'Invalid course ID' });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const materials = await LectureMaterial.find({ courseId });
    const assignments = await Assignment.find({ courseId });
    const quizzes = await Quiz.find({ courseId });
    const exams = await Exam.find({ courseId });

    res.json({
      course,
      materials,
      assignments,
      quizzes,
      exams,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch course details' });
  }
});

// POST add new course
router.post('/stats', async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    const saved = await newCourse.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add course' });
  }
});

// PUT update course by id
router.put('/stats/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid course ID' });
  }

  // Only allow these fields to be updated:
  const { title, description, instructor } = req.body;
  const updateData = { title, description, instructor };

  try {
    const updated = await Course.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,  // run schema validations
    });
    if (!updated) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(updated);
  } catch (err) {
    console.error('Error updating course:', err);
    res.status(500).json({ error: 'Failed to update course' });
  }
});

// DELETE course by id
router.delete('/stats/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid course ID' });
  }

  try {
    await Course.findByIdAndDelete(id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

module.exports = router;
