import { Router } from "express";
const router = Router();
import {
  createInstructor,
  getAllInstructors,
  getInstructorById,
  updateInstructor,
  deleteInstructor,
} from "../controllers/admin/instructorController";

// Create instructor
router.post("/", createInstructor);

// Get all instructors
router.get("/", getAllInstructors);

// Get instructor by ID
router.get("/:id", getInstructorById);

// Update instructor
router.put("/:id", updateInstructor);

// Delete instructor
router.delete("/:id", deleteInstructor);

export default router;
