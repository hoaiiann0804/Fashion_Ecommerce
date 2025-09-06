import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';
axios.defaults.headers.common['Content-Type'] = 'application/json';
export const BrandService = {
    getBrands: async ()=>{
        try{
            const response = await axios.get(`${API_URL}/api/Brand/GetList`,{
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'Content-Type': 'application/json',
            }
        }
        )
            return response.data;

        }
        catch(error){
            throw error.response || { message: 'Lỗi kết nối server' };
        }
    }

}


