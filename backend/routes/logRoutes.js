// routes/clinicRoutes.js

import express from "express";
import Clinic from "../models/Clinic.js";
import { verifyToken } from "../middleware/auth.js";
import Logs from "../models/Logs.js";

const router = express.Router();

router.get("/:clinicId", verifyToken, async (req, res) => {
  try {
    const { clinicId } = req.params;
    const { date } = req.query; // Get the date from the query parameters

    // Ensure the date is in the correct format
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    // Fetch logs for the given clinicId and date
    const logs = await Logs.find({
      clinicId,
      time: { $gte: startDate, $lte: endDate },
    }).sort({ time: -1 });

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching logs", error });
  }
});

export default router;
