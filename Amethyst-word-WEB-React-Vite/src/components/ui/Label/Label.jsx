import React from "react";

const Label = ({ children, className, ...props }) => {
  return (
    <label
      {...props}
      className={`block text-sm font-medium text-gray-700 ${className}`} // Thêm class tùy chỉnh nếu cần
    >
      {children}
    </label>
  );
};

export default Label;
