// src/components/users/ViewUserModal.jsx
import React from "react";
import { Button } from "../../components/ui/Button";
import { Label } from "../../components/ui/Label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/DiaLog";

const ViewUserModal = ({ isOpen, onClose, user }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chi tiết người dùng</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Họ và tên</Label>
            <p>{user?.name}</p>
          </div>
          <div>
            <Label>Email</Label>
            <p>{user?.email}</p>
          </div>
          <div>
            <Label>Số điện thoại</Label>
            <p>{user?.phone}</p>
          </div>
          <div>
            <Label>Vai trò</Label>
            <p>{user?.role}</p>
          </div>
          <div>
            <Label>Trạng thái</Label>
            <p>{user?.status}</p>
          </div>
          <div>
            <Label>Đăng nhập cuối</Label>
            <p>{user?.lastLogin}</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewUserModal;