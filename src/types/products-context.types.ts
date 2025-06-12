import { Product } from "./product.types";

export type ProductContextType = {
  products: Product[];
  setProducts: (products: Product[]) => void;
};
