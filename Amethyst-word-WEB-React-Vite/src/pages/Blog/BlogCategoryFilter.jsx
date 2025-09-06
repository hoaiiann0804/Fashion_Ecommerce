import React from 'react';

const BlogCategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <div className="flex space-x-2 py-2 min-w-max">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !selectedCategory
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => onCategoryChange('')}
        >
          Tất cả
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogCategoryFilter;