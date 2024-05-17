// routes/clinicRoutes.js

import express from "express";
import Clinic from "../models/Clinic.js";
import Employee from "../models/Employee.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Create a new clinic
router.post("/", verifyToken, async (req, res) => {
  try {
    const { name, address, employees } = req.body;
    const userId = req.user.id; // The ID of the user who created the clinic

    // Create employee documents and get their IDs
    const employeeDocs = await Employee.insertMany(employees);
    const employeeIds = employeeDocs.map((emp) => emp._id);

    // Create a new clinic
    const newClinic = new Clinic({
      name,
      address,
      employees: employeeIds,
      createdBy: userId,
    });

    // Save the clinic to the database
    const savedClinic = await newClinic.save();

    res.status(201).json(savedClinic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
