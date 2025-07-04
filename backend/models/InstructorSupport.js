const mongoose = require('mongoose');

const instructorSupportSchema = new mongoose.Schema({
    instructorID: {
        type: String,
        required: true
    },
    instructorName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    issue: {
        type: String,
        required: true
    },
    photo: {
        type: String // path to uploaded photo
    },
    status: {
        type: String,
        enum: ['pending', 'replied'],
        default: 'pending'
    },
    isDeletedByUser: {
        type: Boolean,
        default: false
    },
    adminReply: {
        message: {
            type: String,
            default: ''
        },
        repliedAt: {
            type: Date
        },
        adminName: {
            type: String
        }
    },
    // Additional fields specific to instructors
    department: {
        type: String
    },
    courseAssigned: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('InstructorSupport', instructorSupportSchema);
