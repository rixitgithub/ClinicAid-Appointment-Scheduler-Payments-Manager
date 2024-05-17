import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000";

const useUserAPI = () => {
  const navigate = useNavigate();

  const register = (userData) => {
    console.log({ userData }); // Log to indicate data being sent
    return axios
      .post(`${API_URL}/api/users`, userData)
      .then((response) => {
        console.log(response.data); // Log the response data
        navigate("/login"); // Use navigate to redirect to the login page
        return response.data;
      })
      .catch((error) => {
        console.error(error.response.data.message || "Something went wrong"); // Log the error message
        throw new Error(error.response.data.message || "Something went wrong");
      });
  };

  // Add more API methods as needed

  return { register };
};

export default useUserAPI;
