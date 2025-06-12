import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product.types";
import { CartItem } from "@/types/cart-item.types";
import { ReactNode } from "react";
import { Provider } from "react-redux";

const LOCAL_STORAGE_KEY = "cart-redux-toolkit";

// --- Cart Slice ---
interface CartState {
  items: CartItem[];
}

const savedCart = localStorage.getItem(LOCAL_STORAGE_KEY);
const initialCartState: CartState = savedCart
  ? JSON.parse(savedCart)
  : { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>
    ) => {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) existing.quantity += quantity;
      else state.items.push({ ...product, quantity });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    },
    increaseQuantity: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existing) existing.quantity += 1;
      else state.items.push({ ...action.payload, quantity: 1 });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    },
    decreaseQuantity: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existing) {
        existing.quantity -= 1;
        if (existing.quantity <= 0)
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
      }
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    },
  },
});

// --- Products Slice ---
interface ProductState {
  products: Product[];
}

const initialProductState: ProductState = { products: [] };

const productsSlice = createSlice({
  name: "products",
  initialState: initialProductState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
});

// --- Store ---
export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    products: productsSlice.reducer,
  },
});

// --- Exports actions ---
export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export const { setProducts } = productsSlice.actions;

// --- Types ---
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

interface ReduxProviderProps {
  children: ReactNode;
}

export const ReduxProvider = ({ children }: ReduxProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};
