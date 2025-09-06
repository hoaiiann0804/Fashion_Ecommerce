/** @file src/components/ui/index.js */

/**
 * Re-exports cart-related components and data
 * @module Cart
 */

/** CartDrawer component for sliding cart drawer */
export { default as CartDrawer } from './CartDrawer';

/** CartContent component for listing cart items */
export { default as CartContent } from './CartContent';

/** CartItem component for displaying a single cart item */
export { default as CartItem } from './CartItem';

/** CartFooter component for cart summary and actions */
export { default as CartFooter } from './CartFooter';

/** Array of cart items data */
export { cartProducts } from './CartData';