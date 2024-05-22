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
    enum: ["male", "female", "transgender", "other", "prefer_not_to_say"],
  },
  maritalStatus: {
    type: String,
    enum: [
      "single",
      "married",
      "separated",
      "divorced",
      "living_together",
      "same_sex_relationship",
    ],
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
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Create the Patient model
const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
