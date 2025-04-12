import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useClinicAPI from "../api/useClinicAPI";

const TopClinics = () => {
  const navigate = useNavigate();
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getClinics } = useClinicAPI();

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getClinics(token);
        setClinics(data);
      } catch (error) {
        console.error("Error fetching clinics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading clinics...</div>;
  }

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Clinics to Book</h1>
      <p className="text-sm w-1/3 text-center">
        Browse and select a clinic to book your appointment.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {clinics.map((clinic, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/${clinic._id}/overview`);
              window.scrollTo(0, 0);
            }}
            className="border border-blue-200 rounded-xl cursor-pointer hover:translate-y-[-10px] transition-all duration-500 p-4"
          >
            <p className="text-gray-900 text-lg font-semibold">{clinic.name}</p>
            <p className="text-gray-600 text-sm mb-1">{clinic.address}</p>
            <p className="text-gray-500 text-sm italic mb-1">{clinic.about}</p>
            <p className="text-sm text-gray-700 mb-1">📞 {clinic.phone}</p>
            <p className="text-xs text-gray-400">
              Added on {new Date(clinic.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopClinics;
