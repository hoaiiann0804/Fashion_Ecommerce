import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'

const  WishlistButton =()=> {
  return (

    <button className="w-full bg-[#6666e5] text-white py-2 px-4 rounded-lg hover:bg-[#6666e5]  flex items-center justify-center gap-2">
       <FaShoppingCart className="text-xl" />
       <span className="text-sm">Add to Cart</span>
  </button>
           
  )
}

export default WishlistButton