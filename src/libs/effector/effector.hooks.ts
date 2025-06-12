import { createStore, createEvent } from "effector";
import { useStore } from "effector-react";
import { Product } from "@/types/product.types";
import { CartItem } from "@/types/cart-item.types";

// Constante para localStorage
const LOCAL_STORAGE_KEY = "cart-effector";

// --- Cart Store ---

// Eventos
const addToCart = createEvent<{ product: Product; quantity?: number }>();
const removeFromCart = createEvent<Product>();
const increaseQuantity = createEvent<Product>();
const decreaseQuantity = createEvent<Product>();
const clearCart = createEvent<void>();

// Store inicial do carrinho, tentamos carregar do localStorage
const initialCartItems: CartItem[] = (() => {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
})();

const $cartItems = createStore<CartItem[]>(initialCartItems);

// Lógica para adicionar produto (considera se já existe, soma quantidade)
$cartItems.on(addToCart, (state, { product, quantity = 1 }) => {
  const existing = state.find((item) => item.id === product.id);
  if (existing) {
    return state.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  }
  return [...state, { ...product, quantity }];
});

// Remove produto
$cartItems.on(removeFromCart, (state, product) =>
  state.filter((item) => item.id !== product.id)
);

// Aumenta quantidade
$cartItems.on(increaseQuantity, (state, product) => {
  const existing = state.find((item) => item.id === product.id);
  if (existing) {
    return state.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  return [...state, { ...product, quantity: 1 }];
});

// Diminui quantidade e filtra itens com quantidade 0 ou menos
$cartItems.on(decreaseQuantity, (state, product) =>
  state
    .map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
    )
    .filter((item) => item.quantity > 0)
);

// Limpa carrinho
$cartItems.on(clearCart, () => []);

// Persistência: Sempre que o store muda, atualizamos localStorage
$cartItems.watch((items) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
});

// Hook React para usar o estado e ações do carrinho
export const useCart = () => {
  const items = useStore($cartItems);

  const addToCartFn = (product: Product, quantity?: number) =>
    addToCart({ product, quantity });

  const removeFromCartFn = (product: Product) => removeFromCart(product);

  const increaseQuantityFn = (product: Product) => increaseQuantity(product);

  const decreaseQuantityFn = (product: Product) => decreaseQuantity(product);

  const clearCartFn = () => clearCart();

  const getProductInCart = (id: number) => items.find((item) => item.id === id);

  return {
    items,
    addToCart: addToCartFn,
    removeFromCart: removeFromCartFn,
    increaseQuantity: increaseQuantityFn,
    decreaseQuantity: decreaseQuantityFn,
    clearCart: clearCartFn,
    getProductInCart,
  };
};

// --- Products Store ---

const setProducts = createEvent<Product[]>();

const $products = createStore<Product[]>([]).on(
  setProducts,
  (_, products) => products
);

export const useProductsContext = () => {
  const products = useStore($products);
  return {
    products,
    setProducts,
  };
};
