import axios from 'axios';
const API = import.meta.env.VITE_API_URL;

export const getBanner = async () =>{
    try{
        const response = await axios.get(`${API}/api/Banner/GetBannerList`,{
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch(error){
        throw error.response || {message: 'Lỗi kết nối server'};
    }
}