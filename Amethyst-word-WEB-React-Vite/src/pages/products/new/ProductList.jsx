import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ProductNew } from '../../../service/Product.Service';
import ProductCard from './ProductCard';

const ProductList = () => {
    const [newProducts, setNewProducts] = useState([]);
    const fetchNewProducts = async () => {
        try {
            const response = await ProductNew(12);
            setNewProducts(response);
        } catch (error) {
            console.error('Error fetching new products:', error);
        }
    };
    useEffect(() => {
        fetchNewProducts();
    },[]);
    
    return (
        <div className="max-w-full mx-auto px-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-semibold text-purple-400 ">Sản phẩm mới  </h1>
                <Link to='/shop' className="flex items-center gap-2 text-blue-600 hover:underline">
                    <span>Xem thêm</span>
                    <FaArrowRight />
                </Link>
            </div>
        
                    {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
                {newProducts.map(product => (
                    <ProductCard key={product.producT_ID} product={product} />
            ))}
            </div>
        </div>
    )
}
export default ProductList