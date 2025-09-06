import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const getBrands = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/Brand/GetList`,{
            headers:{
                      'ngrok-skip-browser-warning': 'true'
            }
        }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching brands:', error);
        throw error;
    }
}

export const addBrand = async (brand) => {
    try {
        const response = await axios.post(
        `${API_URL}/api/Brand/Create`,
        {
            branD_NAME: brand.branD_NAME,
            branD_IMAGE: brand.image,
            branD_STATUS: brand.status ? "ACTIVE" : "INACTIVE",
            description: brand.description,
        },
        {
            headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
        
            },
        }
        );
        return response.data;
    } catch (error) {
        console.error('Error adding brand:', error);
        throw error;
    }
};

export const updateBrand = async (brand) => {
    try {
        const response = await axios.put(
        `${API_URL}/api/Brand/Update`,
        {
            branD_ID: brand.branD_ID,
            branD_NAME: brand.branD_NAME,
            branD_IMAGE: brand.branD_IMAGE,
            branD_STATUS: brand.branD_STATUS ? "ACTIVE" : "INACTIVE",
            description: brand.description,
        },
        {
            headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
            },
        }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating brand:', error);
        throw error;
    }
};

export const deleteBrand = async (brandId) => {
    try {
        const response = await axios.delete(`${API_URL}/api/Brand/Delete?id=${brandId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            }
        });
        return response.data;
    }
    catch (error) {
        console.error('Error deleting brand:', error);
        throw error;
    }
};

