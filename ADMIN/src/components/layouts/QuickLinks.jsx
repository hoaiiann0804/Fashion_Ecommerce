import React from 'react';
import { Link } from 'react-router-dom';

const QuickLinks = () => {
    return (
        <div className="mt-6 flex gap-4">
            <Link to="/products" className="text-indigo-600 hover:underline">
                Manage Products
            </Link>
            <Link to="/orders" className="text-indigo-600 hover:underline">
                View Orders
            </Link>
            <Link to="/customers" className="text-indigo-600 hover:underline">
                Customer List
            </Link>
        </div>
    );
};

export default QuickLinks;
