import React, { useEffect, useState } from "react";
import useClinicAPI from "../api/useClinicAPI";
import ClinicInfo from "./ClinicInfo.js";
import ClinicEmployeeList from "./ClinicEmployeeList.js";
import ClinicStats from "../components/ClinicStats.js";
import ClinicLogs from "../components/ClinicLogs.js";
import { useNavigate } from "react-router-dom";

const ClinicDetailsPage = () => {
  const [clinic, setClinic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getClinic } = useClinicAPI();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClinic = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        if (!token) {
          throw new Error("Authentication token not found");
        }
        const data = await getClinic(token);
        setClinic(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClinic();
  }, [getClinic]);

  const handleShowDetails = () => {
    console.log("Show details button clicked");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    if (error === "Clinic not found for this user") {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="max-w-3xl w-full p-8 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-6">
              Clinic Details
            </h1>
            <div className="text-center">
              <p>You don't have a clinic under ClinicAid</p>
              <a href="/profile" className="mt-4 btn btn-primary">
                Add Your Clinic
              </a>
            </div>
          </div>
        </div>
      );
    }
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full p-8 bg-gray-100 rounded-lg shadow-md relative">
        {console.log(clinic)}
        <button
          className="absolute top-4 right-4 btn btn-primary"
          onClick={() => navigate(`/${clinic._id}/manage`)}
        >
          Show Details
        </button>

        <h1 className="text-3xl font-bold text-center mb-6">Clinic Details</h1>
        <ClinicInfo clinic={clinic} />
        <hr className="my-8" />
        <ClinicStats />
        <hr className="my-8" />
        <ClinicLogs clinic={clinic} />
        <hr className="my-8" />
        <ClinicEmployeeList employees={clinic.employees} />
      </div>
    </div>
  );
};

export default ClinicDetailsPage;
