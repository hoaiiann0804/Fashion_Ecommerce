import React from "react";
import { Button } from "../../components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/DiaLog";

const DeleteUserModal = ({ isOpen, onClose, user, onDeleteUser }) => {
  const handleDelete = () => {
    if (user && user.id) {
      onDeleteUser(user.id);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xóa người dùng</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>
            Bạn có chắc muốn xóa người dùng <strong>{user?.name}</strong>? Hành động này không thể hoàn tác.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Xóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserModal;