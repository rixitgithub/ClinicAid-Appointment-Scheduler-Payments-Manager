import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Doctors from "../components/Doctors";
import Patients from "../components/Patients";
import Schedule from "../components/Schedule";
import useClinicAPI from "../api/useClinicAPI";

const ManagePage = () => {
  const { clinicId } = useParams(); // Get the clinic ID from the URL
  const { search } = useLocation(); // Get the query parameters from the URL
  const navigate = useNavigate(); // Initialize useNavigate
  const doctorId = new URLSearchParams(search).get("doctorId"); // Get the doctor ID from the query parameters
  const [clinicDetails, setClinicDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { ClinicDetailsById } = useClinicAPI();

  useEffect(() => {
    // Function to fetch clinic details from the backend
    const fetchClinicDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login"); // Redirect to login if token is not present
          return;
        }
        const response = await ClinicDetailsById(clinicId, token);
        if (response.allowed) {
          setClinicDetails(response.clinicDetails);
        } else {
          setClinicDetails({ unauthorizedAccess: true });
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching clinic details:", error);
        if (error.response && error.response.status === 401) {
          navigate("/login"); // Redirect to login on 401 error
        } else {
          setIsLoading(false);
        }
      }
    };

    fetchClinicDetails();
  }, [clinicId, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (clinicDetails.unauthorizedAccess) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-2xl font-bold mb-4">
          You are not authorized to access this page.
        </p>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ3gVfUZwvi5jbnio-srJiyj-oqcsWiqIEfg&s"
          alt="Unauthorized Access"
          className="max-w-full h-auto"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row h-screen">
      {/* Left Section */}
      <div className="flex-[3] h-full bg-gray-200 flex flex-col overflow-auto">
        <Doctors doctors={clinicDetails.employees} />
        <Patients
          clinicId={clinicId}
          patients={clinicDetails.patients}
          doctors={clinicDetails.employees.filter(
            (employee) => employee.type === "Doctor"
          )}
        />
      </div>
      {/* Right Section - Schedule */}
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
