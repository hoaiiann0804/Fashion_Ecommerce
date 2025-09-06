import React from "react";
import Modal from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";

const ReviewDeleteModal = ({ isOpen, onClose, onDelete }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Xác nhận xóa">
      <p>Bạn có chắc muốn xóa đánh giá này? Hành động này không thể hoàn tác.</p>
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onClose}>
          Hủy
        </Button>
        <Button variant="destructive" onClick={onDelete}>
          Xóa
        </Button>
      </div>
    </Modal>
  );
};

export default ReviewDeleteModal;