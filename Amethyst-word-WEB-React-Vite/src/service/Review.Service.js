import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const getReview = async (productId) => {
    try {
        const response = await axios.get(`${API_URL}/api/Product/Get_Rate_Comment?id=${productId}`,
            {
            
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}