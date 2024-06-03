import Patient from "../models/Patient.js";
import Employee from "../models/Employee.js";
import Logs from "../models/Logs.js";

export const createPatient = async (req, res) => {
  try {
    const { body, user } = req;

    const mydoctor = await Employee.findById(body.doctorChoice);
    if (!mydoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Check if the appointmentDate is valid
    const appointmentDate = new Date(body.appointmentDate);
    if (isNaN(appointmentDate.getTime())) {
      return res.status(400).json({ message: "Invalid appointment date" });
    }

    // Format the appointment date to a readable format
    function formatDate(date) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      return date.toLocaleDateString(undefined, options);
    }

    const formattedAppointmentDate = formatDate(appointmentDate);

    console.log("by - " + body.name);
    console.log("what - " + "enquired about an appointment for ");
    console.log("for - " + mydoctor.name);
    console.log("when (formatted) - " + formattedAppointmentDate);
    console.log("clinicId " + body.clinicId);

    const newLog = new Logs({
      by: body.name,
      what: "enquired about an appointment for",
      for: mydoctor.name,
      date: formattedAppointmentDate,
      clinicId: body.clinicId,
    });

    try {
      const savedLog = await newLog.save();
      console.log("Log entry saved successfully:", savedLog);
    } catch (logError) {
      console.error("Error saving log entry:", logError);
      return res
        .status(500)
        .json({ message: "Error saving log entry", error: logError });
    }

    const newPatient = new Patient({
      ...body,
      userId: user.id,
    });

    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    console.error("Error creating patient:", error);
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
