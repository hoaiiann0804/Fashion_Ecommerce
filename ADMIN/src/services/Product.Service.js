import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const ProductNew = async (input) => {
    try {
        const response = await axios.get(`${API_URL}/api/Product/ProductNew`, {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
            params: {
                input: input,
            }
        });
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const ProductBestSeller = async (input) => {
    try {
        const response = await axios.get(`${API_URL}/api/Product/ProductBestSeller?input=5`, {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
            params: {
                input: input,
            }
        });
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const ProductSaleNoPaging = async (input) => {
    try {
        const response = await axios.get(`${API_URL}/api/Product/DiscountHome`, {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
            params: {
                input: input,
            }
        });
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const GetProductDetail = async (input) => {
    try {
        const response = await axios.get(`${API_URL}/api/Product/Detail`, {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
            params: {
                input: input,
            }
        });
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const ProductPaging = async (pageNumber = 1, pageSize = 10) => {
    try {
        const response = await axios.get(`${API_URL}/api/Product/ProductList`, {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
            params: {
                pageNumber: pageNumber,
                pageSize: pageSize,
            }
        });
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const SerchProduct = async (input, pageNumber, pageSize) => {
    try {
        const response = await axios.get(`${API_URL}/api/Product/Search`, {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
            params: {
                name: input,
                pageNumber: pageNumber,
                pageSize: pageSize,
            }
        });
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const FillterProduct = async (input, pageNumber, pageSize) => {
    try {
        const response = await axios.get(`${API_URL}/api/Product/Fillter`, {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
            params: {
                brandId: input.brandId,
                categoryId: input.categoryId,
                priceMin: input.priceMin,
                pricaMax: input.priceMax,
                pageNumber: pageNumber,
                pageSize: pageSize,
            }
        });
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const CreateProduct = async (input) => {
    try {
        const response = await axios.post(`${API_URL}/api/Product/Create`,{
            producT_NAME: input.producT_NAME,
            producT_PRICE: input.producT_PRICE,
            producT_DETAIL: input.producT_DETAIL,
            producT_DESCRIPTION: input.producT_DESCRIPTION,
            branD_ID: input.branD_ID,
            categorY_ID: input.categorY_ID,
            producT_STATUS: input.producT_STATUS
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const UpdateProduct = async (input) => {
    try {
        const response = await axios.put(`${API_URL}/api/Product/Update`,{
            producT_ID: input.producT_ID,
            producT_NAME: input.producT_NAME,
            producT_PRICE: input.producT_PRICE,
            producT_DETAIL: input.producT_DETAIL,
            producT_DESCRIPTION: input.producT_DESCRIPTION,
            branD_ID: input.branD_ID,
            categorY_ID: input.categorY_ID,
            producT_STATUS: input.producT_STATUS
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'ngrok-skip-browser-warning': 'true'
            }
        });
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const DeleteProduct = async (input) => {
    try {
        const response = await axios.delete(`${API_URL}/api/Product/Delete?id=${input}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'ngrok-skip-browser-warning': 'true'
            }
        });
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const CreateProductImage = async (input) => {
    try {
        const response = await axios.post(`${API_URL}/api/Product/CreateImage`,{
            producT_ID: input.productId,
            imagE_NAME: input.imageName,
            imagE_STATUS: "ACTIVE",
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'ngrok-skip-browser-warning': 'true'
            }
        });
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const ProductDetail = async (input) => {
    try {
        const response = await axios.get(`${API_URL}/api/Product/ProductDetail`, {
            headers: {
                'Content-Type': 'application/json',
                 'ngrok-skip-browser-warning': 'true',
                 
            },
            params: {
                id: input,
            }
        });
        return response.data;
    } catch (error) {
        return error.response || { message: 'Lỗi kết nối server' };
    }
}

export const getProductImage = async (productId) =>{
    try{
        const response = await axios.get(`${API_URL}/api/Product/GetImage?id=${productId}`, {
            headers:{
                'Content-Type':'application/json',
                'ngrok-skip-browser-warning': 'true',
            }
        })
        return response.data
    }
    catch(error){
        throw error.response || { message: 'Lỗi kết nối server' }
    }
}