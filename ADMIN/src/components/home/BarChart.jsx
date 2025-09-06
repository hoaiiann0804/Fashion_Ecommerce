import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import React from 'react';

const BarChart = () => {
    const barData = {
        labels: ['Pending', 'Shipped', 'Delivered'],
        datasets: [
            {
                label: 'Số đơn hàng',
                data: [20, 15, 25],
                backgroundColor: '#4f46e5',
            },
        ],
    };

    const barOptions = {
        responsive: true,
        plugins: { legend: { position: 'top' } },
    };

    return (
        <Card title="Trạng thái đơn hàng" className="shadow-md rounded-lg">
            <Chart type="bar" data={barData} options={barOptions} />
        </Card>
    );
};
export default BarChart;
