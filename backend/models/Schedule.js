import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the schedule schema
const scheduleSchema = new Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  clinicId: {
    type: Schema.Types.ObjectId,
    ref: "Clinic",
  },
  status: {
    type: String,
    enum: ["upcoming", "completed", "missed"],
    default: "upcoming",
  },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;
