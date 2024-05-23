import React, { useState, useRef } from "react";
import useScheduleAPI from "../api/useScheduleAPI";
import useEmailAPI from "../api/useEmailAPI"; // Import the hook to handle email sending
import { formatISODate } from "../utils/formatDate";

const Patients = ({ patients, doctors, clinicId }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const modalRef = useRef(null);

  const { createSchedule } = useScheduleAPI();
  const { sendEmail } = useEmailAPI(); // Use the hook to handle email sending

  const openModal = (patient) => {
    setSelectedPatient(patient);
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = () => {
    // Clear form fields when closing modal
    setSelectedDoctor("");
    setDate("");
    setStartTime("");
    setEndTime("");

    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const scheduleData = {
      date,
      startTime,
      endTime,
      patientId: selectedPatient._id,
      doctorId: selectedDoctor,
      clinicId,
    };
    const token = localStorage.getItem("token");
    console.log(scheduleData);
    try {
      const result = await createSchedule(scheduleData, token);

      // If schedule is successfully created, send email
      if (result) {
        const emailData = {
          to: selectedPatient._id,
          scheduleData,
        };
        await sendEmail(emailData, token);
      }
    } catch (error) {
      console.error("Error creating schedule:", error);
    }
  };

  // Function to generate time options with 15-minute intervals
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 1; hour <= 12; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        options.push(`${formattedHour}:${formattedMinute} AM`);
      }
    }
    for (let hour = 1; hour <= 12; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        options.push(`${formattedHour}:${formattedMinute} PM`);
      }
    }
    return options;
  };

  return (
    <div className="flex-1 bg-white p-4">
      <h2 className="text-xl font-semibold mb-4">Patients</h2>
      {patients.map((patient, index) => (
        <div
          key={index}
          className="mb-2 p-2 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-300"
        >
          <div className="flex justify-between items-center">
            <p onClick={() => openModal(patient)}>
              <strong>{patient.name} </strong>(
              {formatISODate(patient.appointmentDate)})
            </p>
            <p onClick={() => openModal(patient)} className="ml-4 text-right">
              Dr. {patient.doctorChoice.name}
            </p>
          </div>
        </div>
      ))}
      {selectedPatient && (
        <div>
          <dialog id="patient_modal" className="modal" ref={modalRef}>
            <div className="modal-box">
              <form method="dialog" onSubmit={handleBookingSubmit}>
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={closeModal}
                >
                  ✕
                </button>
                <h3 className="font-bold text-lg">{selectedPatient.name}</h3>
                <p>
                  <strong>Gender:</strong> {selectedPatient.gender}
                </p>
                <p>
                  <strong>Marital Status:</strong>{" "}
                  {selectedPatient.maritalStatus}
                </p>
                <p>
                  <strong>Address:</strong> {selectedPatient.address}
                </p>
                <p>
                  <strong>Phone Number:</strong> {selectedPatient.phoneNumber}
                </p>
                <p>
                  <strong>Doctor Preference:</strong>{" "}
                  {"Dr. " + selectedPatient.doctorChoice.name}
                </p>
                <p>
                  <strong>Referred By:</strong> {selectedPatient.referredBy}
                </p>
                <p>
                  <strong>Appointment Date:</strong>{" "}
                  {formatISODate(selectedPatient.appointmentDate)}{" "}
                  {/* Format the appointment date */}
                </p>
                <hr className="my-8" />
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Schedule Appointment
                  </h2>
                  <div className="mb-4">
                    <label htmlFor="doctor">Select Doctor:</label>
                    <select
                      id="doctor"
                      className="select select-bordered w-full"
                      value={selectedDoctor}
                      onChange={(e) => setSelectedDoctor(e.target.value)}
                      required
                    >
                      <option value="">Select Doctor</option>
                      {doctors
                        .filter((doctor) => doctor.type === "Doctor")
                        .map((doctor) => (
                          <option key={doctor._id} value={doctor._id}>
                            Dr. {doctor.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="date">Date:</label>
                    <input
                      type="date"
                      id="date"
                      className="input input-bordered"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="startTime">Start Time:</label>
                    <select
                      id="startTime"
                      className="select select-bordered w-full"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                    >
                      <option value="">Select Time</option>
                      {generateTimeOptions().map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="endTime">End Time:</label>
                    <select
                      id="endTime"
                      className="select select-bordered w-full"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      required
                    >
                      <option value="">Select Time</option>
                      {generateTimeOptions().map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <button type="submit" className="btn btn-primary">
                      Book {selectedPatient.name}'s Appointment
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default Patients;
