import { useHookstate } from "@hookstate/core";
import { localstored } from "@hookstate/localstored";
import { Product } from "@/types/product.types";
import { CartItem } from "@/types/cart-item.types";
import { CartState } from "@/types/cart-state.types";

const LOCAL_STORAGE_KEY_CART = "cart-hookstate";

export function useCart(): CartState {
  const state = useHookstate<CartItem[]>(
    [],
    localstored({ key: LOCAL_STORAGE_KEY_CART })
  );

  function addToCart(product: Product, quantity = 1) {
    const index = state.get().findIndex((item) => item.id === product.id);
    if (index >= 0) {
      state[index].quantity.set((q) => q + quantity);
    } else {
      state.merge([{ ...product, quantity }]);
    }
  }

  function removeFromCart(product: Product) {
    state.set((items) => items.filter((item) => item.id !== product.id));
  }

  function increaseQuantity(product: Product) {
    const index = state.get().findIndex((item) => item.id === product.id);
    if (index >= 0) {
      state[index].quantity.set((q) => q + 1);
    } else {
      state.merge([{ ...product, quantity: 1 }]);
    }
  }

  function decreaseQuantity(product: Product) {
    const updated = state
      .get()
      .map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    state.set(updated);
  }

  function clearCart() {
    state.set([]);
  }

  function getProductInCart(id: number) {
    return state.get().find((item) => item.id === id);
  }

  return {
    items: state.get() as CartItem[],
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getProductInCart,
  };
}

export function useProductsContext() {
  const state = useHookstate<Product[]>([]);

  function setProducts(products: Product[]) {
    state.set(products);
  }

  return {
    products: state.get() as Product[],
    setProducts,
  };
}
