import express from "express";
import {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} from "../controllers/patientControllers.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Route to create a new patient
router.post("/", verifyToken, createPatient);

// Route to get all patients
router.get("/", verifyToken, getPatients);

// Route to get a patient by ID
router.get("/:id", verifyToken, getPatientById);

// Route to update a patient
router.put("/:id", verifyToken, updatePatient);

// Route to delete a patient
router.delete("/:id", verifyToken, deletePatient);

export default router;
