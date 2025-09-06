
import { ChevronRight, Search } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import BlogSidebar from '../../components/layout/BlogSideBar';
import FashionPagination from '../../components/panigation/Panigation';
import BestSellerCard from '../products/best_seller/BestSellerCard';
import BlogCategoryFilter from './BlogCategoryFilter';
import BlogNewsletterSignup from './BlogNewsletterSignup';
import BlogPostCard from './BlogPostCard';

// import { bestsellerProducts } from '../../service/ProductData';
import samplePosts from '../../service/BlogService';
// import { relatedProducts } from '../../service/ProductData';
import bg2 from '../../assets/image/360_F_597940292_dmaVD664ccNHMDJqi0Wv0SCSexklLyhO.jpg';

import { ProductBestSeller } from '../../service/Product.Service';
const FashionBlog = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [categories] = useState([
    'Xu hướng thời trang',
    'Hướng dẫn mua sắm',
    'Lịch sử thời trang',
    'Chia sẻ từ người nổi tiếng',
    'Mẹo phối đồ',
    'Bảo quản quần áo'
  ]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const blogRef = useRef(null);
      const fecthProducts = async () => {
          try {
              const response = await ProductBestSeller(10);
              setProducts(response);
          } catch (error) {
              console.error('Error fetching products:', error);
          }
      }
      useEffect(() => {
          fecthProducts();
      }, []);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (blogRef.current) {
      blogRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPosts(samplePosts);
      } catch (error) {
        console.error('Lỗi khi lấy bài viết:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    let result = posts;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query)
      );
    }
    if (selectedCategory) {
      result = result.filter(post => post.category === selectedCategory);
    }
    return result;
  }, [posts, searchQuery, selectedCategory]);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredPosts.length / postsPerPage));
    setCurrentPage(1); 
  }, [filteredPosts, postsPerPage]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleCategoryChange = (category) => setSelectedCategory(category === selectedCategory ? '' : category);

  return (
   
    <div className="pt-[60px]">
      <div className="min-h-screen bg-gray-50">
        <div className="relative">
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-64 md:h-96 w-full">
            <img 
              src={bg2}
              alt="Fashion Blog Hero" 
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <h1 className="text-3xl md:text-5xl font-bold text-center">Blog Thời Trang</h1>
              <p className="text-lg md:text-xl mt-4 text-center max-w-2xl">
                Khám phá xu hướng mới nhất, mẹo phối đồ và hướng dẫn mua sắm thông minh
              </p>
              <div className="mt-8 w-full max-w-lg relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm bài viết..."
                  className="w-full p-3 pl-10 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row">
            <div ref={blogRef} className="lg:w-3/4 lg:pr-8">
              <BlogCategoryFilter 
                categories={categories} 
                selectedCategory={selectedCategory} 
                onCategoryChange={handleCategoryChange} 
              />
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : currentPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                  {currentPosts.map(post => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-medium">Không tìm thấy bài viết nào</h3>
                  <p className="mt-2 text-gray-600">Vui lòng thử tìm kiếm hoặc lọc khác</p>
                </div>
              )}
              <FashionPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
            <div className="lg:w-1/4 mt-8 lg:mt-0">
              <BlogSidebar popularPosts={posts.slice(0, 3)} categories={categories} />
              <BlogNewsletterSignup />
            </div>
          </div>
        </div>
        <div className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Sản Phẩm Nổi Bật</h2>
              <a href="/shop" className="flex items-center text-blue-500 hover:underline">
                Xem tất cả <ChevronRight size={16} />
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {products.map(product => (
                <BestSellerCard key={product.producT_ID} product={product} />
              ))}
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8">Hỏi & Đáp về Thời Trang</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg">Làm thế nào để chọn quần jean phù hợp với dáng người?</h3>
              <p className="text-gray-600 mt-2">
                Để chọn quần jean phù hợp, bạn cần xác định rõ dáng người của mình...
              </p>
              <div className="mt-4">
                <a href="#" className="text-blue-500 hover:underline">Xem thêm câu trả lời (3)</a>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg">Màu sắc nào phù hợp với tông da ngăm đen?</h3>
              <p className="text-gray-600 mt-2">
                Những người có làn da ngăm đen thường rất phù hợp với các màu sắc...
              </p>
              <div className="mt-4">
                <a href="#" className="text-blue-500 hover:underline">Xem thêm câu trả lời (5)</a>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors">
              Đặt câu hỏi mới
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FashionBlog