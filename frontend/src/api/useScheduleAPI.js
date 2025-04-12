import axios from "axios";

const API_URL = "https://clinicaid-appointment-scheduler-payments.onrender.com";
// const API_URL = "http://localhost:5000";

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

  const updateEventStatus = async (eventId, status, token) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/schedules/update-status`,
        { eventId, status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating event ${eventId} status:`, error);
      throw new Error(`Failed to update event ${eventId} status`);
    }
  };

  const fetchAppointmentsByPatient = async (patientId) => {
    try {
      const response = await axios.get(`${API_URL}/api/schedules/find`, {
        headers: { Authorization: `Bearer ${patientId}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching appointments:", error);
      throw error;
    }
  };

  const fetchAppointmentsToday = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/schedules/find/today`);
      return response.data;
    } catch (error) {
      console.error("Error fetching today's appointments:", error);
      throw error;
    }
  };

  const fetchTotalPatients = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/api/schedules/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching total patients:", error);
      throw error;
    }
  };

  const fetchPatientsThisMonth = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/api/schedules/this-month`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching patients this month:", error);
      throw error;
    }
  };

  return {
    createSchedule,
    updateEventStatus,
    fetchAppointmentsByPatient,
    fetchAppointmentsToday,
    fetchTotalPatients,
    fetchPatientsThisMonth,
  };
};

export default useScheduleAPI;
