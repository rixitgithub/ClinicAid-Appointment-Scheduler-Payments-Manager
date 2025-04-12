import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = "https://clinic-aid.onrender.com";

const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await axios.get(`${API_URL}/api/users/checkLoginStatus`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data)
        if (!response.data.isLoggedIn) {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        navigate('/login');
      }
    };

    checkLoginStatus();
  }, [navigate]);
};

export default useAuthCheck;
