// controllers/admin/InstructorController.js
const Instructor = require('../../models/InstructorModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads/instructors');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'instructor-' + uniqueSuffix + ext);
  }
});

// File filter to only accept image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Configure the upload middleware
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB limit
  },
  fileFilter: fileFilter
});

// Helper function to handle errors
const handleError = (err, res) => {
  console.error('Error:', err);
  return res.status(500).json({
    success: false,
    message: err.message || 'An error occurred during processing'
  });
};

// Controller methods
const instructorController = {
  // Create a new instructor
  createInstructor: async (req, res) => {
    // Process the image upload using multer
    upload.single('profileImage')(req, res, async (err) => {
      if (err) {
        return handleError(err, res);
      }

      try {
        const instructorData = { ...req.body };
        
        // Add file path if an image was uploaded
        if (req.file) {
          // Store relative path for database
          instructorData.profileImage = '/uploads/instructors/' + path.basename(req.file.path);
        }
        
        // Create new instructor in database
        const instructor = new Instructor(instructorData);
        await instructor.save();
        
        res.status(201).json({
          success: true,
          message: 'Instructor created successfully',
          data: instructor
        });
      } catch (error) {
        // If there was an error and a file was uploaded, remove it
        if (req.file && req.file.path) {
          fs.unlink(req.file.path, (unlinkErr) => {
            if (unlinkErr) console.error('Error deleting file:', unlinkErr);
          });
        }
        
        return handleError(error, res);
      }
    });
  },

  // Get all instructors
  getAllInstructors: async (req, res) => {
    try {
      const instructors = await Instructor.find().sort({ createdAt: -1 });
      
      res.status(200).json({
        success: true,
        count: instructors.length,
        data: instructors
      });
    } catch (error) {
      return handleError(error, res);
    }
  },

  // Get a single instructor by ID
  getInstructorById: async (req, res) => {
    try {
      const instructor = await Instructor.findById(req.params.id);
      
      if (!instructor) {
        return res.status(404).json({
          success: false,
          message: 'Instructor not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: instructor
      });
    } catch (error) {
      return handleError(error, res);
    }
  },

  // Update an instructor
  updateInstructor: async (req, res) => {
    // Process the image upload first if present
    upload.single('profileImage')(req, res, async (err) => {
      if (err) {
        return handleError(err, res);
      }

      try {
        // Find the instructor first
        const instructor = await Instructor.findById(req.params.id);
        
        if (!instructor) {
          // Remove uploaded file if instructor not found
          if (req.file && req.file.path) {
            fs.unlink(req.file.path, (unlinkErr) => {
              if (unlinkErr) console.error('Error deleting file:', unlinkErr);
            });
          }
          
          return res.status(404).json({
            success: false,
            message: 'Instructor not found'
          });
        }
        
        const updateData = { ...req.body };
        
        // Add file path if an image was uploaded
        if (req.file) {
          // Remove old profile image if exists
          if (instructor.profileImage) {
            const oldFilePath = path.join(__dirname, '../..', instructor.profileImage);
            if (fs.existsSync(oldFilePath)) {
              fs.unlink(oldFilePath, (unlinkErr) => {
                if (unlinkErr) console.error('Error deleting old file:', unlinkErr);
              });
            }
          }
          
          // Store relative path for database
          updateData.profileImage = '/uploads/instructors/' + path.basename(req.file.path);
        }
        
        // Update instructor in database
        const updatedInstructor = await Instructor.findByIdAndUpdate(
          req.params.id,
          updateData,
          { new: true, runValidators: true }
        );
        
        res.status(200).json({
          success: true,
          message: 'Instructor updated successfully',
          data: updatedInstructor
        });
      } catch (error) {
        // If there was an error and a file was uploaded, remove it
        if (req.file && req.file.path) {
          fs.unlink(req.file.path, (unlinkErr) => {
            if (unlinkErr) console.error('Error deleting file:', unlinkErr);
          });
        }
        
        return handleError(error, res);
      }
    });
  },

  // Delete an instructor
  deleteInstructor: async (req, res) => {
    try {
      const instructor = await Instructor.findById(req.params.id);
      
      if (!instructor) {
        return res.status(404).json({
          success: false,
          message: 'Instructor not found'
        });
      }
      
      // Delete profile image if exists
      if (instructor.profileImage) {
        const filePath = path.join(__dirname, '../..', instructor.profileImage);
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) console.error('Error deleting file:', unlinkErr);
          });
        }
      }
      
      // Remove from database
      await Instructor.findByIdAndDelete(req.params.id);
      
      res.status(200).json({
        success: true,
        message: 'Instructor deleted successfully'
      });
    } catch (error) {
      return handleError(error, res);
    }
  }
};

module.exports = instructorController;