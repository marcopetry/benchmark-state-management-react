// atoms/cart.ts
import { atom, useAtom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Product } from "@/types/product.types";
import { CartItem } from "@/types/cart-item.types";
import { CartState } from "@/types/cart-state.types";
import { ProductContextType } from "@/types/products-context.types";
const LOCAL_STORAGE_KEY = "cart-jotai";

const cartItemsAtom = atomWithStorage<CartItem[]>(LOCAL_STORAGE_KEY, []);

const getProductInCartAtom = atom((get) => (id: number) => {
  return get(cartItemsAtom).find((item) => item.id === id);
});

export function useCart(): CartState {
  const [items, setItems] = useAtom(cartItemsAtom);
  const getProductInCart = useAtomValue(getProductInCartAtom);

  function addToCart(product: Product, quantity: number = 1) {
    const existing = items.find((item) => item.id === product.id);
    if (existing) {
      setItems(
        items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setItems([...items, { ...product, quantity }]);
    }
  }

  function removeFromCart(product: Product) {
    setItems(items.filter((item) => item.id !== product.id));
  }

  function increaseQuantity(product: Product) {
    const existing = items.find((item) => item.id === product.id);
    if (existing) {
      setItems(
        items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setItems([...items, { ...product, quantity: 1 }]);
    }
  }

  function decreaseQuantity(product: Product) {
    setItems(
      items
        .map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function clearCart() {
    setItems([]);
  }

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

const productsAtom = atom<Product[]>([]);

export function useProductsContext(): ProductContextType {
  const [products, setProducts] = useAtom(productsAtom);

  return {
    products,
    setProducts,
  };
}
