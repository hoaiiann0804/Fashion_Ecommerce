// Dữ liệu mẫu cho profile người dùng
import P3 from '../assets/image/P3.jpg'
import P4 from '../assets/image/P3.jpg'
export const userData = {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0912345678',
    address: 'Số 123 Đường ABC, Quận 1, TP. Hồ Chí Minh',
    avatar: P4
  };
  
  // Tabs cho sidebar
  export const profileTabs = [
    { id: 'profile', label: 'Thông tin cá nhân', icon: 'User' },
    { id: 'orders', label: 'Đơn hàng của tôi', icon: 'ShoppingBag' },
    // { id: 'wishlist', label: 'Sản phẩm yêu thích', icon: 'Heart' },
    // { id: 'history', label: 'Lịch sử xem', icon: 'Clock' },
    { id: 'payment', label: 'Phương thức thanh toán', icon: 'CreditCard' },
    { id: 'settings', label: 'Cài đặt tài khoản', icon: 'Settings' }
  ];
  
  // Dữ liệu mẫu cho đơn hàng
export const orderData = [
  {
    id: 'DH001',
    date: '2023-06-15',
    total: '1.290.000₫',
    status: 'Đang giao',
    statusColor: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'DH002',
    date: '2023-06-10',
    total: '580.000₫',
    status: 'Đã giao',
    statusColor: 'bg-green-100 text-green-800'
  },
  {
    id: 'DH003',
    date: '2023-05-28',
    total: '790.000₫',
    status: 'Đã giao',
    statusColor: 'bg-green-100 text-green-800'
  },
  {
    id: 'DH004',
    date: '2023-05-15',
    total: '450.000₫',
    status: 'Đã huỷ',
    statusColor: 'bg-red-100 text-red-800'
  },
  {
    id: 'DH005',
    date: '2023-05-07',
    total: '890.000₫',
    status: 'Đã giao',
    statusColor: 'bg-green-100 text-green-800'
  },
  {
    "id": "DH006",
    "date": "2023-05-20",
    "total": "627.000₫",
    "status": "Đã huỷ",
    "statusColor": "bg-red-100 text-red-800"
  },
  {
    "id": "DH007",
    "date": "2023-05-18",
    "total": "669.000₫",
    "status": "Đã giao",
    "statusColor": "bg-green-100 text-green-800"
  },
  {
    "id": "DH008",
    "date": "2023-05-16",
    "total": "1.388.000₫",
    "status": "Đang giao",
    "statusColor": "bg-blue-100 text-blue-800"
  }
];

export const getOrderDetail = (orderId) => {
  const orderDetails = {
    'DH001': {
      id: 'DH001',
      date: '2023-06-15',
      status: 'Đang giao',
      statusColor: 'bg-blue-100 text-blue-800',
      total: '1.290.000₫',
      customerName: 'Nguyễn Văn A',
      phone: '0987654321',
      email: 'nguyenvana@example.com',
      address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
      paymentMethod: 'Thanh toán khi nhận hàng (COD)',
      shippingMethod: 'Giao hàng nhanh',
      shippingFee: '30.000₫',
      items: [
        {
          id: 'PRD001',
          name: 'Áo thun nam cổ tròn',
          image: '/images/product1.jpg',
          price: '290.000₫',
          quantity: 2,
          total: '580.000₫'
        },
        {
          id: 'PRD002',
          name: 'Quần jean nam slim fit',
          image: '/images/product2.jpg',
          price: '680.000₫',
          quantity: 1,
          total: '680.000₫'
        }
      ],
      trackingHistory: [
        {
          status: 'Đơn hàng đã đặt',
          date: '2023-06-15',
          time: '10:30',
          description: 'Đơn hàng của bạn đã được tạo thành công.'
        },
        {
          status: 'Đã xác nhận',
          date: '2023-06-15',
          time: '11:45',
          description: 'Đơn hàng của bạn đã được xác nhận và đang được chuẩn bị.'
        },
        {
          status: 'Đang vận chuyển',
          date: '2023-06-16',
          time: '09:15',
          description: 'Đơn hàng đã được giao cho đơn vị vận chuyển.'
        },
        {
          status: 'Đang giao hàng',
          date: '2023-06-17',
          time: '08:30',
          description: 'Đơn hàng đang được giao đến địa chỉ của bạn.'
        }
      ]
    },
    'DH002': {
      id: 'DH002',
      date: '2023-06-10',
      status: 'Đã giao',
      statusColor: 'bg-green-100 text-green-800',
      total: '580.000₫',
      customerName: 'Trần Thị B',
      phone: '0901234567',
      email: 'tranthib@example.com',
      address: '456 Đường Nguyễn Huệ, Quận 3, TP.HCM',
      paymentMethod: 'Chuyển khoản ngân hàng',
      shippingMethod: 'Giao hàng tiêu chuẩn',
      shippingFee: '20.000₫',
      items: [
        {
          id: 'PRD003',
          name: 'Áo sơ mi nữ dài tay',
          image: '/images/product3.jpg',
          price: '350.000₫',
          quantity: 1,
          total: '350.000₫'
        },
        {
          id: 'PRD004',
          name: 'Chân váy xếp li',
          image: '/images/product4.jpg',
          price: '210.000₫',
          quantity: 1,
          total: '210.000₫'
        }
      ],
      trackingHistory: [
        {
          status: 'Đơn hàng đã đặt',
          date: '2023-06-10',
          time: '14:20',
          description: 'Đơn hàng của bạn đã được tạo thành công.'
        },
        {
          status: 'Đã xác nhận',
          date: '2023-06-10',
          time: '15:30',
          description: 'Đơn hàng của bạn đã được xác nhận và đang được chuẩn bị.'
        },
        {
          status: 'Đang vận chuyển',
          date: '2023-06-11',
          time: '10:45',
          description: 'Đơn hàng đã được giao cho đơn vị vận chuyển.'
        },
        {
          status: 'Đang giao hàng',
          date: '2023-06-12',
          time: '08:15',
          description: 'Đơn hàng đang được giao đến địa chỉ của bạn.'
        },
        {
          status: 'Đã giao hàng',
          date: '2023-06-12',
          time: '14:30',
          description: 'Đơn hàng đã được giao thành công.'
        }
      ]
    },
    'DH003': {
      id: 'DH003',
      date: '2023-05-28',
      status: 'Đã giao',
      statusColor: 'bg-green-100 text-green-800',
      total: '790.000₫',
      customerName: 'Lê Văn C',
      phone: '0812345678',
      email: 'levanc@example.com',
      address: '789 Đường Lý Tự Trọng, Quận 1, TP.HCM',
      paymentMethod: 'Thẻ tín dụng/Ghi nợ',
      shippingMethod: 'Giao hàng nhanh',
      shippingFee: '30.000₫',
      items: [
        {
          id: 'PRD005',
          name: 'Giày thể thao nam',
          image: '/images/product5.jpg',
          price: '760.000₫',
          quantity: 1,
          total: '760.000₫'
        }
      ],
      trackingHistory: [
        {
          status: 'Đơn hàng đã đặt',
          date: '2023-05-28',
          time: '09:10',
          description: 'Đơn hàng của bạn đã được tạo thành công.'
        },
        {
          status: 'Đã xác nhận',
          date: '2023-05-28',
          time: '10:30',
          description: 'Đơn hàng của bạn đã được xác nhận và đang được chuẩn bị.'
        },
        {
          status: 'Đang vận chuyển',
          date: '2023-05-29',
          time: '11:15',
          description: 'Đơn hàng đã được giao cho đơn vị vận chuyển.'
        },
        {
          status: 'Đang giao hàng',
          date: '2023-05-30',
          time: '09:20',
          description: 'Đơn hàng đang được giao đến địa chỉ của bạn.'
        },
        {
          status: 'Đã giao hàng',
          date: '2023-05-30',
          time: '15:45',
          description: 'Đơn hàng đã được giao thành công.'
        }
      ]
    },
    'DH004': {
      id: 'DH004',
      date: '2023-05-15',
      status: 'Đã huỷ',
      statusColor: 'bg-red-100 text-red-800',
      total: '450.000₫',
      customerName: 'Phạm Thị D',
      phone: '0765432109',
      email: 'phamthid@example.com',
      address: '101 Đường Võ Văn Tần, Quận 3, TP.HCM',
      paymentMethod: 'Thanh toán khi nhận hàng (COD)',
      shippingMethod: 'Giao hàng tiêu chuẩn',
      shippingFee: '20.000₫',
      items: [
        {
          id: 'PRD006',
          name: 'Túi xách nữ thời trang',
          image: '/images/product6.jpg',
          price: '430.000₫',
          quantity: 1,
          total: '430.000₫'
        }
      ],
      trackingHistory: [
        {
          status: 'Đơn hàng đã đặt',
          date: '2023-05-15',
          time: '16:20',
          description: 'Đơn hàng của bạn đã được tạo thành công.'
        },
        {
          status: 'Đã xác nhận',
          date: '2023-05-15',
          time: '17:15',
          description: 'Đơn hàng của bạn đã được xác nhận và đang được chuẩn bị.'
        },
        {
          status: 'Đã huỷ',
          date: '2023-05-16',
          time: '10:30',
          description: 'Đơn hàng đã bị huỷ theo yêu cầu của bạn.'
        }
      ]
    },
    'DH005': {
      id: 'DH005',
      date: '2023-05-07',
      status: 'Đã giao',
      statusColor: 'bg-green-100 text-green-800',
      total: '890.000₫',
      customerName: 'Hoàng Văn E',
      phone: '0923456789',
      email: 'hoangvane@example.com',
      address: '202 Đường Trần Hưng Đạo, Quận 5, TP.HCM',
      paymentMethod: 'Ví điện tử MoMo',
      shippingMethod: 'Giao hàng nhanh',
      shippingFee: '30.000₫',
      items: [
        {
          id: 'PRD007',
          name: 'Đồng hồ nam cao cấp',
          image: '/images/product7.jpg',
          price: '860.000₫',
          quantity: 1,
          total: '860.000₫'
        }
      ],
      trackingHistory: [
        {
          status: 'Đơn hàng đã đặt',
          date: '2023-05-07',
          time: '11:10',
          description: 'Đơn hàng của bạn đã được tạo thành công.'
        },
        {
          status: 'Đã xác nhận',
          date: '2023-05-07',
          time: '12:45',
          description: 'Đơn hàng của bạn đã được xác nhận và đang được chuẩn bị.'
        },
        {
          status: 'Đang vận chuyển',
          date: '2023-05-08',
          time: '09:30',
          description: 'Đơn hàng đã được giao cho đơn vị vận chuyển.'
        },
        {
          status: 'Đang giao hàng',
          date: '2023-05-09',
          time: '10:15',
          description: 'Đơn hàng đang được giao đến địa chỉ của bạn.'
        },
        {
          status: 'Đã giao hàng',
          date: '2023-05-09',
          time: '16:20',
          description: 'Đơn hàng đã được giao thành công.'
        }
      ]
    },
    
  };
  
  return orderDetails[orderId] || null;
};

  export const wishlistData = [
    { id: 1, name: 'Áo khoác denim wash màu xanh indigo', price: '950.000₫', originalPrice: '1.250.000₫', discount: '24%', image: P3},
    { id: 2, name: 'Quần âu slim fit xanh navy', price: '850.000₫', originalPrice: '950.000₫', discount: '10%', image: P3 },
    { id: 3, name: 'Áo sơ mi linen trắng kem', price: '745.000₫', originalPrice: '', discount: '', image: P3},
    { id: 4, name: 'Giày da Chelsea boots đen', price: '1.450.000₫', originalPrice: '1.650.000₫', discount: '12%', image: P3 }
  ];