import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the patient schema
const patientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  maritalStatus: {
    type: String,
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  doctorChoice: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
  },
  referredBy: {
    type: String,
  },
  appointmentDate: {
    type: Date,
  },
  clinicId: {
    type: Schema.Types.ObjectId,
    ref: "Clinic",
  },
});

// Create the Patient model
const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
