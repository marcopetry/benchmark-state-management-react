import { CartItem } from "./cart-item.types";
import { Product } from "./product.types";

export interface CartState {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (product: Product) => void;
  increaseQuantity: (product: Product) => void;
  decreaseQuantity: (product: Product) => void;
  clearCart: () => void;
  getProductInCart: (id: number) => CartItem | undefined;
}

export type UseCartHook = () => CartState;
