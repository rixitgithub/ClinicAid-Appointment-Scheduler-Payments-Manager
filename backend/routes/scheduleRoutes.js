import express from "express";
import Schedule from "../models/Schedule.js";

const router = express.Router();

// Create a new schedule
router.post("/create", async (req, res) => {
  try {
    const newSchedule = new Schedule(req.body);
    await newSchedule.save();
    console.log(newSchedule);
    res.status(201).json(newSchedule);
  } catch (error) {
    console.error("Error creating schedule:", error);
    res.status(500).json({ message: "Failed to create schedule" });
  }
});

// Other route handlers for getting, updating, or deleting schedules can be added here

export default router;
