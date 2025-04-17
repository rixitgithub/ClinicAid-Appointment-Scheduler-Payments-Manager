import express from "express";
import Clinic from "../models/Clinic.js";
import { verifyToken } from "../middleware/auth.js";
import Employee from "../models/Employee.js";
import Schedule from "../models/Schedule.js";
import Patient from "../models/Patient.js";
import { Types } from "mongoose";
const { ObjectId } = Types;

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const { name, address, about, phone, employees } = req.body;
    const userId = req.user.id;
    const employeeDocs = await Employee.insertMany(employees);
    const employeeIds = employeeDocs.map((emp) => emp._id);

    const newClinic = new Clinic({
      name,
      address,
      about,
      phone,
      employees: employeeIds,
      createdBy: userId,
    });

    const savedClinic = await newClinic.save();

    res.status(201).json(savedClinic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/creator", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const clinic = await Clinic.findOne({ createdBy: userId }).populate({
      path: "employees",
      model: "Employee",
    });

    if (!clinic) {
      return res
        .status(404)
        .json({ message: "Clinic not found for this user" });
    }
    res.status(200).json(clinic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/id/:clinicId", verifyToken, async (req, res) => {
  try {
    const clinicId = req.params.clinicId;
    const clinic = await Clinic.findById(clinicId).populate({
      path: "employees",
      model: "Employee",
    });

    if (!clinic) {
      return res.status(404).json({ message: "Clinic not found" });
    }

    const userId = new ObjectId(req.user.id);
    const userEmail = req.user.email;
    const createdBy = new ObjectId(clinic.createdBy);
    const isAuthorized =
      createdBy.equals(userId) ||
      clinic.employees.some((employee) => employee.email === userEmail);
    console.log("author", isAuthorized);
    const patients = await Patient.find({ clinicId }).populate({
      path: "doctorChoice",
      model: "Employee",
    });

    const schedules = await Schedule.find({ clinicId })
      .populate({
        path: "doctorId",
        model: "Employee",
      })
      .populate({
        path: "patientId",
        model: "Patient",
      });
    const clinicDetails = {
      ...clinic.toObject(),
      patients,
      schedules,
    };

    if (isAuthorized) {
      return res.json({ clinicDetails, allowed: true });
    }

    res.json({ clinicDetails, allowed: false });
  } catch (error) {
    console.error("Error fetching clinic details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/search", async (req, res) => {
  try {
    const searchQuery = req.query.q;

    const clinics = await Clinic.find({
      name: new RegExp(searchQuery, "i"),
    }).select("name id address");

    res.json(clinics);
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const clinics = await Clinic.find({})
      .populate({
        path: "employees",
        model: "Employee",
        select: "name email",
      })
      .select("_id name address about phone createdAt");

    res.status(200).json(clinics);
  } catch (error) {
    res.status(500).json({
      message: error.response?.data?.message || "Internal server error",
    });
  }
});

export default router;
