import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const getCart = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/Cart/GetList`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'ngrok-skip-browser-warning': 'true',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
}

export const addToCart = async (token, productId, quantity, colorId, sizeId) => {
    try {

        const cartResponse = await axios.get(`${API_URL}/api/Cart/GetList`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'ngrok-skip-browser-warning': 'true',
            },
        });
        const cartItems = cartResponse.data || [];
        const existingItem = cartItems.find(item =>
            item.producT_ID === productId &&
            item.coloR_ID === colorId &&
            item.sizE_ID === sizeId
        );

        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            const updateResponse = await axios.put(`${API_URL}/api/Cart/UpdateQuantity`, {
                producT_ID: productId,
                coloR_ID: colorId,
                sizE_ID: sizeId,
                quantity: newQuantity
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            return updateResponse.data;
        } else {
            const response = await axios.post(`${API_URL}/api/Cart/Create`, {
                producT_ID: productId,
                quantity: quantity,
                coloR_ID: colorId,
                sizE_ID: sizeId
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            return response.data;
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
}

export const deleteCart = async (token, productId) => {
    try {
        const response = await axios.delete(`${API_URL}/api/Cart/Delete`, {
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            data: productId
        });
        console.log('Delete response:', response.data);
        return response.data;
    }
    catch (error) {
        console.error('Error deleting from cart:', error);
        throw error;
    }
}

export const addToCartNoAuth = (producT_ID, producT_NAME, producT_PRICE, imagE_NAME, coloR_ID, coloR_NAME, sizE_ID, sizE_NAME, quantity, quantitY_TOTAL) => {
    const cart = JSON.parse(localStorage.getItem("cartItem")) || [];
    let isNewItemAdded = false;

    const existingIndex = cart.findIndex(item =>
        Number(item.producT_ID) === Number(producT_ID) &&
        Number(item.coloR_ID) === Number(coloR_ID) &&
        Number(item.sizE_ID) === Number(sizE_ID)
    );

    if (existingIndex !== -1) {
        const currentItem = cart[existingIndex];
        const newQuantity = currentItem.quantity + quantity;
        cart[existingIndex].quantity = Math.min(newQuantity, currentItem.quantitY_TOTAL || Infinity);
    } else {
        cart.push({
        producT_ID,
        producT_NAME,
        producT_PRICE,
        imagE_NAME,
        coloR_ID,
        coloR_NAME,
        sizE_ID,
        sizE_NAME,
        quantity,
        quantitY_TOTAL
        });
        isNewItemAdded = true;
    }

    localStorage.setItem("cartItem", JSON.stringify(cart));
    return isNewItemAdded;
};

export const removeFromCart = (productId, colorId, sizeId) => {
    const cart = JSON.parse(localStorage.getItem('cartItem')) || [];

    const index = cart.findIndex(item => 
        item.producT_ID === Number(productId) &&
        item.coloR_ID === colorId &&
        item.sizE_ID === sizeId
    );

    if (index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem('cartItem', JSON.stringify(cart));
    } else {
        console.warn('Không tìm thấy sản phẩm để xóa:', productId);
    }
};

