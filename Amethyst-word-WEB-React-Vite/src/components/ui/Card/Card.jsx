/** @file src/components/ui/card.jsx */
import React from 'react';

/**
 * Card component to wrap content in a styled container
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content (Header, Content, Title, etc.)
 * @param {string} [props.className] - Additional CSS classes
 */
export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className || ''}`}>
      {children}
    </div>
  );
};

/**
 * CardHeader component for card header section
 * @param {Object} props
 * @param {React.ReactNode} props.children - Header content
 * @param {string} [props.className] - Additional CSS classes
 */
export const CardHeader = ({ children, className }) => (
  <div className={`border-b pb-4 mb-4 ${className || ''}`}>{children}</div>
);

/**
 * CardContent component for card main content
 * @param {Object} props
 * @param {React.ReactNode} props.children - Main content
 * @param {string} [props.className] - Additional CSS classes
 */
export const CardContent = ({ children, className }) => (
  <div className={`text-gray-600 ${className || ''}`}>{children}</div>
);

/**
 * CardTitle component for card title
 * @param {Object} props
 * @param {React.ReactNode} props.children - Title text or elements
 * @param {string} [props.className] - Additional CSS classes
 */
export const CardTitle = ({ children, className }) => (
  <h3 className={`text-xl font-semibold ${className || ''}`}>{children}</h3>
);