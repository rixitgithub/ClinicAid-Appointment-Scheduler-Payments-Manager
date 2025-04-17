import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import clinicRoutes from "./routes/clinicRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import cron from "node-cron";
import sendReminders from "./routes/sendRemindersRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(bodyParser.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/clinics", clinicRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/logs", logRoutes);

cron.schedule("27 17 * * *", () => {
  sendReminders();
});


mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
