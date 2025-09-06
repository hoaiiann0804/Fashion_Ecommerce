import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const GetUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/Dashboard/GetUser`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

export const GetOrder = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/Dashboard/GetOrder`);
        return response.data;
    } catch (error) {
        console.error('Error fetching order data:', error);
        throw error;
    }
}

export const GetRevenueTotal = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/Dashboard/GetRevenueTotal`);
        return response.data;
    } catch (error) {
        console.error('Error fetching revenue data:', error);
        throw error;
    }
}

export const GetRevenueByYear = async (input) =>{
    try {
        const response = await axios.get(`${API_URL}/api/Dashboard/GetRevenueByYear?input=${input}`);
        return response.data;
    } catch(error) {
        console.log(error.response)
    }
}

export const GetRevenueByMonth = async (input) =>{
    try {
        const response = await axios.get(`${API_URL}/api/Dashboard/GetRevenueByMonth?input=${input}`);
        return response.data;
    } catch(error) {
        console.log(error.response)
    }
}

export const GetRevenueByWeek = async (input) =>{
    try {
        const response = await axios.get(`${API_URL}/api/Dashboard/GetRevenueByWeek?input=${input}`);
        return response.data;
    } catch(error) {
        console.log(error.response)
    }
}