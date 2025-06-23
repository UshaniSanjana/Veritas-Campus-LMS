// models/InstructorModel.js
const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v.replace(/[^0-9]/g, ''));
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true
  },
  qualification: {
    type: String,
    required: [true, 'Qualification is required'],
    trim: true
  },
  experience: {
    type: String,
    required: [true, 'Experience is required'],
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  joinDate: {
    type: Date,
    required: [true, 'Join date is required']
  },
  profileImage: {
    type: String, // Store the file path or URL
    default: null
  }
}, {
  timestamps: true // This will automatically add createdAt and updatedAt fields
});

// Virtual for instructor's full name
instructorSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Create the model
const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;