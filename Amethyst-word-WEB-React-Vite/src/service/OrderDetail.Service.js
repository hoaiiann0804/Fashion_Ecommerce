import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const CreateOrderDetail = async ( orderId, input) => {
    try {
        const response = await axios.post(
            `${API_URL}/api/Order/CreateOrderDetail`, 
            input,
            {
                params: {
                    OrderId: orderId
                },
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
            
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const GetOrderDetail = async (orderId) => {
    try {
        const response = await axios.get(`${API_URL}/api/Order/GetOrderDetail`, {
            params: { id: orderId }
        });
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
};