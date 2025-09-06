import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {formatPrice} from '../../utils/formatUtils'
import { useCart } from '../../context/CartContext'

const CartFooter= ({ toggleCartDrawer }) =>{
  const { cartItems, selectedItems=[] } = useCart();
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  useEffect(()=>{
  const total = cartItems.filter(item=>selectedItems.includes(item.producT_ID)).reduce((sum, item)=> sum + (item.producT_PRICE * item.quantity), 0)
    setSubtotal(total);
  }, [cartItems, selectedItems]); 

  const handleCheckout = () => {
    const selectedProducts = cartItems.filter(item => selectedItems.includes(item.producT_ID))
    if (toggleCartDrawer) {
      toggleCartDrawer(); 
    }
    navigate('/checkout',{
      state:{
        products: selectedProducts,
        subtotal: subtotal
      }
    });
  };

  const handleContinueShopping = () => {
      navigate('/');
  };

  return (
    <div className="p-4 bg-white sticky bottom-0 space-y-2">
    <p className="text-lg font-semibold">  Tổng thanh toán ({selectedItems.length} sản phẩm): {formatPrice(subtotal)} </p>
    
    <button 
      onClick={handleCheckout}
      disabled={selectedItems.length === 0}
      className={`w-full ${selectedItems.length ===0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#6666e5] hover:bg-gray-800'} text-white py-3 rounded-lg font-semibold transition`}
    >
        Thanh toán
    </button>

    <button
      onClick={handleContinueShopping}
      className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
    >
      Vào trang giỏ hàng 
    </button>
</div>
  )
}

export default CartFooter
