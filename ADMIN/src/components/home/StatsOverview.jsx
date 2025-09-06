import { Card } from 'primereact/card';
import React from 'react';

const StatsOverview = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card
                title="Revenue"
                className="shadow-md bg-gray-50 border border-gray-200 rounded-lg"
            >
                <p className="text-2xl font-semibold text-indigo-600">{stats.revenue}</p>
            </Card>
            <Card
                title="Total Order"
                className="shadow-md bg-gray-50 border border-gray-200 rounded-lg"
            >
                <p className="text-2xl font-semibold text-indigo-600">{stats.orders}</p>
            </Card>
            <Card
                title="Inventory"
                className="shadow-md bg-gray-50 border border-gray-200 rounded-lg"
            >
                <p className="text-2xl font-semibold text-indigo-600">{stats.inventory}</p>
            </Card>
            <Card
                title="Customers"
                className="shadow-md bg-gray-50 border border-gray-200 rounded-lg"
            >
                <p className="text-2xl font-semibold text-indigo-600">{stats.newCustomers}</p>
            </Card>
        </div>
    );
};

export default StatsOverview;
