import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useClinicAPI from "../api/useClinicAPI";
import usePatientAPI from "../api/usePatientAPI";
import useAuthCheck from "../hooks/useAuthCheck.js";

const OverviewPage = () => {
  useAuthCheck();

  const { clinicId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    maritalStatus: "",
    address: "",
    phoneNumber: "",
    doctorChoice: "",
    referredBy: "",
    appointmentDate: "",
  });

  const [clinicDetails, setClinicDetails] = useState(null);
  const { ClinicDetailsById } = useClinicAPI();
  const { createPatient } = usePatientAPI();

  useEffect(() => {
    const fetchClinicDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await ClinicDetailsById(clinicId, token);
        setClinicDetails(response.clinicDetails);
      } catch (error) {
        console.error("Error fetching clinic details:", error);
      }
    };

    fetchClinicDetails();
  }, [clinicId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      await createPatient({ ...formData, clinicId }, token);
      navigate("/");
    } catch (error) {
      console.error("Error creating patient:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!clinicDetails) return <div>Loading...</div>;

  const doctorOptions = clinicDetails.employees
    .filter((emp) => emp.type === "Doctor")
    .map((doc) => (
      <option key={doc._id} value={doc._id}>
        Dr. {doc.name}
      </option>
    ));

  return (
    <div className="p-4 sm:p-8 bg-blue-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Clinic Info */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 border border-gray-300 rounded-xl bg-white p-6 shadow">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {clinicDetails.name}
            </h1>
            <p className="text-gray-600 mb-1">{clinicDetails.about}</p>
            <p className="text-gray-600 mb-1">{clinicDetails.address}</p>
            <p className="text-gray-600">+91-{clinicDetails.phone}</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Patient Information
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="input input-bordered w-full"
              required
            />
            <select
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="transgender">Transgender</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
            <select
              id="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Marital Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="separated">Separated</option>
              <option value="divorced">Divorced</option>
              <option value="living_together">Living Together</option>
              <option value="same_sex_relationship">
                Same Sex Relationship
              </option>
            </select>
            <input
              id="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="input input-bordered w-full"
            />
            <input
              id="phoneNumber"
              type="text"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="input input-bordered w-full"
            />
            <select
              id="doctorChoice"
              value={formData.doctorChoice}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Doctor</option>
              {doctorOptions}
            </select>
            <input
              id="referredBy"
              type="text"
              value={formData.referredBy}
              onChange={handleChange}
              placeholder="Referred By"
              className="input input-bordered w-full"
            />
            <input
              id="appointmentDate"
              type="date"
              value={formData.appointmentDate}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <div className="sm:col-span-2 flex justify-center mt-4">
              <button
                type="submit"
                className={`btn btn-primary w-40 flex justify-center items-center ${
                  loading ? "cursor-not-allowed opacity-70" : ""
                }`}
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
