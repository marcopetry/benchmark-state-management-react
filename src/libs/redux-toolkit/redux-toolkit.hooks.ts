import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./redux-toolkit-provider";
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  setProducts,
} from "./redux-toolkit-provider";
import type { Product } from "@/types/product.types";

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);

  return {
    items,
    addToCart: (product: Product, quantity?: number) =>
      dispatch(addToCart({ product, quantity })),
    removeFromCart: (product: Product) => dispatch(removeFromCart(product)),
    increaseQuantity: (product: Product) => dispatch(increaseQuantity(product)),
    decreaseQuantity: (product: Product) => dispatch(decreaseQuantity(product)),
    clearCart: () => dispatch(clearCart()),
    getProductInCart: (id: number) => items.find((item) => item.id === id),
  };
};

export const useProductsContext = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);

  return {
    products,
    setProducts: (products: Product[]) => dispatch(setProducts(products)),
  };
};
