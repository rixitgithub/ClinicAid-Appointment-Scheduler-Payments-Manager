import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Doctors from "../components/Doctors";
import Patients from "../components/Patients";
import Schedule from "../components/Schedule";
import useClinicAPI from "../api/useClinicAPI";

const ManagePage = () => {
  const { clinicId } = useParams(); // Get the clinic ID from the URL
  const { search } = useLocation(); // Get the query parameters from the URL
  const doctorId = new URLSearchParams(search).get("doctorId"); // Get the doctor ID from the query parameters
  const [clinicDetails, setClinicDetails] = useState(null);
  const { ClinicDetailsById } = useClinicAPI();

  useEffect(() => {
    // Function to fetch clinic details from the backend
    const fetchClinicDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(clinicId);
        const response = await ClinicDetailsById(clinicId, token);
        console.log("this is response" + response);
        setClinicDetails(response);
      } catch (error) {
        console.error("Error fetching clinic details:", error);
      }
    };

    fetchClinicDetails();
  }, [clinicId]);

  if (!clinicDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="flex-[3] h-full bg-gray-200 flex flex-col">
        {console.log(clinicDetails)}
        <Doctors doctors={clinicDetails.employees} />
        {console.log(clinicDetails.patients)}
        <Patients
          clinicId={clinicId}
          patients={clinicDetails.patients}
          doctors={clinicDetails.employees.filter(
            (employee) => employee.type === "Doctor"
          )}
        />
      </div>
      {/* Right Section - Schedule */}
      {console.log(clinicDetails.schedules)}
      <div className="flex-[7] h-full bg-white p-4 overflow-auto relative">
        <h2 className="text-2xl font-bold mb-4">Schedule</h2>
        {doctorId && clinicDetails.schedules && (
          <Schedule schedule={clinicDetails.schedules} doctorId={doctorId} />
        )}
        {doctorId && !clinicDetails.schedules && (
          <p>No schedules available for this doctor.</p>
        )}
        {!doctorId && <p>Please select a doctor to view the schedule.</p>}
      </div>
    </div>
  );
};

export default ManagePage;
