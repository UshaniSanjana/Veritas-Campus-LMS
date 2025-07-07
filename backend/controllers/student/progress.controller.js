const Course = require("../../models/courses.model");
const UserProgress = require("../../models/userProgress.model");

const calculateProgress = async (courseId, studentId) => {
  const course = await Course.findById(courseId).populate("modules");
  const progress = await UserProgress.findOne({ courseId, studentId });

  if (!course) {
    throw new Error("Course not found");
  }

  let totalLectures = 0;
  let totalTutorials = 0;
  let totalQuizzes = 0;
  let totalAssignments = 0;

  for (const mod of course.modules) {
    totalLectures += mod.lecturematerials?.length || 0;
    totalTutorials += mod.tutorials?.length || 0;
    totalQuizzes += mod.quizzes?.length || 0;
    totalAssignments += mod.assignments?.length || 0;
  }

  const completedLectures = progress?.completedLectures?.length || 0;
  const completedTutorials = progress?.completedTutorials?.length || 0;
  const attemptedQuizzes = progress?.attemptedQuizzes?.length || 0;
  const completedAssignments = progress?.completedAssignments?.length || 0;

  const totalItems = totalLectures + totalTutorials + totalQuizzes + totalAssignments;
  const completedItems = completedLectures + completedTutorials + attemptedQuizzes + completedAssignments;

  const percentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return percentage;
};

const getProgress = async (req, res) => {
  try {
    const { courseId, studentId } = req.params;

    const percentage = await calculateProgress(courseId, studentId);
    const progressDetail = await UserProgress.findOne({ courseId, studentId }); // FIXED: Fetch the full document

    return res.status(200).json({ percentage, progressDetail }); // FIXED: Return both
  } catch (err) {
    console.error("Error getting progress:", err);
    return res.status(500).json({ message: "Error getting progress!", error: err.message });
  }
};

const markLectureComplete = async (req, res) => {
  try {
    const { courseId, studentId, lectureId, completed } = req.body;

    const update = completed
      ? { $addToSet: { completedLectures: lectureId } }
      : { $pull: { completedLectures: lectureId } };

    const progress = await UserProgress.findOneAndUpdate(
      { courseId, studentId },
      update,
      { new: true, upsert: true }
    );

    return res.status(200).json({ progress });
  } catch (err) {
    return res.status(500).json({ message: "Error marking lecture as complete" });
  }
};

const markTutorialComplete = async (req, res) => {
  try {
    const { courseId, studentId, tutorialId, completed } = req.body;

    const update = completed
      ? { $addToSet: { completedTutorials: tutorialId } }
      : { $pull: { completedTutorials: tutorialId } };

    const progress = await UserProgress.findOneAndUpdate(
      { courseId, studentId },
      update,
      { new: true, upsert: true }
    );

    return res.status(200).json({ progress });
  } catch (err) {
    return res.status(500).json({ message: "Error marking tutorial progress", error: err.message });
  }
};

const markQuizAttempt = async (req, res) => {
  try {
    const { courseId, studentId, quizId, completed } = req.body;

    const update = completed
      ? { $addToSet: { attemptedQuizzes: quizId } }
      : { $pull: { attemptedQuizzes: quizId } };

    const progress = await UserProgress.findOneAndUpdate(
      { courseId, studentId },
      update,
      { new: true, upsert: true }
    );

    return res.status(200).json({ progress });
  } catch (err) {
    return res.status(500).json({ message: "Error updating quiz progress", error: err.message });
  }
};

const markAssignmentComplete = async (req, res) => {
  try {
    const { courseId, studentId, assignmentId, completed } = req.body;

    const update = completed
      ? { $addToSet: { completedAssignments: assignmentId } }
      : { $pull: { completedAssignments: assignmentId } };

    const progress = await UserProgress.findOneAndUpdate(
      { courseId, studentId },
      update,
      { new: true, upsert: true }
    );

    return res.status(200).json({ progress });
  } catch (err) {
    return res.status(500).json({ message: "Error updating assignment progress", error: err.message });
  }
};

module.exports = {
  getProgress,
  markLectureComplete,
  markTutorialComplete, // FIXED: Export the corrected name
  markQuizAttempt,
  markAssignmentComplete,
  calculateProgress,
};