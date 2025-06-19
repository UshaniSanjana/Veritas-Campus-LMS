const express = require("express");
const router = express.Router();

const {
  getProgress,
  markLectureComplete,
  markTutorialComplete,
  markQuizAttempt,
  markAssignmentComplete,
} = require("../controllers/student/progress.controller");

const { getModuleContent } = require("../controllers/student/module.controller");

router.get("/progress/:courseId/:studentId", getProgress);
router.post("/progress/lecture", markLectureComplete);
router.post("/progress/tutorial", markTutorialComplete);
router.post("/progress/quiz", markQuizAttempt);
router.post("/progress/assignment", markAssignmentComplete);
router.get("/courses/:courseId/modules/:moduleId/:studentId", getModuleContent);

module.exports = router;