import axios from "axios";

const API_URL = "http://localhost:3000";

const useEmailAPI = () => {
  const sendEmail = async (emailData, token) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/email/confirm`,
        emailData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      return response.data;
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }
  };

  return { sendEmail };
};

export default useEmailAPI;
