import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import React from 'react';
import BarChart from './BarChart';

const RevenueChart = ({ chartData, chartOptions }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 h-96">
        <Card title="Revenue Over Time" className="shadow-md">
            <Chart type="line" data={chartData} options={chartOptions} />
        </Card>
        <BarChart />
        </div>
    );
};

export default RevenueChart;
