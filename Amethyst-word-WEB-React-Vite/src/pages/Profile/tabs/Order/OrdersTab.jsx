import { useState, useEffect } from 'react';
import OrdersFilter from './OrdersFilter';
import OrdersTable from './OrderTable';
import FashionPagination from '../../../../components/panigation/Panigation';
import { getOrder } from '../../../../service/Order.Service';

const ORDERS_PER_PAGE = 5;

export default function OrdersTab() {
  const [searchId, setSearchId] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tất cả');
  const [filterDate, setFilterDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [orderData, setOrderData] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!token) return;
        const response = await getOrder(token);
        setOrderData(response || []);
      } catch (error) {
        console.error('Lỗi khi lấy đơn hàng:', error);
      }
    };
    fetchOrders();
  }, [token]);

  const filteredOrders = orderData.filter(order => {
    const matchId = order.id.toLowerCase().includes(searchId.toLowerCase());
    const matchStatus = filterStatus === 'Tất cả' || order.order_STATUS === filterStatus;
    const matchDate = filterDate === '' || order.createD_AT === filterDate;
    return matchId && matchStatus && matchDate;
  });


  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );


  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Đơn hàng của tôi</h1>
      <OrdersFilter
        searchId={searchId}
        setSearchId={setSearchId}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        setCurrentPage={setCurrentPage}
      />
      <OrdersTable orders={paginatedOrders} total={filteredOrders.length} />
      <FashionPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
