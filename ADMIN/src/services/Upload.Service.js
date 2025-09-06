import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post(`${API_URL}/api/Upload/UploadImage`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        const fileName = response.data.imageUrl;
        return fileName.split('/').pop();
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}


