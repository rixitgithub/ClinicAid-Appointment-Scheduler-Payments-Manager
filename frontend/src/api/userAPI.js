import axios from "axios";

const API_URL = "http://localhost:3000";

const userAPI = {
  register: async (userData) => {
    console.log({ userData }); // Log to indicate data being sent
    try {
      const response = await axios.post(`${API_URL}/api/users`, userData);
      console.log(response.data); // Log the response data
      return response.data;
    } catch (error) {
      console.error(error.response.data.message || "Something went wrong"); // Log the error message
      throw new Error(error.response.data.message || "Something went wrong");
    }
  },
  // Add more API methods as needed
};

export default userAPI;
