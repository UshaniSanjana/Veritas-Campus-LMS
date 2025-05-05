const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  //   address: {
  //     type: String,
  //     required: true,
  //   },
  //   gender: {
  //     type: String,
  //     enum: ["female", "male"],
  //   },
  //   email: {
  //     type: String,
  //     required: true,
  //   },
  //   mobile: {
  //     type: String,
  //     required: true,
  //   },
  //   degree: {
  //     type: String,
  //     required: true,
  //   },
  image: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
