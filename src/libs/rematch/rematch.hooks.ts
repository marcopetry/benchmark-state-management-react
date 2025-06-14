import { CartItem } from "@/types/cart-item.types";
import { CartState } from "@/types/cart-state.types";
import { Product } from "@/types/product.types";

import { init, Models, RematchDispatch, RematchRootState } from "@rematch/core";
import createRematchPersist from "@rematch/persist";
import storage from "redux-persist/lib/storage";

import {
  createDispatchHook,
  createSelectorHook,
  createStoreHook,
} from "react-redux";

// ---------------- CART MODEL ----------------
const cartInitialState: CartState = { items: [] } as unknown as CartState;

export const cart = {
  state: cartInitialState,
  reducers: {
    setItems(state: CartState, items: CartItem[]): CartState {
      return { ...state, items };
    },
    addToCart(
      state: CartState,
      payload: { product: Product; quantity: number }
    ): CartState {
      const { product, quantity } = payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...product, quantity }],
      };
    },
    removeFromCart(state: CartState, product: Product): CartState {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== product.id),
      };
    },
    increaseQuantity(state: CartState, product: Product): CartState {
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...product, quantity: 1 }],
      };
    },
    decreaseQuantity(state: CartState, product: Product): CartState {
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    },
    clearCart(): CartState {
      return { items: [] } as unknown as CartState;
    },
  },
};

// ---------------- PRODUCTS MODEL ----------------
export interface ProductsState {
  products: Product[];
}

const productsInitialState: ProductsState = { products: [] };

export const products = {
  state: productsInitialState,
  reducers: {
    setProducts(state: ProductsState, products: Product[]): ProductsState {
      return { ...state, products };
    },
  },
};

// ---------------- ROOT MODEL ----------------
export interface RootModel extends Models<RootModel> {
  cart: typeof cart;
  products: typeof products;
}

export const models: RootModel = {
  cart,
  products,
};

// ---------------- STORE & HOOKS ----------------
const persistPlugin = createRematchPersist({
  key: "cart-rematch",
  version: 1,
  storage,
  whitelist: ["cart"],
});

export const store = init({
  models,
  plugins: [persistPlugin] as any,
});

export type Store = typeof store;
export type RootState = RematchRootState<RootModel>;
export type Dispatch = RematchDispatch<RootModel>;

export const useStoreDispatch = createDispatchHook<RootState>();
export const useStoreSelector = createSelectorHook();
export const useStore = createStoreHook<RootState>();

// ---------------- HOOK: useCart ----------------
export function useCart() {
  const items = useStoreSelector(
    (state: { cart: { items: CartItem[] } }) => state.cart.items
  );
  const dispatch = useStoreDispatch();

  const addToCart = (product: Product, quantity = 1) => {
    dispatch.cart.addToCart({ product, quantity });
  };

  const removeFromCart = (product: Product) => {
    dispatch.cart.removeFromCart(product);
  };

  const increaseQuantity = (product: Product) => {
    dispatch.cart.increaseQuantity(product);
  };

  const decreaseQuantity = (product: Product) => {
    dispatch.cart.decreaseQuantity(product);
  };

  const clearCart = () => {
    dispatch.cart.clearCart();
  };

  const getProductInCart = (id: number) => {
    return items.find((item: Product) => item.id === id);
  };

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

// ---------------- HOOK: useProductsContext ----------------
export function useProductsContext() {
  const products = useStoreSelector(
    (state: { products: { products: Product[] } }) => state.products.products
  );
  const dispatch = useStoreDispatch();

  const setProducts = (products: Product[]) => {
    dispatch.products.setProducts(products);
  };

  return {
    products,
    setProducts,
  };
}
