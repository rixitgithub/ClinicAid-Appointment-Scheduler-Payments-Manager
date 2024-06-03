import express from "express";
import Schedule from "../models/Schedule.js";
import Patient from "../models/Patient.js";
import Clinic from "../models/Clinic.js";
import Logs from "../models/Logs.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Create a new schedule
router.post("/create", verifyToken, async (req, res) => {
  try {
    const patientId = req.body.patientId;

    // Fetch the patient information
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res
        .status(404)
        .json({ message: `Patient with ID ${patientId} not found` });
    }

    const patientName = patient.name;
    const newLog = new Logs({
      by: req.user.id,
      what: "scheduled an appointment of",
      for: patient.name,
      date: req.body.date,
      clinicId: req.body.clinicId,
    });

    try {
      const savedLog = await newLog.save();
    } catch (logError) {
      console.error("Error saving log entry:", logError);
      return res
        .status(500)
        .json({ message: "Error saving log entry", error: logError });
    }
    const newSchedule = new Schedule(req.body);
    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    console.error("Error creating schedule:", error);
    res.status(500).json({ message: "Failed to create schedule" });
  }
});

router.post("/update-status", async (req, res) => {
  try {
    console.log("hiiiiiiiiiiiiiiiiiiiiiiiiii");
    console.log("body ------------------", req.body);
    const { eventId, status } = req.body;

    // Find the schedule by eventId and populate doctor and patient details
    const schedule = await Schedule.findById(eventId)
      .populate("doctorId", "name") // Assuming Employee schema has a 'name' field
      .populate("patientId", "name"); // Assuming Patient schema has a 'name' field

    if (!schedule) {
      return res
        .status(404)
        .json({ message: `Schedule with ID ${eventId} not found` });
    }

    // Update the status of the schedule
    schedule.status = status;
    await schedule.save();

    // Extract doctor name and patient name from the populated fields
    const doctorName = schedule.doctorId.name;
    const patientName = schedule.patientId.name;

    // Determine the log message based on the status
    let logMessage = "";
    if (status === "completed") {
      logMessage = `completed their appointment with `;
    } else if (status === "missed") {
      logMessage = `missed their appointment with `;
    } else {
      logMessage = `Updated status to ${status}`;
    }

    // Create a new log entry
    const newLog = new Logs({
      time: new Date(),
      by: doctorName,
      what: logMessage,
      for: patientName,
      date: schedule.date.toISOString().split("T")[0], // Format the date as YYYY-MM-DD
      clinicId: schedule.clinicId,
    });
    await newLog.save();

    res
      .status(200)
      .json({ message: `Event ${eventId} status updated to ${status}` });
  } catch (error) {
    console.error(`Error updating schedule status for ID ${eventId}:`, error);
    res
      .status(500)
      .json({ message: `Failed to update schedule status for ID ${eventId}` });
  }
});

// Find schedules for a patient
router.get("/find", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const patients = await Patient.find({ userId });

    if (!patients.length) {
      return res
        .status(404)
        .json({ message: `No patients found for user ID ${userId}` });
    }

    const patientIds = patients.map((patient) => patient._id);

    // Fetch schedules and populate doctor, clinic, and patient data
    const schedules = await Schedule.find({ patientId: { $in: patientIds } })
      .populate("doctorId", "name phone email specialization")
      .populate("clinicId", "name address")
      .populate("patientId", "name phone phoneNumber");

    if (!schedules.length) {
      return res
        .status(404)
        .json({ message: `No schedules found for user ID ${userId}` });
    }
    res.status(200).json(schedules);
  } catch (error) {
    console.error(
      `Error fetching schedules for user ID ${req.user._id}:`,
      error
    );
    res.status(500).json({
      message: `Failed to fetch schedules for user ID ${req.user._id}`,
      error,
    });
  }
});

// Find today's appointments excluding missed ones
router.get("/find/today", async (req, res) => {
  try {
    const today = new Date();

    // Set start of the day to 00:00:00
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));

    // Set end of the day to 23:59:59
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const appointments = await Schedule.find({
      date: { $gte: startOfDay, $lt: endOfDay },
      status: { $ne: "missed" }, // Exclude missed appointments
    });

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching today's appointments:", error);
    res.status(500).json({ message: "Failed to fetch today's appointments" });
  }
});

router.get("/all", verifyToken, async (req, res) => {
  try {
    // Step 1: Find the clinics created by the user
    const clinics = await Clinic.find({ createdBy: req.user.id }).select("_id");

    if (!clinics.length) {
      return res
        .status(404)
        .json({ message: "No clinics found for this user" });
    }

    const clinicIds = clinics.map((clinic) => clinic._id);

    // Step 2 & 3: Find schedules with these clinic IDs, exclude "missed" status, and count distinct patient IDs
    const totalPatients = await Schedule.aggregate([
      { $match: { clinicId: { $in: clinicIds }, status: { $ne: "missed" } } },
      { $group: { _id: "$patientId" } },
      { $count: "totalPatients" },
    ]);

    const count = totalPatients.length ? totalPatients[0].totalPatients : 0;

    res.status(200).json({ totalPatients: count });
  } catch (error) {
    console.error("Error fetching total patients:", error);
    res.status(500).json({ message: "Failed to fetch total patients" });
  }
});

// Get number of patients registered this month
router.get("/this-month", verifyToken, async (req, res) => {
  try {
    // Step 1: Find the clinics created by the user
    const clinics = await Clinic.find({ createdBy: req.user.id }).select("_id");

    if (!clinics.length) {
      return res
        .status(404)
        .json({ message: "No clinics found for this user" });
    }

    const clinicIds = clinics.map((clinic) => clinic._id);

    // Step 2 & 3: Find schedules with these clinic IDs, exclude "missed" status, and count distinct patient IDs
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ); // Setting last day of month correctly

    const totalPatients = await Schedule.aggregate([
      {
        $match: {
          clinicId: { $in: clinicIds },
          status: { $ne: "missed" },
          date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
        },
      },
      { $group: { _id: "$patientId" } },
      { $count: "totalPatients" },
    ]);

    const count = totalPatients.length ? totalPatients[0].totalPatients : 0;
    res.status(200).json({ totalPatients: count });
  } catch (error) {
    console.error("Error fetching total patients:", error);
    res.status(500).json({ message: "Failed to fetch total patients" });
  }
});

export default router;
