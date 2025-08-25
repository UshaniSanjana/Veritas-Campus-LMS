const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");

// Load env variables
dotenv.config();

// Import routes
const authRoutes = require("./routes/Student/authRoutes");
const notificationRouter = require("./routes/notification.router");
const announcementRouter = require("./routes/announcement.router");
const studentSupportRoutes = require("./routes/student/supportRoute");
const adminSupportRoutes = require("./routes/adminsupportroutes");
const adminReportRoutes = require("./routes/adminReportRoute");
const courseStatsRoutes = require("./routes/adminCourseStats");
const adminDashboardRoutes = require("./routes/adminDashboard");
const quizAnswersRoute = require("./routes/Student/quizAnswersRoute");
const studentRoutes = require("./routes/student");
const instructorRoutes = require("./routes/instructor/instructor");
const instructorRoutesV2 = require("./routes/InsructorsRoute");

// Instructor routes
const dashboardRoutes = require("./routes/instructor/dashboardRoutes");
const announcementRoute = require("./routes/instructor/announcementRoute");
const instructorquizRoutes = require("./routes/instructor/quizRoutes");
const lectureRoutes = require("./routes/instructor/lectureRoutes");
const instructorSupportRoutes = require("./routes/instructor/LectureSupportRoute");
const InstructorRoutes = require("./routes/instructor/instructorRoutes");
const assignmentRoutes = require("./routes/instructor/assignmentRoutes");

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// CORS Configuration - UPDATE WITH YOUR FRONTEND URL
app.use(
  cors({
    origin: [
      "http://localhost:3000", // local dev
      "https://veritas-campus-lms-ywm1.vercel.app", // your frontend
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/student/support", studentSupportRoutes);
app.use("/api/notification", notificationRouter);
app.use("/api/announcement", announcementRouter);
app.use("/api/adminsupport", adminSupportRoutes);
app.use("/api/adminReport", adminReportRoutes);
app.use("/api/adminCourseStats", courseStatsRoutes);
app.use("/api/adminDashboard", adminDashboardRoutes);
app.use("/api/quizAnswers", quizAnswersRoute);
app.use("/api/student", studentRoutes);
app.use("/api/instructors", instructorRoutesV2);

// Instructor routes
app.use("/api/instructor", assignmentRoutes);
app.use("/api/instructor/modules", InstructorRoutes);
app.use("/api/instructor/support", instructorSupportRoutes);
app.use("/api/instructor/announcement", announcementRoute);
app.use("/api/instructor/quiz", instructorquizRoutes);
app.use("/api/instructor/lecture", lectureRoutes);
app.use("/api/instructor", dashboardRoutes);
app.use("/api/instructor", instructorRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    `Backend URL: https://veritas-campus-lms-production.up.railway.app`
  );
});
