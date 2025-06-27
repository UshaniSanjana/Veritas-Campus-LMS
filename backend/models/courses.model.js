// models/course.model.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  instructor: [{
    type: String,
    trim: true,
  }],
  modules: [
    {
      title: { type: String, required: true, trim: true },
      lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' }],
      tutorials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tutorial' }],
      quizes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
      assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
      recordings: [{ type: String }],
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
