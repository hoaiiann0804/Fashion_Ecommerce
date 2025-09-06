import React, { useState } from "react";
import Modal from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { Select } from "../../components/ui/Select";
import { Textarea } from "../../components/ui/Textarea";

const ReviewEditModal = ({ isOpen, onClose, review, onSave }) => {
  const [formData, setFormData] = useState(review || { rating: 1, comment: "", status: "Chờ duyệt" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const ratingOptions = [
    { value: 1, label: "1 sao" },
    { value: 2, label: "2 sao" },
    { value: 3, label: "3 sao" },
    { value: 4, label: "4 sao" },
    { value: 5, label: "5 sao" }
  ];

  const statusOptions = [
    { value: "Đã duyệt", label: "Đã duyệt" },
    { value: "Chờ duyệt", label: "Chờ duyệt" },
    { value: "Đã từ chối", label: "Đã từ chối" }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Chỉnh sửa đánh giá">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Bình luận</label>
          <Textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Nhập bình luận..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Đánh giá</label>
          <Select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            options={ratingOptions}
            placeholder="Chọn số sao"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Trạng thái</label>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={statusOptions}
            placeholder="Chọn trạng thái"
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onClose}>
          Hủy
        </Button>
        <Button onClick={handleSave}>Lưu</Button>
      </div>
    </Modal>
  );
};

export default ReviewEditModal;