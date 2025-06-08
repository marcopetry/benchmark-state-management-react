import styles from "./page-cart.module.css";
import CheckoutCard from "../checkout-product/checkout-product";
import { Product } from "@/types/product.types";

type PageCartProps = {
  products: (Product & { quantity: number })[];
  increaseQuantity: (product: Product) => void;
  decreaseQuantity: (product: Product) => void;
  onCheckout: () => void;
};

export const PageCart: React.FC<PageCartProps> = ({
  products,
  decreaseQuantity,
  increaseQuantity,
  onCheckout,
}) => {
  const total = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Seu Carrinho</h1>
        <ul className={styles.list}>
          {products.map((product) => (
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
