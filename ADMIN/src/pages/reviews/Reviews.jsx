import React, { useState } from "react";
import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/Card";
import ReviewsFilter from "./ReviewsFilter";
import ReviewTable from "./ReviewTable";
import ReviewDetailModal from "./ReviewDetailModal";
import ReviewEditModal from "./ReviewEditModal";
import ReviewDeleteModal from "./ReviewDeleteModal";
import mockReviews from "../../services/mockReviews";

const Reviews = () => {
  const [reviews, setReviews] = useState(mockReviews);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [selectedReview, setSelectedReview] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  // Lọc đánh giá
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "Tất cả" || review.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Xử lý xem chi tiết
  const handleView = (review) => {
    setSelectedReview(review);
    setIsDetailModalOpen(true);
  };

  // Xử lý chỉnh sửa
  const handleEdit = (review) => {
    setSelectedReview(review);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedReview) => {
    setReviews(reviews.map((r) => (r.id === updatedReview.id ? { ...r, ...updatedReview } : r)));
  };

  // Xử lý xóa
  const handleDelete = (reviewId) => {
    setReviewToDelete(reviewId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setReviews(reviews.filter((r) => r.id !== reviewToDelete));
    setIsDeleteModalOpen(false);
    setReviewToDelete(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Quản lý đánh giá</h1>
        </div>

        <ReviewsFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Danh sách đánh giá</CardTitle>
          </CardHeader>
          <CardContent>
            <ReviewTable
              reviews={filteredReviews}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </CardContent>
        </Card>

        <ReviewDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          review={selectedReview}
        />

        <ReviewEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          review={selectedReview}
          onSave={handleSaveEdit}
        />

        <ReviewDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={confirmDelete}
        />
      </div>
    </DashboardLayout>
  );
};

export default Reviews;