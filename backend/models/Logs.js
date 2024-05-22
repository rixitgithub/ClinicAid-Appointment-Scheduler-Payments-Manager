import mongoose from "mongoose";

const { Schema } = mongoose;

const logsSchema = new Schema({
  date: {
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
});

const Logs = mongoose.model("Logs", logsSchema);

export default Logs;
