import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product.types";
import { CartState } from "@/types/cart-state.types";

export const LOCAL_STORAGE_KEY = "cart-zustand";

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product, quantity = 1) => {
        const existing = get().items.find((item) => item.id === product.id);
        if (existing) {
          set({
            items: get().items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            items: [...get().items, { ...product, quantity }],
          });
        }
      },

      removeFromCart: (product) =>
        set({
          items: get().items.filter((item) => item.id !== product.id),
        }),

      increaseQuantity: (product) => {
        const existing = get().items.find((item) => item.id === product.id);
        if (existing) {
          set({
            items: get().items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [...get().items, { ...product, quantity: 1 }],
          });
        }
      },

      decreaseQuantity: (product) =>
        set({
          items: get()
            .items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        }),

      clearCart: () => set({ items: [] }),

      getProductInCart: (id) => get().items.find((item) => item.id === id),
    }),
    {
      name: LOCAL_STORAGE_KEY,
    }
  )
);

type ProductStore = {
  products: Product[];
  setProducts: (products: Product[]) => void;
};

export const useProductsContext = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));
