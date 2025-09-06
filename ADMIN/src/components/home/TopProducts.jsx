import { Card } from 'primereact/card';
import React from 'react';

const TopProducts = () => {
    const products = [
        { name: 'iPhone 14', revenue: '$5,000' },
        { name: 'MacBook Pro', revenue: '$3,200' },
        { name: 'AirPods', revenue: '$1,800' },
        { name: 'Samsung Galaxy S23', revenue: '$4,500' },
        { name: 'iPad Pro', revenue: '$2,800' },
    ];

    return (
        <Card
        className="shadow-md rounded-lg bg-white mb-5"
        style={{ maxHeight: '300px', overflowY: 'auto' }}
        >
        <h1 className='text-center font-bold text-black text-2xl'>Top sản phẩm</h1>

        <ul className="list-none p-4">
            {products.map((product, index) => (
            <li
                key={index}
                className="flex justify-between py-2 px-3 text-gray-700 border-b last:border-b-0 hover:bg-gray-100 transition-colors rounded-md"
            >
                <span>{product.name}</span>
                <span className="font-semibold text-indigo-600">{product.revenue}</span>
            </li>
            ))}
        </ul>
        </Card>
    );
};

export default TopProducts;
