const Student = require("../../models/Student/student.model");
const User = require("../../models/Student/User");
const Course = require("../../models/courses.model");

const createStudent = async (req, res) => {
  try {
    console.log("🔥 Incoming createStudent request...");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const { name, email, age, address, gender, mobile, course, password } = req.body;

    // ✅ Check if course exists
    const courseDoc = await Course.findById(course);
    console.log("📘 Found courseDoc:", courseDoc);
    if (!courseDoc) {
      return res.status(400).json({ error: "Course not found" });
    }

    // ✅ Step 1: Create User
    const newUser = new User({
      name,
      email,
      password,
      role: "student", // default role
    });
    await newUser.save();
    console.log("✅ User created:", newUser);

    // ✅ Step 2: Create Student
    const newStudent = new Student({
      name,
      email,
      age,
      address,
      gender,
      mobile,
      course: courseDoc._id,
      userId: newUser._id, // ✅ critical
      image: req.file?.filename || null,
    });
    await newStudent.save();
    console.log("✅ Student created:", newStudent);

    return res.status(201).json({
      message: "Student and user created successfully",
      student: newStudent,
      user: newUser,
    });

  } catch (error) {
    console.error("❌ Error in createStudent:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createStudent,
};
