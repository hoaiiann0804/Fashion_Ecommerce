import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React from 'react';

const RecentOrders = ({ orders }) => {
    return (
        <Card title="Recent Orders" className="shadow-md rounded-lg bg-white">
            <DataTable
                value={orders}
                scrollable // Kích hoạt cuộn
                scrollHeight="300px" // Giới hạn chiều cao để hiển thị ScrollView
                paginator // Kích hoạt phân trang
                rows={20} // Số hàng trên mỗi trang
                rowsPerPageOptions={[5, 10, 20]} // Tùy chọn số hàng mỗi trang
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                responsiveLayout="scroll"
                className="p-datatable-sm" // Kích thước nhỏ gọn hơn
            >
                <Column
                field="id"
                header="Order ID"
                sortable // Cho phép sắp xếp
                style={{ minWidth: '100px' }}
                />
                <Column
                field="customer"
                header="Customer"
                sortable
                style={{ minWidth: '150px' }}
                />
                <Column
                field="total"
                header="Total"
                sortable
                style={{ minWidth: '100px' }}
                body={(rowData) => (
                    <span className="font-semibold text-indigo-600">{rowData.total}</span>
                )}
                />
                <Column
                field="status"
                header="Status"
                style={{ minWidth: '120px' }}
                body={(rowData) => (
                    <span
                    className={`px-2 py-1 rounded-full text-white text-sm ${
                        rowData.status === 'Pending'
                        ? 'bg-yellow-500'
                        : rowData.status === 'Shipped'
                        ? 'bg-blue-500'
                        : 'bg-green-500'
                    }`}
                    >
                    {rowData.status}
                    </span>
                )}
                />
            </DataTable>
        </Card>
    );
};

export default RecentOrders;
