import React, { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { ProductSaleNoPaging } from '../../../service/Product.Service'
import SaleCard from './SaleCard'

const SaleList=()=> {
    const [saleproducts, setSaleProducts] = useState([])
    const fecthSaleProducts = async () => {
        try {
            const response = await ProductSaleNoPaging(12);
            setSaleProducts(response);
        } catch (error) {
            console.error('Error fetching sale products:', error);
        }
    }
    useEffect(() => {
        fecthSaleProducts()
    }, [])
    
    return(
    <div className="max-w-full mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-semibold text-purple-400 ">Sản phẩm giảm giá  </h1>
            <Link to='/shop' className="flex items-center gap-2 text-blue-600 hover:underline">
                <span>Xem thêm</span>
                <FaArrowRight />
            </Link>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {saleproducts.map(product => (
                <SaleCard key={product.producT_ID} product={product} />
            ))}
        </div>
    </div>
    )
}
export default SaleList