// store.tsx
import { useCallback, useEffect, useState } from "react";
import constate from "constate";
import { Product } from "@/types/product.types";
import { CartItem } from "@/types/cart-item.types";
import { CartState } from "@/types/cart-state.types";

const LOCAL_STORAGE_KEY = "cart-constate";

/* ----------------------------- CART HOOK ----------------------------- */
function useCartHook(): CartState {
  const [items, setItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((product: Product) => {
    setItems((prev) => prev.filter((item) => item.id !== product.id));
  }, []);

  const increaseQuantity = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const decreaseQuantity = useCallback((product: Product) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getProductInCart = useCallback(
    (id: number) => items.find((item) => item.id === id),
    [items]
  );

  return {
    items,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getProductInCart,
  };
}

export const [CartProvider, useCart] = constate(useCartHook);

/* -------------------------- PRODUCTS HOOK ---------------------------- */
type ProductStore = {
  products: Product[];
  setProducts: (products: Product[]) => void;
};

function useProductsHook(): ProductStore {
  const [products, setProducts] = useState<Product[]>([]);

  const updateProducts = useCallback((newProducts: Product[]) => {
    setProducts(newProducts);
  }, []);

  return {
    products,
    setProducts: updateProducts,
  };
}

export const [ProductsProvider, useProductsContext] = constate(useProductsHook);
