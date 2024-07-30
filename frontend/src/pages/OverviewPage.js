import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useClinicAPI from "../api/useClinicAPI";
import usePatientAPI from "../api/usePatientAPI";
import useAuthCheck from "../hooks/useAuthCheck.js";

const OverviewPage = () => {
  useAuthCheck();  // Check auth status when the component mounts

  const { clinicId } = useParams();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [doctorChoice, setDoctorChoice] = useState("");
  const [referredBy, setReferredBy] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [id, setId] = useState("");
  const [clinicDetails, setClinicDetails] = useState(null);
  const { ClinicDetailsById } = useClinicAPI();
  const { createPatient } = usePatientAPI();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const patientData = {
      name,
      gender,
      maritalStatus,
      address,
      phoneNumber,
      doctorChoice,
      referredBy,
      appointmentDate,
      clinicId,
    };
    console.log(patientData);
    try {
      const result = await createPatient(patientData, token);
      console.log("Patient created successfully:", result);
      // Optionally, redirect or reset form fields
      navigate("/");
    } catch (error) {
      console.error("Error creating patient:", error);
    }
  };

  useEffect(() => {
    // Function to fetch clinic details from the backend
    const fetchClinicDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(clinicId, token);
        const response = await ClinicDetailsById(clinicId, token);
        console.log("this is response", response);
        setClinicDetails(response.clinicDetails);
      } catch (error) {
        console.error("Error fetching clinic details:", error);
      }
    };

    fetchClinicDetails();
  }, [clinicId]);

  if (!clinicDetails) {
    return <div>Loading...</div>;
  }

  const doctorOptions = clinicDetails.employees
    .filter((employee) => employee.type === "Doctor")
    .map((doctor) => (
      <option key={doctor._id} value={doctor._id}>
        {"Dr. " + doctor.name}
      </option>
    ));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="kbd-container mb-4">
        Press <kbd className="kbd kbd-sm">tab</kbd> to move to next field.
      </div>
      <div className="max-w-3xl w-full p-8 bg-gray-100 rounded-lg shadow-md">
        <h4 className="text-2xl font-semi-bold text-center mb-6">
          Patient Form
        </h4>
        <h1 className="text-3xl font-bold text-center mb-1">
          {clinicDetails.name}
        </h1>
        <h6 className="text-1xl font-light text-center mb-1">
          {clinicDetails.about}
        </h6>
        <h5 className="text-1.5xl font-semi-bold text-center mb-1">
          {clinicDetails.address}
        </h5>
        <h5 className="text-1.5xl font-semi-bold text-center mb-6">
          (+91-{clinicDetails.phone})
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-4">
            <div className="w-full max-w-xs">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  id="name"
                  className="grow"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <div className="w-full max-w-xs">
              <select
                id="gender"
                className="select select-bordered w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="transgender">Transgender</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <div className="w-full max-w-xs">
              <select
                id="maritalStatus"
                className="select select-bordered w-full"
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
              >
                <option value="">Select Marital Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="separated">Separated</option>
                <option value="divorced">Divorced</option>
                <option value="living_together">Living Together</option>
                <option value="same_sex_relationship">
                  Same Sex Relationship
                </option>
              </select>
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <div className="w-full max-w-xs">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  id="address"
                  className="grow"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </label>
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <div className="w-full max-w-xs">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  id="phoneNumber"
                  className="grow"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </label>
            </div>
          </div>
          {console.log(clinicDetails.employees)}
          <div className="flex justify-center mb-4">
            <div className="w-full max-w-xs">
              <select
                id="doctorChoice"
                className="select select-bordered w-full"
                value={doctorChoice}
                onChange={(e) => setDoctorChoice(e.target.value)}
              >
                <option value="">Select Doctor</option>
                {doctorOptions}
              </select>
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <div className="w-full max-w-xs">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  id="referredBy"
                  className="grow"
                  placeholder="Referred By"
                  value={referredBy}
                  onChange={(e) => setReferredBy(e.target.value)}
                />
              </label>
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <div className="w-full max-w-xs">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="date"
                  id="appointmentDate"
                  className="grow"
                  placeholder="Appointment Date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                />
              </label>
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <div className="w-full max-w-xs">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  disabled
                  type="text"
                  id="clinicId"
                  className="grow"
                  placeholder="Clinic ID"
                  value={clinicDetails._id}
                  onChange={(e) => setId(e.target.value)}
                />
              </label>
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OverviewPage;
