// src/data/mockData.js

export const userData = {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0912345678',
    address: 'Số 123 Đường ABC, Quận 1, TP. Hồ Chí Minh',
    avatar: '/api/placeholder/150/150'
  };
  
  export const navigationTabs = [
    { id: 'profile', label: 'Thông tin cá nhân', icon: 'User' },
    { id: 'orders', label: 'Đơn hàng của tôi', icon: 'ShoppingBag' },
    { id: 'wishlist', label: 'Sản phẩm yêu thích', icon: 'Heart' },
    { id: 'history', label: 'Lịch sử xem', icon: 'Clock' },
    { id: 'payment', label: 'Phương thức thanh toán', icon: 'CreditCard' },
    { id: 'settings', label: 'Cài đặt tài khoản', icon: 'Settings' }
  ];
  
  export const orders = [
    { id: '#ORD-12345', date: '22/04/2025', total: '2.500.000₫', status: 'Đã giao hàng', statusColor: 'bg-teal-100 text-teal-800' },
    { id: '#ORD-12344', date: '15/04/2025', total: '1.200.000₫', status: 'Đang vận chuyển', statusColor: 'bg-blue-100 text-blue-800' },
    { id: '#ORD-12343', date: '08/04/2025', total: '950.000₫', status: 'Đang chuẩn bị', statusColor: 'bg-purple-100 text-purple-800' }
  ];
  
  export const wishlistItems = [
    { id: 1, name: 'Áo khoác denim wash màu xanh indigo', price: '950.000₫', originalPrice: '1.250.000₫', discount: '24%', image: '/api/placeholder/300/400' },
    { id: 2, name: 'Quần âu slim fit xanh navy', price: '850.000₫', originalPrice: '950.000₫', discount: '10%', image: '/api/placeholder/300/400' },
    { id: 3, name: 'Áo sơ mi linen trắng kem', price: '745.000₫', originalPrice: '', discount: '', image: '/api/placeholder/300/400' },
    { id: 4, name: 'Giày da Chelsea boots đen', price: '1.450.000₫', originalPrice: '1.650.000₫', discount: '12%', image: '/api/placeholder/300/400' }
  ];