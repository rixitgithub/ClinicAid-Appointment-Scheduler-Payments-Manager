import mongoose from "mongoose";

const { Schema } = mongoose;

const logsSchema = new Schema({
  time: {
    type: Date,
    required: true,
    default: Date.now,
  },
  by: {
    type: String,
    required: true,
  },
  what: {
    type: String,
    required: true,
  },
  for: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  clinicId: {
    type: Schema.Types.ObjectId,
    ref: "Clinic",
  },
});

const Logs = mongoose.model("Logs", logsSchema);

export default Logs;
