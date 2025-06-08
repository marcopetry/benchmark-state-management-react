import { CartItem } from "@/types/cart-item";
import { Product } from "@/types/product.types";

export type CartContextProps = {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
};

export enum CartActionType {
  ADD_TO_CART = "ADD_TO_CART",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
  INCREASE_QUANTITY = "INCREASE_QUANTITY",
  DECREASE_QUANTITY = "DECREASE_QUANTITY",
  CLEAR_CART = "CLEAR_CART",
}

export type CartState = {
  items: CartItem[];
};

export type CartAction =
  | {
      type: CartActionType.ADD_TO_CART;
      payload: Product & { quantity?: number };
    }
  | { type: CartActionType.REMOVE_FROM_CART; payload: Product }
  | { type: CartActionType.INCREASE_QUANTITY; payload: Product }
  | { type: CartActionType.DECREASE_QUANTITY; payload: Product }
  | { type: CartActionType.CLEAR_CART };

export const LOCAL_STORAGE_KEY = "context-api-cart";
