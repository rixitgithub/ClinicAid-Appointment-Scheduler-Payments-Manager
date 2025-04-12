import axios from "axios";
const API_URL = "https://clinicaid-appointment-scheduler-payments.onrender.com";
// const API_URL = "http://localhost:5000";

const usePatientAPI = () => {
  const createPatient = async (patientData, token) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/patients`,
        patientData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating patient:", error);
      throw new Error("Failed to create patient");
    }
  };

  return { createPatient };
};

export default usePatientAPI;
