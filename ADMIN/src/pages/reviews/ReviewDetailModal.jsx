import React from "react";
import Modal from "../../components/ui/Modal";
import { renderStarRating, getStatusBadge } from "../../utils/ReviewUtils";
import { Button } from "../../components/ui/Button";
const ReviewDetailModal = ({ isOpen, onClose, review }) => {
  if (!review) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Chi tiết đánh giá">
      <div className="space-y-4">
        <div>
          <strong>ID:</strong> {review.id}
        </div>
        <div>
          <strong>Sản phẩm:</strong> {review.product}
        </div>
        <div>
          <strong>Người dùng:</strong> {review.user}
        </div>
        <div>
          <strong>Đánh giá:</strong> {renderStarRating(review.rating)}
        </div>
        <div>
          <strong>Bình luận:</strong> <p>{review.comment}</p>
        </div>
        <div>
          <strong>Ngày tạo:</strong> {review.date}
        </div>
        <div>
          <strong>Trạng thái:</strong> {getStatusBadge(review.status)}
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button variant="outline" onClick={onClose}>
          Đóng
        </Button>
      </div>
    </Modal>
  );
};

export default ReviewDetailModal;