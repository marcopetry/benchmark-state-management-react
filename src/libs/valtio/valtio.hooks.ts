// stores/cart-store.ts
import { proxy, useSnapshot } from "valtio";
import { Product } from "@/types/product.types";
import { CartItem } from "@/types/cart-item.types";
import { CartState } from "@/types/cart-state.types";
import { ProductContextType } from "@/types/products-context.types";

// Estado base com proxy
const cartState = proxy<{ items: CartItem[] }>({
  items: [],
});

export const cartActions = {
  addToCart(product: Product, quantity: number = 1) {
    const existing = cartState.items.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cartState.items.push({ ...product, quantity });
    }
  },

  removeFromCart(product: Product) {
    cartState.items = cartState.items.filter((item) => item.id !== product.id);
  },

  increaseQuantity(product: Product) {
    const existing = cartState.items.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cartState.items.push({ ...product, quantity: 1 });
    }
  },

  decreaseQuantity(product: Product) {
    cartState.items = cartState.items
      .map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
  },

  clearCart() {
    cartState.items = [];
  },

  getProductInCart(id: number) {
    return cartState.items.find((item) => item.id === id);
  },
};

export function useCart(): CartState {
  const snapshot = useSnapshot(cartState);
  return {
    items: snapshot.items as CartItem[],
    ...cartActions,
  };
}

const productState = proxy<{ products: Product[] }>({
  products: [],
});

export const productActions = {
  setProducts(products: Product[]) {
    productState.products = products;
  },
};

export function useProductsContext(): ProductContextType {
  const snapshot = useSnapshot(productState);
  return {
    products: snapshot.products as Product[],
    ...productActions,
  };
}
