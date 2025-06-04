import styles from "./page-cart.module.css";
import CheckoutCard from "../checkout-product/checkout-product";
import { Product } from "@/types/product.types";

type CartPageProps = {
  products: (Product & { quantity: number })[];
  onQuantityChange: (productId: number, newQuantity: number) => void;
  onCheckout: () => void;
};

export const CartPage: React.FC<CartPageProps> = ({
  products,
  onQuantityChange,
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
              onQuantityChange={(newQuantity) =>
                onQuantityChange(product.id, newQuantity)
              }
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
