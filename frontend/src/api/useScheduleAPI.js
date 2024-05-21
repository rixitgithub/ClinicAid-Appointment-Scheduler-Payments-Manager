import axios from "axios";

const API_URL = "http://localhost:3000";

const useScheduleAPI = () => {
  const createSchedule = async (scheduleData, token) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/schedules/create`,
        scheduleData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating schedule:", error);
      throw new Error("Failed to create schedule");
    }
  };

  return { createSchedule };
};

export default useScheduleAPI;
