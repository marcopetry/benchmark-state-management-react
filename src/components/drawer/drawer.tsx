import { useEffect } from "react";
import styles from "./drawer.module.css";
import CheckoutCard from "../checkout-product/checkout-product";
import type { Product } from "@/types/product.types"; // ajuste se estiver em outro lugar

type DrawerProps = {
  products: Product[];
  onClose?: () => void;
  onCheckout?: () => void;
};

export const Drawer: React.FC<DrawerProps> = ({
  products,
  onClose,
  onCheckout,
}) => {
  const total = products.reduce((sum, p) => sum + p.price * 1, 0); // default quantity = 1

  const handleClose = () => {
    onClose?.();
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className={styles.closeButton}>
          ×
        </button>

        <div className={styles.container}>
          <div className={styles.scrollArea}>
            <h2 className={styles.heading}>Seu Carrinho</h2>
            <ul className={styles.list}>
              {products.map((product) => (
                <CheckoutCard
                  key={product.id}
                  product={{ ...product, quantity: 1 }}
                  onQuantityChange={() => {}}
                />
              ))}
            </ul>
          </div>

          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span>Total:</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            <button onClick={onCheckout} className={styles.checkoutButton}>
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
