const express = require("express");
const router = express.Router();

const {
  getProgress,
  markLectureComplete,
  markTutorialeComplete,
  markQuizAttempt,
  markAssignmentComplete,
} = require("../controllers/student/progress.controller");
const {
  editStudent,
  changepassowrd,
  getStudent,
  addStudent,
} = require("../controllers/student/student.controller");
const {
  addCourse,
  Courses,
  CourseEnrollment,
  GetEnrolledCourses,
} = require("../controllers/student/module.controller");
const upload = require("../middleware/upload.middleware");

router.get("/progress/:courseId/:studentId", getProgress);
router.post("/progress/lecture", markLectureComplete);
router.post("/progress/tutorial", markTutorialeComplete);
router.post("/progress/quiz", markQuizAttempt);
router.post("/progress/assignment", markAssignmentComplete);
router.post("/addStudent", upload.single("image"), addStudent);
router.put("/editStudent/:id", upload.single("image"), editStudent);
router.put("/changePassword/:id", changepassowrd);
router.get("/student/:studentId", getStudent);
router.post("/addCourse", addCourse);
router.get("/courses", Courses);
router.post("/enroll/:courseId", CourseEnrollment);
router.get("/enrolled/:studentId", GetEnrolledCourses);
router.get("/course/:courseId", GetEnrolledCourses);

module.exports = router;
