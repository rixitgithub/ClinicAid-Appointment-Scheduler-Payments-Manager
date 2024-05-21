import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000";

const useClinicAPI = () => {
  const navigate = useNavigate();

  const createClinic = (clinicData, token) => {
    return axios
      .post(`${API_URL}/api/clinics`, clinicData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        navigate("/dashboard");
        return response.data;
      })
      .catch((error) => {
        throw new Error(
          error.response?.data?.message || "Something went wrong"
        );
      });
  };

  const getClinic = (token) => {
    return axios
      .get(`${API_URL}/api/clinics/creator`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(
          error.response?.data?.message || "Something went wrong"
        );
      });
  };

  const ClinicDetailsById = (clinicId, token) => {
    console.log(clinicId, token);
    return axios
      .get(`${API_URL}/api/clinics/id/${clinicId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(
          error.response?.data?.message || "Something went wrong"
        );
      });
  };

  const searchClinics = async (query, token) => {
    console.log(query, token);
    const response = await axios.get(
      `${API_URL}/api/clinics/search?q=${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  return { createClinic, getClinic, ClinicDetailsById, searchClinics };
};

export default useClinicAPI;
