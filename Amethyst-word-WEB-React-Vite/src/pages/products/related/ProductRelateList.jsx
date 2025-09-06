import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import ProductRelateCard from './ProductRelateCard'

const ProductRelateList=({ products = [] })=> {
  return(
    <div className="max-w-full mx-auto px-4 py-10">
    <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold text-purple-400 ">Sản phẩm liên quan  </h1>
        <Link to='/shop' className="flex items-center gap-2 text-blue-600 hover:underline">
  <span>Xem thêm</span>
  <FaArrowRight />
</Link>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
        {products.map(product => (
            <ProductRelateCard key={product.producT_ID} product={product} />
        ))}
    </div>
</div>
  )
}
export default ProductRelateList;
