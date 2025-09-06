/** @file src/components/ui/Button/Button.jsx */
import React from 'react';

/**
 * Button component for interactive actions
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content (text, icons, etc.)
 * @param {string} [props.className] - Additional CSS classes
 * @param {Function} [props.onClick] - Click event handler
 */
const Button = ({ children, className, onClick }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md bg-fashion-purple-600 text-white hover:bg-fashion-purple-500 focus:outline-none ${className || ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;