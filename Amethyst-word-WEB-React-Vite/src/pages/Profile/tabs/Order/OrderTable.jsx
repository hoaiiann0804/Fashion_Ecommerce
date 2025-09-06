import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OrdersTable({ orders, total }) {
  const navigate = useNavigate();
  const handleViewDetail = (orderId) => {
    navigate(`/profile/orders/${orderId}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase">Mã đơn hàng</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase">Ngày mua</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase">Tổng tiền</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase">Trạng thái</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {orders.map((order, index) => (
              <tr key={index} className="hover:bg-slate-50 transition">
                <td className="px-6 py-5 text-sm font-medium text-indigo-600">{order.id}</td>
                <td className="px-6 py-5 text-sm text-slate-500">{order.createD_AT}</td>
                <td className="px-6 py-5 text-sm font-medium text-slate-800">{order.totaL_PRICE}</td>
                <td className="px-6 py-5">
                  <span className={`px-2.5 py-1 inline-flex text-xs font-medium rounded-full ${order.statusColor}`}>
                    {order.ordeR_STATUS}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                  onClick={() => handleViewDetail(order.id)}>
                    Chi tiết <ChevronRight size={16} className="ml-1" />
                  </button>
                </td>
              </tr>
            ))}
            {total === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-slate-500">
                  Không tìm thấy đơn hàng phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
