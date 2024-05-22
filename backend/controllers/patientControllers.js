import Patient from "../models/Patient.js";

// Create a new patient
export const createPatient = async (req, res) => {
  try {
    const { body, user } = req;
    console.log(req.user.id);
    const newPatient = new Patient({
      ...body,
      userId: user.id,
    });
    const savedPatient = await newPatient.save();
    console.log("hi");
    console.log(savedPatient);
    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(500).json({ message: "Error creating patient", error });
  }
};

// Get all patients
export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patients", error });
  }
};

// Get a patient by ID
export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient", error });
  }
};

// Update a patient
export const updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(500).json({ message: "Error updating patient", error });
  }
};

// Delete a patient
export const deletePatient = async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting patient", error });
  }
};
