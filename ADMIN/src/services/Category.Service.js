import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const getCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/Category/GetList`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

export const addCategory = async (category) => {
    try {
        const response = await axios.post(
        `${API_URL}/api/Category/Create`,
        {
            categorY_NAME: category.categorY_NAME,
            categorY_IMAGE: category.image,
            categorY_STATUS: category.categorY_STATUS || 'ACTIVE',
            description: category.description,
            icoN_NAME: category.icoN_NAME,
            icoN_COLOR: category.icoN_COLOR,
        },
        {
            headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            },
        }
        );
        return response.data;
    } catch (error) {
        console.error('Error adding category:', error);
        throw error;
    }
};

export const updateCategory = async (category) => {
    try {
        const response = await axios.put(
        `${API_URL}/api/Category/Update`,
        {
            categorY_ID: category.categorY_ID,
            categorY_NAME: category.categorY_NAME,
            categorY_IMAGE: category.image,
            categorY_STATUS: category.categorY_STATUS,
            description: category.description,
            icoN_NAME: category.icoN_NAME,
            icoN_COLOR: category.icoN_COLOR,
        },
        {
            headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            },
        }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating brand:', error);
        throw error;
    }
};

export const deleteCategory = async (categoryId) => {
    try {
        const response = await axios.delete(`${API_URL}/api/Category/Delete?id=${categoryId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        });
        return response;
    }
    catch (error) {
        return error || { message: 'Lỗi không xác định' };
    }
};

