import { atom, useRecoilState } from "recoil";
import { CartItem } from "@/types/cart-item.types";
import { Product } from "@/types/product.types";
import { CartState } from "@/types/cart-state.types";
import { ProductContextType } from "@/types/products-context.types";

// LocalStorage Key
const LOCAL_STORAGE_KEY = "cart-recoil";

// Atom para estado do carrinho
const cartAtom = atom<CartItem[]>({
  key: "cartState",
  default: [],
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      // Inicializa com os dados do localStorage
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        try {
          setSelf(JSON.parse(saved));
        } catch (e) {
          console.error("Erro ao fazer parse do localStorage:", e);
        }
      }

      // Salva no localStorage sempre que mudar
      onSet((newValue, _, isReset) => {
        try {
          if (isReset) {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
          } else {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue));
          }
        } catch (e) {
          console.error("Erro ao salvar no localStorage:", e);
        }
      });
    },
  ],
});

// Hook de uso do carrinho
export const useCart = (): CartState => {
  const [items, setItems] = useRecoilState(cartAtom);

  const updateCart = (next: CartItem[]) => {
    setItems(next);
  };

  const addToCart = (product: Product, quantity = 1) => {
    const existing = items.find((item) => item.id === product.id);
    const nextState = existing
      ? items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      : [...items, { ...product, quantity }];
    updateCart(nextState);
  };

  const removeFromCart = (product: Product) => {
    updateCart(items.filter((item) => item.id !== product.id));
  };

  const increaseQuantity = (product: Product) => {
    const existing = items.find((item) => item.id === product.id);
    const nextState = existing
      ? items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...items, { ...product, quantity: 1 }];
    updateCart(nextState);
  };

  const decreaseQuantity = (product: Product) => {
    const nextState = items
      .map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(nextState);
  };

  const clearCart = () => {
    updateCart([]);
  };

  const getProductInCart = (id: number) => {
    return items.find((item) => item.id === id);
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
};

// Atom para produtos
const productsAtom = atom<Product[]>({
  key: "productsState",
  default: [],
});

// Hook de uso do contexto de produtos
export const useProductsContext = (): ProductContextType => {
  const [products, setProducts] = useRecoilState(productsAtom);
  return { products, setProducts };
};
