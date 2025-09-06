import { lazy, Suspense } from 'react';
import { useCart } from '../../context/CartContext';
const CartItem = lazy(() => import('./CartItem'));
const CartContent = () => {
  const { cartItems, selectedItems, selectAllItems, clearSelectedItems } = useCart();

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      selectAllItems(cartItems);
    } else {
      clearSelectedItems();
    }
  };

  return (
    <div>
      {cartItems.length > 0 ? (
        <>
          <div className='flex items-center p-4 border-b'>
            <input
              type="checkbox"
              checked={selectedItems.length === cartItems.length && cartItems.length > 0}
              onChange={handleSelectAll}
              className="w-5 h-5 accent-[#6666e5] mr-2"
            />
            <span className="text-sm font-medium">
              Chọn tất cả ({cartItems.length} sản phẩm)
            </span>
          </div>
          <Suspense fallback={<p>Loading cart items...</p>}>
            {cartItems.map((product) => (
              <CartItem key={product.producT_ID} product={product} />
            ))}
          </Suspense>
        </>
      ) : (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartContent;

