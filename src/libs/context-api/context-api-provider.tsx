import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from "react";
import { CartContextProps, LOCAL_STORAGE_KEY } from "./context-api.types";
import { cartReducer, initialState } from "./context-api.hooks";
import { Product } from "@/types/product.types";
import { useLocalStorageState } from "@/hooks/use-local-storage";

export const CartContext = createContext<CartContextProps | undefined>(
  undefined
);

export function CartProvider({ children }: { children: ReactNode }) {
  const [initialStorageState] = useLocalStorageState(
    LOCAL_STORAGE_KEY,
    initialState
  );
  const [state, dispatch] = useReducer(cartReducer, initialStorageState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

type ProductContextType = {
  products: Product[];
  setProducts: (products: Product[]) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductsContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      "useProductContext deve ser usado dentro de um ProductProvider"
    );
  }
  return context;
};
