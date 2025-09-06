import { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { ProductBestSeller } from '../../../service/Product.Service';
import BestSellerCard from './BestSellerCard';

const BestSellerList = () => {
    const [products, setProducts] = useState([]);

    const fecthProducts = async () => {
        try {
            const response = await ProductBestSeller(12);
            console.log('Best seller: ', response);
            setProducts(response);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
    useEffect(() => {
        fecthProducts();
    }, []);

    return (
        <div className="max-w-full mx-auto px-4 ">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-semibold text-purple-400 ">Sản phẩm bán chạy </h1>
                <Link to='/shop' className="flex items-center gap-2 text-blue-600 hover:underline">
                    <span>Xem thêm</span>
                    <FaArrowRight />
                </Link>
            </div>
            
            {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
                {products.map(product => (
                    <BestSellerCard key={product.producT_ID} product={product} />
                ))}
            </div>
        </div>
    );
};

export default BestSellerList;

