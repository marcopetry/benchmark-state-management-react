import { Product } from "@/types/product.types";
import { useContext, useEffect } from "react";
import {
  CartAction,
  CartActionType,
  CartItemsState,
  LOCAL_STORAGE_KEY,
} from "./react-context-api.types";
import { CartContext } from "./react-context-api-provider";
import { useLocalStorageState } from "@/hooks/use-local-storage";
import { CartState } from "@/types/cart-state.types";

export const initialState: CartItemsState = {
  items: [],
};

export const cartReducer = (
  state: CartItemsState,
  action: CartAction
): CartItemsState => {
  switch (action.type) {
    case CartActionType.ADD_TO_CART: {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: item.quantity + (action.payload.quantity ?? 1),
                }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case CartActionType.REMOVE_FROM_CART: {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    }
    case CartActionType.INCREASE_QUANTITY: {
      if (!state.items.some((i) => i.id === action.payload.id)) {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    case CartActionType.DECREASE_QUANTITY: {
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    }
    case CartActionType.CLEAR_CART: {
      return initialState;
    }
    default:
      return state;
  }
};

export const useCart = (): CartState => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");

  const { dispatch, state } = context;
  const addToCart = (product: Product, quantity?: number) =>
    dispatch({
      type: CartActionType.ADD_TO_CART,
      payload: { ...product, quantity },
    });
  const removeFromCart = (product: Product) =>
    dispatch({ type: CartActionType.REMOVE_FROM_CART, payload: product });
  const increaseQuantity = (product: Product) =>
    dispatch({ type: CartActionType.INCREASE_QUANTITY, payload: product });
  const decreaseQuantity = (product: Product) =>
    dispatch({ type: CartActionType.DECREASE_QUANTITY, payload: product });
  const clearCart = () => dispatch({ type: CartActionType.CLEAR_CART });

  const getProductInCart = (id: number) => state.items.find((p) => p.id === id);

  const [, setLocalStorageState] = useLocalStorageState(
    LOCAL_STORAGE_KEY,
    initialState
  );

  useEffect(() => {
    setLocalStorageState(state);
  }, [state]);

  return {
    items: state.items,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getProductInCart,
  };
};
