export const mockRoles = [
    {
      id: 1,
      name: "Quản trị viên",
      description: "Quyền truy cập đầy đủ vào hệ thống",
      usersCount: 3,
      createdAt: "2025-01-15",
      permissions: {
        dashboard: true,
        products: { view: true, create: true, edit: true, delete: true },
        orders: { view: true, create: true, edit: true, delete: true },
        users: { view: true, create: true, edit: true, delete: true }
      }
    },
    {
      id: 2,
      name: "Nhân viên bán hàng",
      description: "Quản lý đơn hàng và sản phẩm",
      usersCount: 8,
      createdAt: "2025-02-20",
      permissions: {
        dashboard: true,
        products: { view: true, create: false, edit: true, delete: false },
        orders: { view: true, create: true, edit: true, delete: false },
        users: { view: false, create: false, edit: false, delete: false }
      }
    },
    {
      id: 3,
      name: "Nhân viên kho",
      description: "Quản lý kho và sản phẩm",
      usersCount: 5,
      createdAt: "2025-03-10",
      permissions: {
        dashboard: true,
        products: { view: true, create: false, edit: true, delete: false },
        orders: { view: true, create: false, edit: false, delete: false },
        users: { view: false, create: false, edit: false, delete: false }
      }
    },
    {
      id: 4,
      name: "Khách hàng",
      description: "Người dùng thông thường",
      usersCount: 152,
      createdAt: "2025-01-01",
      permissions: {
        dashboard: false,
        products: { view: true, create: false, edit: false, delete: false },
        orders: { view: true, create: true, edit: false, delete: false },
        users: { view: false, create: false, edit: false, delete: false }
      }
    }
  ];