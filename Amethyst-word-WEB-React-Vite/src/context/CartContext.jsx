import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCart } from "../service/Cart.Service";

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartCount, setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const token = localStorage.getItem('token');


    const updateCartCount = async () => {
        if (!token) {
            const localCart = JSON.parse(localStorage.getItem('cartItem')) || [];
            setCartItems(localCart);
            setCartCount(localCart.length);
            return;
        }

        
        try {
            const response = await getCart(token);
            console.log('Cart Response:', response); 

            if(response && Array.isArray(response)) {
                const validItems = response.filter(item => item && item.producT_ID !== null);
                setCartCount(validItems.length);
                setCartItems(validItems);
                console.log('Valid items count:', validItems.length); 
            } else {
                setCartCount(0);
                setCartItems([]);
            }
        } catch(error) {
            console.error('Error fetching cart count:', error);
            toast.error('Có lỗi xảy ra khi lấy số lượng giỏ hàng');
        }
    };

    const updateQuantity = (productId, newQuantity, colorId, sizeId) => {
        setCartItems(prevItems => {
            // Cập nhật localStorage ngay lập tức
            const updatedCartItems = prevItems.map(item => {
                if (item.producT_ID === productId && item.coloR_ID === colorId && item.sizE_ID === sizeId) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
            localStorage.setItem('cartItem', JSON.stringify(updatedCartItems));
            return updatedCartItems;
        });
    };

    const toggleSelectedItem = (productId) => {
        setSelectedItems(prev => 
          prev.includes(productId) 
            ? prev.filter(id => id !== productId)
            : [...prev, productId]
        );
      };

    const selectAllItems = (items)=>{
        setSelectedItems(items.map(item => item.producT_ID))
    }

    const clearSelectedItems =()=>{
        setSelectedItems([]);
    }

    useEffect(() => {
        updateCartCount();
    }, [token]);

    return (
        <CartContext.Provider value={{cartCount, setCartCount, updateCartCount, cartItems, setCartItems, updateQuantity,selectedItems, toggleSelectedItem, selectAllItems, clearSelectedItems}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
