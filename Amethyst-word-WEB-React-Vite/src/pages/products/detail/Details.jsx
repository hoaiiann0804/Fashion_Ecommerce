import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ProductReviews from "../ProductReviews";
import ProductRelateList from "../related/ProductRelateList";
import ProductDetail from "./ProductDetail";
import { ProductRelated } from '../../../service/Product.Service';

const Details = () => {
  const { id } = useParams();
  const productId = parseInt(id);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const [errorRelated, setErrorRelated] = useState(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!productId || isNaN(productId)) {
        setLoadingRelated(false);
        return;
      }
      try {
        setLoadingRelated(true);
        setErrorRelated(null);
        const data = await ProductRelated(productId);
        setRelatedProducts(data);
      } catch (err) {
        console.error("Error fetching related products:", err);
        setErrorRelated("Lỗi khi tải sản phẩm liên quan");
      } finally {
        setLoadingRelated(false);
      }
    };

    fetchRelatedProducts();
  }, [productId]);

  if (!productId || isNaN(productId)) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-red-500">ID sản phẩm không hợp lệ</div>
      </div>
    );
  }

  return (
    <div className="justify-center items-center max-w-full p-20">
      <ProductDetail id = {productId}
      />
      <div className="justify-center items-center max-w-full">
        <ProductReviews product={productId}  />
      </div>
      
      <div className="flex justify-center items-center w-full">
        {loadingRelated ? (
          <div className="flex justify-center items-center h-48"><div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div></div>
        ) : errorRelated ? (
          <div className="text-red-500">{errorRelated}</div>
        ) : (
          <ProductRelateList products={relatedProducts} />
        )}
      </div>
    </div>
  );
};

export default Details;
