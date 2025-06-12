import styles from "./page-cart.module.css";
import CheckoutCard from "../checkout-product/checkout-product";

import { useNavigate } from "@tanstack/react-router";
import { UseCartHook } from "@/types/cart-state.types";

type PageCartProps = {
  basePath: string;
  useCart: UseCartHook;
};

export const PageCart: React.FC<PageCartProps> = ({ basePath, useCart }) => {
  const navigate = useNavigate();
  const onCheckout = () => navigate({ to: `${basePath}/checkout` });

  const { increaseQuantity, decreaseQuantity, items } = useCart();

  const total = items.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Seu Carrinho</h1>
        <ul className={styles.list}>
          {items.map((product) => (
            <CheckoutCard
              key={product.id}
              product={product}
              decreaseQuantity={() => decreaseQuantity(product)}
              increaseQuantity={() => increaseQuantity(product)}
            />
          ))}
        </ul>
      </div>

      <footer className={styles.footer}>
        <div className={styles.totalRow}>
          <span>Total:</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
        <button className={styles.checkoutButton} onClick={onCheckout}>
          Finalizar Compra
        </button>
      </footer>
    </div>
  );
};
