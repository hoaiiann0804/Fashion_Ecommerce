import { Clock, CreditCard } from 'lucide-react';

export function HistoryTab() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Lịch sử xem sản phẩm</h1>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="text-center py-12">
          <Clock size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-slate-600 font-medium mb-2">Chưa có sản phẩm nào được xem gần đây</h3>
          <p className="text-slate-500 text-sm mb-4">Khám phá bộ sưu tập của chúng tôi để tìm thấy phong cách phù hợp với bạn</p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition">
            Khám phá ngay
          </button>
        </div>
      </div>
    </div>
  );
}

export function PaymentTab() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Phương thức thanh toán</h1>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="text-center py-12">
          <CreditCard size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-slate-600 font-medium mb-2">Chưa có phương thức thanh toán nào</h3>
          <p className="text-slate-500 text-sm mb-4">Thêm phương thức thanh toán để có trải nghiệm mua sắm nhanh chóng</p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition">
            Thêm phương thức thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}