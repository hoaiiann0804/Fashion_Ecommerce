/** @file src/components/ui/CartDrawer.jsx */
import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import CartContent from './CartContent';
import CartFooter from './CartFooter';
import Breadcrumb from '../../components/BreadCrumb';
import { Link } from 'react-router-dom';

/**
 * CartDrawer component for displaying cart in a sliding drawer
 * @param {Object} props
 * @param {boolean} props.drawerOpen - Whether the drawer is open
 * @param {Function} props.toggleCartDrawer - Function to toggle drawer open/close
 */
const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  return (
    <div
      className={`fixed top-0 right-0 sm:w-1/2 md:w-[35rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-[12000] ${
        drawerOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{
        paddingTop: '2rem'
      }}
    >
      <div className="flex justify-end ">
        <button
          onClick={toggleCartDrawer}
          style={{
            zIndex: 11000,
            position: 'relative',
            fontSize: '24px',
            color: 'red',
            padding: '1px'
          }}
        >
          <IoMdClose className="h-6 w-6" />
        </button>
     
      </div>
      <div className="flex-grow p-4  overflow-y-auto">
        
        <h2 className="text-xl font-semibold mb-4 text-center text-blue-600 p-2">Giỏ hàng của bạn </h2>
        {/* Component for cart Contents */}
        <CartContent />
      </div>
      <div className="p-4 bg-white sticky bottom-0">
        <CartFooter toggleCartDrawer={toggleCartDrawer} />
      </div>
    </div>
  );
};

export default CartDrawer;