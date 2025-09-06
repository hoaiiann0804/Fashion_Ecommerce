/** @file src/components/ui/CartItem.jsx */
import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';
import { deleteCart, removeFromCart } from '../../service/Cart.Service';
import { formatPrice } from '../../utils/formatUtils';
const API_IMAGE = import.meta.env.VITE_API_IMAGE;

/**
 * 
 * @param {Object} props
 * @param {Object} props.product 
 * @param {number} props.product.id 
 * @param {string} props.product.name 
 * @param {string} props.product.size 
 * @param {string} props.product.color 
 * @param {number} props.product.quantity 
 * @param {number} props.product.price 
 * @param {string} props.product.image
 */
const CartItem = ({ product }) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const {selectedItems=[], toggleSelectedItem} = useCart();
  const { updateCartCount, updateQuantity } = useCart();
  const token = localStorage.getItem('token');
  
  const stock = Number(
    product.totaL_QUANTITY ?? product.quantity_total ?? product.quantitY_TOTAL ?? product.stock ?? 0
  );

  const increaseQuantity = () => {
    if (quantity < stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      updateQuantity(product.producT_ID, newQuantity, product.coloR_ID, product.sizE_ID);
    }
  };

  // Fix: disable button when quantity >= stock

  const decreaseQuantity = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    updateQuantity(product.producT_ID, newQuantity, product.coloR_ID, product.sizE_ID);
  };

  

  const handleDelete = async () => {
    try {
      if (!token) {
        removeFromCart(product.producT_ID, product.coloR_ID, product.sizE_ID);
        toast.success('Xóa sản phẩm thành công');
        await updateCartCount();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        return;
      }
      const res = await deleteCart(token, product.producT_ID);
      if (res.code === 200) {
        toast.success('Xóa sản phẩm thành cong');
        await updateCartCount();
        setTimeout(() => {
          window.location.reload();
        }, 2000);

      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Xóa sản phẩm thất bại');
    }
  }; 

  return (
    <div className="flex items-start justify-between py-4 border-b">
      <div className="flex items-start">
      <input
          type='checkbox'
          checked={selectedItems.includes(product.producT_ID)}
          onChange={() => toggleSelectedItem(product.producT_ID)}
          className="mr-4 mt-8 w-5 h-5 accent-[#6666e5]"
        />
        <img
          src={product.imagE_NAME ? `${API_IMAGE}/${product.imagE_NAME}` : '/placeholder-image.jpg'}
          alt={product.name}
          className="w-24 h-28 object-cover mr-4 rounded border-2 border-[#6666e5]"
        />
        <div>
          <h3>{product.producT_NAME}</h3>
          <p className="text-sm text-gray-500">
            Size: {product.sizE_NAME} | Color: {product.coloR_NAME}
          </p>
          <div className="flex items-center mt-2">
            <button
              className="border rounded px-2 py-1 text-xl font-medium"
              onClick={decreaseQuantity}
            >
              -
            </button>
            <span className="mx-2">{quantity}</span>
            <button
              className="border rounded px-2 py-1 text-xl font-medium"
              onClick={increaseQuantity}
              disabled={quantity >= stock}
            >
              +
            </button>
            
          </div>
        </div>
      </div>
      
      <div className="text-xl text-right font-semibold">
        <p>{formatPrice(product.producT_PRICE * quantity)} </p>
        <div className="ml-2">
          <button onClick={handleDelete}>
            <MdDelete className="text-red-500 text-3xl mt-7" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem
