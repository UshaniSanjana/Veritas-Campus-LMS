const User = require("../../models/Student/User");
const Student = require("../../models/Student/student.model");

// GET /api/student/profile/:id
exports.getStudentProfile = async (req, res) => {
  try {
    const { id } = req.params; // This should be the User's _id (userId)

    // Step 2: Find student profile by userId
    const student = await Student.findOne(id);
    if (!student) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    // Step 3: Return both user info and student profile
    res.status(200).json({
      success: true,
      studentProfile: student,
    });
  } catch (err) {
    console.error("Failed to fetch student profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
