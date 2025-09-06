import React from 'react';
import { useNavigate } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  const navigate = useNavigate();

  return (
    
    <div className="container mx-auto px-10 py-2 text-sm mt-16 flex justify-center text-xl">
      <div className="flex items-center gap-2 text-white">
        <span
          className="hover:underline cursor-pointer"
          onClick={() => navigate("/")}
        >
          Trang chủ 
        </span>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <span>/</span>
            {item.path ? (
              <span
                className="hover:underline cursor-pointer"
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </span>
            ) : (
              <span className="font-medium text-purple-700">
                {item.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;