
import { Badge } from "../components/ui/Badge";

export const getStatusBadge = (status) => {
  switch (status) {
    case "Đang hoạt động":
      return <Badge className="bg-green-500">Đang hoạt động</Badge>;
    case "Đã khóa":
      return <Badge variant="destructive">Đã khóa</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};


export const addUser = (users, newUser) => {
  return [...users, newUser];
};
export const editUser = (users, editedUser) => {
  return users.map((user) => (user.id === editedUser.id ? editedUser : user));
};
export const toggleUserStatus = (users, userId) => {
  return users.map((user) =>
    user.id === userId
      ? {
          ...user,
          status: user.status === "Đang hoạt động" ? "Đã khóa" : "Đang hoạt động",
        }
      : user
  );
};

// Xóa người dùng
export const deleteUser = (users, userId) => {
  return users.filter((user) => user.id !== userId);
};

// Xuất CSV
export const exportToCSV = (users) => {
  const headers = ["ID,Tên,Email,Số điện thoại,Vai trò,Trạng thái,Đăng nhập cuối"];
  const rows = users.map(
    (user) =>
      `${user.id},${user.name},${user.email},${user.phone},${user.role},${user.status},${user.lastLogin}`
  );
  const csvContent = [...headers, ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "users.csv";
  link.click();
};