import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Banner from '../../components/layout/Banner';
import samplePosts from '../../service/BlogService';
import BlogPostCard from '../Blog/BlogPostCard';
import BrandLogos from '../brand/BrandLogo';
import CategoryList from '../categories/CategoryList';
import { ProductList } from '../products';
import BestSellerList from '../products/best_seller/BestSellerList';
import SaleList from '../products/sale/SaleList';
const Home = () => {
  return (
    <div className="justify-center items-center max-w-full mx-auto">
      <div className="flex flex-col justify-center items-center">
        <Banner />
      </div>
      {/* <div className="w-full my-10 px-[90px]"> */}
      <div className="w-full my-10 px-[90px]">
        <CategoryList />
        <div className="justify-center items-center ">
          <BrandLogos />
        </div>
        <section>
          <div className="justify-center items-center max-w-full">
            <ProductList />
          </div>
        </section>
        <section>
          <div className="justify-center items-center max-w-full">
            <SaleList />
          </div>
        </section>
        <section>
          <div className="justify-center items-center max-w-full">
            <BestSellerList />
          </div>
        </section>
        
        <section>
                    <div className="my-10">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-semibold text-purple-400">Bài Viết Mới Nhất</h1>
                            <Link to='/blog' className="flex items-center gap-2 text-blue-600 hover:underline">
                                <span>Xem thêm</span>
                                <FaArrowRight />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                            {samplePosts.slice(0, 5).map(post => (
                                <BlogPostCard key={post.id} post={post} />
                            ))}
                        </div>
                    </div>
                </section>
      </div>
    </div>
  );
};

export default Home;
