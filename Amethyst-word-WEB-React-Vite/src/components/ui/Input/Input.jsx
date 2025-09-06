import React from "react";


const Input = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={`border p-2 rounded-md ${className}`} 
    />
  );
};

export default Input;
