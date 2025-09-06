import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL

export const CreateOrder = async (token, input) => {
    try {
        const response = await axios.post(`${API_URL}/api/Order/CreateOrder`, input, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        localStorage.setItem('orderId', response.data.result);
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const GetStatus = async (token, id) => {
    try {
        const response = await axios.get(`${API_URL}/api/Order/GetStatus?id=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                'ngrok-skip-browser-warning': 'true',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const getOrder = async (token , id) =>{
    try{
        const response = await axios.get(`${API_URL}/api/Order/GetOrder?id=${id}`,{
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    catch(error){
        throw error.response || { message: 'Lỗi kết nối server' };

    }
}

export const createOrderDetail = async( OrderId, orderDetails)=>{
    try{
        const response = await axios.post(`${API_URL}/api/Order/CreateOrderDetail?OrderId=${OrderId}`,orderDetails,{
        headers: {
            'Content-Type': 'application/json',
            
            
        },
    })
    return response.data
}
        
    catch(error){
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}