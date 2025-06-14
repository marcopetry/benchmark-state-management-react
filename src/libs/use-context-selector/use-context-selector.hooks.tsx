import {
  createContext,
  useContextSelector,
  Context,
} from "use-context-selector";
import { FC, ReactNode, useState, useCallback, useEffect } from "react";

import { Product } from "@/types/product.types";
import { CartState } from "@/types/cart-state.types";
import { ProductContextType } from "@/types/products-context.types";
import { CartItem } from "@/types/cart-item.types";

// === Cart Context ===

const LOCAL_STORAGE_KEY_CART = "cart-use-content-selector";
const CartContext = createContext<CartState | undefined>(undefined);

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY_CART);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_CART, JSON.stringify(items));
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
      } else {
        return [...prev, { ...product, quantity }];
      }
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
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
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

  const clearCart = useCallback(() => setItems([]), []);

  const getProductInCart = useCallback(
    (id: number) => items.find((item) => item.id === id),
    [items]
  );

  const value: CartState = {
    items,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getProductInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart(): CartState {
  const context = useContextSelector(
    CartContext as Context<CartState>,
    (ctx) => ctx
  );
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

// === Products Context ===

const ProductsContext = createContext<ProductContextType | undefined>(
  undefined
);

export const ProductsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const setProductsCallback = useCallback((newProducts: Product[]) => {
    setProducts(newProducts);
  }, []);

  const value: ProductContextType = {
    products,
    setProducts: setProductsCallback,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export function useProductsContext(): ProductContextType {
  const context = useContextSelector(
    ProductsContext as Context<ProductContextType>,
    (ctx) => ctx
  );
  if (!context) {
    throw new Error(
      "useProductsContext must be used within a ProductsProvider"
    );
  }
  return context;
}
