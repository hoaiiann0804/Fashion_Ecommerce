import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getReview } from '../../service/Review.Service';

const ProductReviews= ({product})=>{
  const [filterRating, setFilterRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsData, setReviewsData] = useState([]);
  const reviewsPerPage = 5;


  const filteredReviews = filterRating > 0 
    ? reviewsData.filter(review => review.rating === filterRating)
    : reviewsData;

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  // Hàm render sao đơn giản
  const renderStars = (rating) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <Star 
        key={star} 
        size={16} 
        className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
      />
    ));
  };
  useEffect(()=>{
    const fetchReview = async () => {
      try {
        const data = await getReview(product);
        setReviewsData(data);
      } catch (error) {
        console.error("Lỗi khi tải đánh giá:", error);
      }
    }
    fetchReview();
  },[])


  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Đánh Giá Sản Phẩm</h1>

      {/* Phần lọc đơn giản */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {filterRating > 0 ? `Đánh giá ${filterRating} sao` : 'Tất cả đánh giá'}
        </h2>
        <select 
          className="border rounded px-3 py-1"
          value={filterRating}
          onChange={(e) => {
            setFilterRating(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value="0">Tất cả</option>
          <option value="5">5 sao</option>
          <option value="4">4 sao</option>
          <option value="3">3 sao</option>
          <option value="2">2 sao</option>
          <option value="1">1 sao</option>
        </select>
      </div>

      {/* Form review đơn giản */}
      {/* <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-medium mb-3">Viết đánh giá của bạn</h3>
        <form onSubmit={handleSubmitReview}>
          <input
            type="text"
            placeholder="Tên của bạn"
            className="w-full p-2 border rounded mb-3"
            value={newReview.name}
            onChange={(e) => setNewReview({...newReview, name: e.target.value})}
            required
          />
          <div className="flex mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setNewReview({...newReview, rating: star})}
              >
                <Star 
                  size={20}
className={
                    star <= newReview.rating 
                      ? "fill-yellow-400 text-yellow-400" 
                      : "text-gray-300"
                  } 
                />
              </button>
            ))}
          </div>
          <textarea
            placeholder="Nhận xét của bạn"
            rows="3"
            className="w-full p-2 border rounded mb-3"
            value={newReview.comment}
            onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
            required
          ></textarea>
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Gửi đánh giá
          </button>
        </form>
      </div> */}

      {/* Danh sách reviews */}
      <div className="space-y-4">
        {reviewsData.length > 0 ? (
          reviewsData.map((review) => (
            <div key={review.id} className="border-b pb-4">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium">{review.useR_LAST_NAME}</h4>
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {renderStars(review.rate)}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
                {review.verified && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Đã xác minh
                  </span>
                )}
              </div>
              <p className="mt-2">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-center py-4">Không có đánh giá nào</p>
        )}
      </div>

      {/* Phân trang đơn giản */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-l disabled:opacity-50"
          >
            Trước
          </button>
          <span className="px-3 py-1 border-t border-b">
            Trang {currentPage}/{totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-r disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
}
export default ProductReviews;