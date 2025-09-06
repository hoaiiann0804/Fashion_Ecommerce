import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
import { isArray } from 'lodash';

export const GetWishList = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/Wish_list/GetAll`, {
            headers: {
                'ngrok-skip-browser-warning': 'true',
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        console.log('Raw API response:', response);
        if(Array.isArray(response.data)){
            return {
                code: 200, 
                data: response.data,
                message:'Success'
            }
        }
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const AddWishList = async (token, productId) => {
    try {
        const response = await axios.post(`${API_URL}/api/Wish_list/Create`, productId,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}


export const DeleteWishList = async (token, productId) => {
    try {
        const response = await axios.delete(`${API_URL}/api/Wish_list/Delete?id=${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
            }
        });
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}