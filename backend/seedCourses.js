require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('./models/courses.model'); // adjust path if needed

const courses = [
  { _id: "643f3e8fc1f123abcde12345", title: "Diploma in Human Resource Management" },
  { _id: "643f3e8fc1f123abcde12346", title: "Diploma in Business Administration" },
  { _id: "643f3e8fc1f123abcde12347", title: "Diploma in English" },
  { _id: "643f3e8fc1f123abcde12348", title: "Diploma in Internal Sales & Marketing" },
];

async function seedCourses() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB Connected");

    // Clear existing courses
    await Course.deleteMany({});
    console.log("🗑️ Old courses deleted");

    // Insert new courses
    await Course.insertMany(courses);
    console.log("✅ Courses seeded successfully");

    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error seeding courses", error);
    mongoose.disconnect();
  }
}

seedCourses();
