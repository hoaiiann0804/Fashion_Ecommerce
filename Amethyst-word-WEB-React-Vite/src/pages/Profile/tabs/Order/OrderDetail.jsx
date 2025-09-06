import { AlertCircle, ArrowLeft, Check, Package, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetOrderDetail } from '../../../../service/OrderDetail.Service';
const API_URL = import.meta.env.VITE_API_URL;
const API_IMAGE = import.meta.env.VITE_API_IMAGE
const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderDetail, setOrderDetail] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [total, setTotal] = useState(0);

  const fetchOrderDetail = async () => {
    const response = await GetOrderDetail(orderId);
    setOrderDetail(response);
    if (response && response.length > 0) {
      setTotal(response.reduce((sum, item) => sum + item.subtotal, 0));
    }

  }

  useEffect(() => {
    fetchOrderDetail();
  }, []);

  // Hiển thị icon tương ứng với trạng thái
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Đang xử lý':
        return <Package className="w-5 h-5" />;
      case 'Đang giao':
        return <Truck className="w-5 h-5" />;
      case 'Đã giao':
        return <Check className="w-5 h-5" />;
      case 'Đã huỷ':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  return (
    <div className = 'pt-[60px]'>
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 p-2 hover:bg-slate-100 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-slate-800">Chi tiết đơn hàng {orderId}</h1>
      </div>

      {/* Thông tin đơn hàng */}
      <div className="flex flex-col min-h-screen bg-white">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div>
            <p className="text-sm text-slate-500 mb-1">Ngày đặt hàng</p>
            <p className="font-medium">{orderDetail.date}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 mb-1">Tổng tiền</p>
            <p className="font-medium text-lg">{orderDetail.total}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 mb-1">Trạng thái</p>
            <div className="flex items-center">
              {getStatusIcon(orderDetail.status)}
              <span className={`ml-2 px-2.5 py-1 inline-flex text-xs font-medium rounded-full ${orderDetail.statusColor}`}>
                {orderDetail.status}
              </span>
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="border-b border-slate-200 mb-6">
          <div className="flex space-x-6">
            <button
              className={`pb-3 font-medium ${activeTab === 'products' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-800'}`}
              onClick={() => setActiveTab('products')}
            >
              Sản phẩm
            </button>
            <button
              className={`pb-3 font-medium ${activeTab === 'tracking' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-800'}`}
              onClick={() => setActiveTab('tracking')}
            >
              Lịch sử vận chuyển
            </button>
            <button
              className={`pb-3 font-medium ${activeTab === 'info' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-800'}`}
              onClick={() => setActiveTab('info')}
            >
              Thông tin giao hàng
            </button>
          </div>
        </div>

        {/* Tab content */}
        {activeTab === 'products' && (
          <div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Sản phẩm</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Đơn giá</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Số lượng</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Tổng</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {orderDetail.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-16 w-16 bg-slate-200 rounded overflow-hidden mr-4 flex-shrink-0">
                            <img src={`${API_IMAGE}/${item.imagE_NAME}`} alt={item.name} className="h-full w-full object-cover" 
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = '/images/placeholder.png';
                              }}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{item.producT_NAME}</p>
                            <p className="text-sm text-slate-500">Mã: {item.producT_ID}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-slate-500">{item.producT_PRICE}</td>
                      <td className="px-6 py-4 text-right text-slate-500">{item.quantity}</td>
                      <td className="px-6 py-4 text-right font-medium">{item.subtotal}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-50">
                    <td colSpan="3" className="px-6 py-4 text-right font-medium">Tổng tiền sản phẩm:</td>
                    <td className="px-6 py-4 text-right font-medium">{total}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'tracking' && (
          <div className="px-2">
            <ul className="relative border-l border-slate-200 ml-3">
              {orderDetail.trackingHistory.map((item, index) => (
                <li key={index} className="mb-8 ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-indigo-100 rounded-full -left-3 ring-8 ring-white">
                    <span className="w-3 h-3 bg-indigo-600 rounded-full"></span>
                  </span>
                  <div className="flex items-baseline">
                    <h3 className="font-medium text-slate-800">{item.status}</h3>
                    <p className="ml-4 text-sm text-slate-500">{item.date} • {item.time}</p>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium text-slate-800 mb-4">Thông tin khách hàng</h3>
              <div className="space-y-3">
                <p className="text-sm">
                  <span className="text-slate-500 mr-2">Họ tên:</span>
                  <span className="font-medium">{orderDetail.customerName}</span>
                </p>
                <p className="text-sm">
                  <span className="text-slate-500 mr-2">Số điện thoại:</span>
                  <span className="font-medium">{orderDetail.phone}</span>
                </p>
                <p className="text-sm">
                  <span className="text-slate-500 mr-2">Email:</span>
                  <span className="font-medium">{orderDetail.email}</span>
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-slate-800 mb-4">Thông tin giao hàng</h3>
              <div className="space-y-3">
                <p className="text-sm">
                  <span className="text-slate-500 mr-2">Địa chỉ:</span>
                  <span className="font-medium">{orderDetail.address}</span>
                </p>
                <p className="text-sm">
                  <span className="text-slate-500 mr-2">Phương thức thanh toán:</span>
                  <span className="font-medium">{orderDetail.paymentMethod}</span>
                </p>
                <p className="text-sm">
                  <span className="text-slate-500 mr-2">Phương thức vận chuyển:</span>
                  <span className="font-medium">{orderDetail.shippingMethod}</span>
                </p>
                <p className="text-sm">
                  <span className="text-slate-500 mr-2">Phí vận chuyển:</span>
                  <span className="font-medium">{orderDetail.shippingFee}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
    </div>
  );
} 
export default OrderDetail