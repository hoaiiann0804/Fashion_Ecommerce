// services/auth.js
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

export const login = async (email, password) => {
    try {
      const response = await axios.post(`${API}/api/Admin/Login`, {
        admiN_EMAIL: email,
        admiN_PASSWORD: password,
      });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        admiN_EMAIL: email,
        admiN_NAME: response.data.name || email.split('@')[0] 
      }));
      
      return response.data;
    } catch (error) {
      return error.response ? error.response.data : { message: 'An error occurred' };
    }
};