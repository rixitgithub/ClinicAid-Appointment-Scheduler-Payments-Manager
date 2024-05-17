// useClinicAPI.js

import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000";

const useClinicAPI = () => {
  const navigate = useNavigate();

  const createClinic = (clinicData, token) => {
    console.log({ clinicData }); // Log to indicate data being sent
    return axios
      .post(`${API_URL}/api/clinics`, clinicData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data); // Log the response data
        navigate("/dashboard"); // Use navigate to redirect to the dashboard
        return response.data;
      })
      .catch((error) => {
        console.error(error.response.data.message || "Something went wrong"); // Log the error message
        throw new Error(error.response.data.message || "Something went wrong");
      });
  };

  return { createClinic };
};

export default useClinicAPI;
