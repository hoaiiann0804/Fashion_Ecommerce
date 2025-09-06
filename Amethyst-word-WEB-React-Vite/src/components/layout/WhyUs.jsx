import React from 'react';
import { FaAward, FaDollarSign, FaShippingFast } from 'react-icons/fa';

const WhyUs = () => {
    const features = [
        {
            icon: <FaShippingFast />,
            title: "Fast Delivery",
            description: "Get your items delivered in record time.",
        },
        {
            icon: <FaDollarSign />,
            title: "Affordable Prices",
            description: "Enjoy the best deals and competitive pricing.",
        },
        {
            icon: <FaAward />,
            title: "Premium Quality",
            description: "Only the best products, guaranteed satisfaction.",
        },
    ];

    return (
        <div className="text-center py-10 bg-gradient-to-br">
            <h1 className="text-4xl font-bold text-gray-800 mb-12">WHY SHOP WITH US</h1>
            <div className="flex justify-center gap-10 flex-wrap">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="group relative bg-white p-8 rounded-lg shadow-lg w-72 hover:shadow-xl hover:bg-purple-700 hover:text-white transition-all duration-300"
                    >
                        <div className="text-6xl text-purple-700 group-hover:text-white mb-6 transition-colors duration-300">
                            {feature.icon}
                        </div>
                        <h2 className="text-2xl font-semibold mb-4 transition-transform duration-300 group-hover:scale-105">
                            {feature.title}
                        </h2>
                        <p className="text-gray-600 group-hover:text-white transition-colors duration-300">
                            {feature.description}
                        </p>
                        <div className="absolute inset-0 border-2 border-purple-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyUs;
