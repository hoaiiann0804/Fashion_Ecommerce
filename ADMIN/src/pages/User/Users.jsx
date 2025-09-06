import React, { useState } from "react";
import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import {
  User,
  UserPlus,
  Search,
  MoreVertical,
  Eye,
  Edit,
  Trash,
  Lock,
  Unlock,
  Download,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "../../components/ui/Table";
import { Badge } from "../../components/ui/Badge";
import UsersFilter from "./UsersFilter";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import ViewUserModal from "./ViewUserModal";
import DeleteUserModal from "./DeleteUserModal";
import {
  addUser,
  editUser,
  toggleUserStatus,
  deleteUser,
  exportToCSV,
  getStatusBadge,
} from "../../utils/userActions";
import mockUsers from "../../services/mockUsers";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator} from "@/components/ui/DropdownMenu";
const USERS_PER_PAGE = 5;

const Users = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    const matchesRole = selectedRole === "Tất cả" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAddUser = (newUser) => {
    const updatedUsers = addUser(users, newUser);
    setUsers(updatedUsers);
  };

  const handleEditUser = (editedUser) => {
    const updatedUsers = editUser(users, editedUser);
    setUsers(updatedUsers);
  };

  const handleToggleStatus = (userId) => {
    const updatedUsers = toggleUserStatus(users, userId);
    setUsers(updatedUsers);
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = deleteUser(users, userId);
    setUsers(updatedUsers);

    if (paginatedUsers.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleExportToCSV = () => {
    exportToCSV(filteredUsers);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
          <div className="flex gap-2">
            <Button onClick={handleExportToCSV} className="flex items-center gap-2">
              <Download size={18} />
              Xuất CSV
            </Button>
            <Button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2">
              <UserPlus size={18} />
              Thêm người dùng
            </Button>
          </div>
        </div>

    
        <UsersFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Danh sách người dùng</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1 cursor-pointer">
                      Tên người dùng
                      <ArrowUpDown size={16} />
                    </div>
                  </TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Số điện thoại</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Đăng nhập cuối</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-gray-500" />
                          {user.name}
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={user.role === "Admin" ? "border-blue-500 text-blue-500" : ""}
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              className="flex items-center gap-2"
                              onClick={() => {
                                setSelectedUser(user);
                                setIsViewModalOpen(true);
                              }}
                            >
                              <Eye size={16} />
                              <span>Xem chi tiết</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex items-center gap-2"
                              onClick={() => {
                                setSelectedUser(user);
                                setIsEditModalOpen(true);
                              }}
                            >
                              <Edit size={16} />
                              <span>Chỉnh sửa</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex items-center gap-2"
                              onClick={() => handleToggleStatus(user.id)}
                            >
                              {user.status === "Đang hoạt động" ? (
                                <>
                                  <Lock size={16} />
                                  <span>Khóa tài khoản</span>
                                </>
                              ) : (
                                <>
                                  <Unlock size={16} />
                                  <span>Mở khóa tài khoản</span>
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="flex items-center gap-2 text-destructive"
                              onClick={() => {
                                setSelectedUser(user);
                                setIsDeleteModalOpen(true);
                              }}
                            >
                              <Trash size={16} />
                              <span>Xóa</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                      Không tìm thấy người dùng nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Phân trang */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-4">
                <div>
                  Hiển thị {paginatedUsers.length} / {filteredUsers.length} người dùng
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft size={16} />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modals */}
        <AddUserModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddUser={handleAddUser}
        />
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={selectedUser}
          onEditUser={handleEditUser}
        />
        <ViewUserModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          user={selectedUser}
        />
        <DeleteUserModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          user={selectedUser}
          onDeleteUser={handleDeleteUser}
        />
      </div>
    </DashboardLayout>
  );
};

export default Users;