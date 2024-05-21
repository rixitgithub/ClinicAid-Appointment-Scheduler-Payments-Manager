import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the schedule schema
const scheduleSchema = new Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: "Doctor", // Reference to the Doctor model
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
    ref: "Patient", // Reference to the Patient model
    required: true,
  },
  clinicId: {
    type: Schema.Types.ObjectId,
    ref: "Clinic",
  },
});

// Create the Schedule model
const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;
