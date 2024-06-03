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

router.post("/", verifyToken, createPatient);

router.get("/", verifyToken, getPatients);

router.get("/:id", verifyToken, getPatientById);

router.put("/:id", verifyToken, updatePatient);

router.delete("/:id", verifyToken, deletePatient);

export default router;
