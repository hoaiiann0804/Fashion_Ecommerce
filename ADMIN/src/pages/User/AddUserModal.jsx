// src/components/users/AddUserModal.jsx
import React, { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/DiaLog";

const AddUserModal = ({ isOpen, onClose, onAddUser }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Khách hàng",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddUser({
      id: Math.max(...mockUsers.map((u) => u.id), 0) + 1, // Giả lập ID
      ...newUser,
      status: "Đang hoạt động",
      lastLogin: new Date().toISOString().slice(0, 16).replace("T", " "),
    });
    setNewUser({ name: "", email: "", phone: "", role: "Khách hàng" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm người dùng mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label>Họ và tên</Label>
              <Input
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Số điện thoại</Label>
              <Input
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Vai trò</Label>
              <select
                className="w-full p-2 border rounded"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="Admin">Admin</option>
                <option value="Nhân viên">Nhân viên</option>
                <option value="Khách hàng">Khách hàng</option>
              </select>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit">Thêm</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;