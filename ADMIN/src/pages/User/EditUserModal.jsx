import React, { useState, useEffect } from "react";
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

const EditUserModal = ({ isOpen, onClose, user, onEditUser }) => {
  const [editedUser, setEditedUser] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    role: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setEditedUser({
        id: user.id || "",
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "Khách hàng",
      });
      setErrors({});
    }
  }, [user]);

  // Validation cơ bản
  const validateForm = () => {
    const newErrors = {};
    if (!editedUser.name.trim()) newErrors.name = "Họ và tên là bắt buộc";
    if (!editedUser.email.trim()) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/\S+@\S+\.\S+/.test(editedUser.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!editedUser.phone.trim()) {
      newErrors.phone = "Số điện thoại là bắt buộc";
    } else if (!/^\d{10,11}$/.test(editedUser.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ (10-11 số)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onEditUser(editedUser);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin người dùng</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label>Họ và tên</Label>
              <Input
                value={editedUser.name}
                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                required
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={editedUser.email}
                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                required
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <Label>Số điện thoại</Label>
              <Input
                value={editedUser.phone}
                onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                required
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
            <div>
              <Label>Vai trò</Label>
              <select
                className="w-full p-2 border rounded"
                value={editedUser.role}
                onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
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
            <Button type="submit">Lưu</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;