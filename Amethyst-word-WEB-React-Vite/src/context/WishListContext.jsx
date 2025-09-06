import React, {createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify"; 
import { GetWishList } from "../service/WishList.Service";

const WishlistContext = createContext();

export const WishlistProvider = ({children}) =>{
    const [wishlistCount, setWishlistCount] = useState(0);
    const token = localStorage.getItem('token');

    const updateWishListCount = async ()=>{
        if(!token){
            setWishlistCount(0);
            return;
        }
            try{
                const response = await GetWishList(token);
                if(response.code === 200 && Array.isArray(response.data)){
                    setWishlistCount(response.data.length);
                }

            }
            catch(error){
                console.error('Error fetching wishlist count:', error);
                toast.error('Có lỗi xảy ra khi lấy số lượng danh sách yêu thích');
            }
        }

    const incrementCount = ()=>{
        setWishlistCount(pre=>pre + 1);
    }
    const decrementCount = async()=>{
        setWishlistCount(pre=> Math.max(0, pre-1));
    }
    useEffect(()=>{
        updateWishListCount();
    },[token]);
    return (
        <WishlistContext.Provider value={{wishlistCount, setWishlistCount, updateWishListCount, incrementCount, decrementCount}}>
            {children}
        </WishlistContext.Provider>
    )
}
export const useWishlist =() =>useContext(WishlistContext)
