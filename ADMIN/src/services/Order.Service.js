import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const OrderNew = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/Order/GetNew`);
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

