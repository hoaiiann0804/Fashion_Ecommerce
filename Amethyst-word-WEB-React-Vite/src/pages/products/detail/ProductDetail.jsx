import { Minus, Plus, ShoppingBag, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useCart } from '../../../context/CartContext';
import { addToCart, addToCartNoAuth } from '../../../service/Cart.Service';
import { GetProductDetail, ProductColors, ProductSizes, getProductImage } from '../../../service/Product.Service';
import { formatPrice } from '../../../utils/formatUtils';

const API_IMAGE = import.meta.env.VITE_API_IMAGE;
const API_URL = import.meta.env.VITE_API_URL;


const ProductDetail = ({ id }) => {
  const [product, setProduct] = useState(null);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const token = localStorage.getItem('token');
  const { updateCartCount } = useCart();
  const [selectImage, setSelectImage] = useState(null);

  useEffect(() => {
    if (selectImage?.images?.length > 0) {
      setMainImage(selectImage.images[0].url);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!id) throw new Error("ID sản phẩm không hợp lệ");

        const detail = await GetProductDetail(id);
        if (detail.producT_ID !== parseInt(id)) throw new Error("Thông tin sản phẩm không chính xác");
        setProduct(detail);

        const colorData = await ProductColors(id);
        setColors(colorData);

        const sizeData = await ProductSizes(id);
        setSizes(sizeData);

        const imageData = await getProductImage(id);
        if (imageData && imageData.length > 0) {
          const mappedImages = imageData.map(img => ({
            url: `${API_IMAGE}/${img.imagE_NAME}`,
            altText: detail.producT_NAME || 'Ảnh sản phẩm'
          }));
          setSelectImage({ images: mappedImages });
          setMainImage(mappedImages[0].url);
        } else if (detail.imagE_NAME) {
          setMainImage(`${API_IMAGE}/${detail.imagE_NAME}`);
        } else {
          setMainImage("/placeholder-image.jpg");
        }
    
      } catch (err) {
        setError(err.message || "Lỗi khi tải dữ liệu sản phẩm");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
          {selectImage?.images?.map((img, idx) => (
            <img
              key={idx}
              src={img.url}
              alt={img.altText}
              onClick={() => setMainImage(img.url)}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === img.url ? 'border-black' : 'border-gray-300'}`}
            />
          ))}
          {selectImage?.images?.map((img, idx) => (
            <img
              key={idx}
              src={img.url}
              alt={img.altText}
              onClick={() => setMainImage(img.url)}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === img.url ? 'border-black' : 'border-gray-300'}`}
            />
          ))}

  const calculateDiscountedPrice = (price, discount) => {
    if (!discount) return price;
    return price - (price * discount / 100);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i + 1 <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  const handleAddToCart = async () => {
    try {
      if (!selectedColor) {
        toast.error('Vui lòng chọn màu sắc');
        return;
      }

      if (!selectedSize) {
        toast.error('Vui lòng chọn kích cỡ');
        return;
      }

      if (!token) {
        // Lấy tên ảnh đầu tiên (ảnh chính) từ selectImage.images[0].url
        const mainImageName = selectImage?.images?.[0]?.url?.split('/').pop() || product.imagE_NAME;

        const isNewItem = addToCartNoAuth(
          product.producT_ID,
          product.producT_NAME,
          product.producT_PRICE,
          mainImageName,
          selectedColor.id,
          selectedColor.coloR_NAME,
          selectedSize.id,
          selectedSize.sizE_NAME,
          quantity,
          product.quantitY_TOTAL
        );
        if (isNewItem) {
          toast.success('Thêm sản phẩm vào giỏ hàng thành công');
        } else {
          toast.error('Sản phẩm đã tồn tại trong giỏ hàng, số lượng đã được cập nhật.');
        }
        
        updateCartCount();
        return;
      }

      const res = await addToCart(token, product.producT_ID, quantity, selectedColor.id, selectedSize.id);
      if (res.code === 201) {
        toast.success('Thêm sản phẩm vào giỏ hàng thành công');
        updateCartCount();
      } else {
        toast.error(res.message || 'Thêm thất bại');
      }
    } catch (err) {
      toast.error('Thêm sản phẩm vào giỏ hàng thất bại');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-96"><div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div></div>;
  if (error) return <div className="flex justify-center items-center h-96 text-red-500">{error}</div>;
  if (!product) return <div className="flex justify-center items-center h-96 text-gray-500">Không tìm thấy sản phẩm</div>;

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col md:flex-row">
            <div className="hidden md:flex flex-col space-y-2 mr-6">
              {selectImage?.images?.map((img, idx) => (
        <img
          key={idx}
          src={img.url}
          alt={img.altText}
          onClick={() => setMainImage(img.url)}
          className={`w-40 h-40 object-cover rounded-lg cursor-pointer border ${mainImage === img.url ? 'border-black' : 'border-gray-300'}`}
        />
      ))}
    </div>
    <div className="w-full max-w-[500px] h-auto bg-white rounded-lg overflow-hidden flex items-center justify-center">
      <img
        src={mainImage || '/placeholder-image.jpg'}
        alt="Ảnh sản phẩm chính"
        className="w-full h-full object-contain"
      />
    </div>
    <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
      {selectImage?.images?.map((img, idx) => (
        <img
          key={idx}
          src={img.url}
          alt={img.altText}
          onClick={() => setMainImage(img.url)}
          className="w-20 h-20 object-cover rounded-lg border"
        />
            ))}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.producT_NAME}</h1>
            <div className="flex items-center mb-4">
              <div className="flex">{renderStars(product.rate)}</div>
              <span className="ml-2 text-gray-500">{product.reviews}</span>
            </div>
            <div className="flex items-center mb-4">
              {product.discounT_PERCENT > 0 ? (
                <>
                  <span className="text-2xl font-bold text-red-600 mr-3">
                    {formatPrice(calculateDiscountedPrice(product.producT_PRICE, product.discounT_PERCENT))}
                  </span>
                  <span className="text-2xl text-gray-400 line-through mr-3">
                    {formatPrice(product.producT_PRICE)}
                  </span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 text-sm rounded">
                    -{product.discounT_PERCENT}%
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold mr-3">{formatPrice(product.producT_PRICE)}</span>
              )}
            </div>
            <p className="text-gray-600 mb-6">{product.producT_DESCRIPTION || product.producT_DETAIL}</p>
            <h3 className="text-2xl text-purple-600 font-bold mb-3">Số lượng: <span className="text-red-600">{product.quantitY_TOTAL}</span></h3>
            <div className="mb-6">
              <h3 className="text-2xl text-purple-600 font-bold mb-3">Chọn màu</h3>
              <div className="flex space-x-3">
                {colors.map((color) => {
                  const colorCode = color.coloR_NAME || '#ccc'; // Giờ coloR_NAME đã là mã Hex
                  return (
                    <button
                      key={color.id}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor?.id === color.id ? 'border-blue-500' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: colorCode }}
                      onClick={() => setSelectedColor(color)}
                      title={colorCode}
                    >
                      {colorCode === '#FFFFFF' && (
                        <div className="w-full h-full rounded-full border border-gray-300"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-2xl text-purple-600 font-bold mb-3">Chọn kích cỡ</h3>
              <div className="flex space-x-3">
                {sizes.map((size) => (
                  <button
                    key={size.id}
                    className={`px-3 py-1 border rounded ${selectedSize?.id === size.id ? 'border-blue-500' : 'border-gray-300'}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size.sizE_NAME}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button className="px-3 py-2" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={16} /></button>
                <span className="px-3 py-2">{quantity}</span>
                <button 
                  className="px-3 py-2" 
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.quantitY_TOTAL}
                ><Plus size={16} /></button>
              </div>
              <button className="flex bg-gradient-to-r from-[#905eb4] to-[#9966cc] text-white py-2 px-4 rounded-md hover:bg-gray-800" onClick={handleAddToCart}>
                <ShoppingBag size={16} className="mr-2" />
                Thêm vào giỏ
              </button>
            </div>
          </div>
          <div className='mt-2 text-start px-3 py-4'>
          <h3 className="text-2xl text-purple-600 font-bold">Mô tả sản phẩm </h3>
          </div>
        </div>
      </div>
                <div className="text-gray-700 space-y-4 leading-relaxed">
            {product.content?.split('.').filter(p => p.trim() !== '').map((paragraph, idx) => (
              <p key={idx}>{paragraph.trim()}.</p>
            ))}
          </div>
    </div>
  );
};

export default ProductDetail;
