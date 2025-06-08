import { CartItem } from "@/libs/context-api/context-api.types";
import styles from "./checkout-product.module.css";

type CheckoutCardProps = {
  product: CartItem;
  increaseQuantity: VoidFunction;
  decreaseQuantity: VoidFunction;
};

export const CheckoutCard: React.FC<CheckoutCardProps> = ({
  product,
  decreaseQuantity,
  increaseQuantity,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={product.image} alt={product.title} className={styles.image} />
      </div>

      <div className={styles.details}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.price}>R$ {product.price.toFixed(2)}</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.qtyControl}>
          <button onClick={decreaseQuantity}>-</button>
          <span>{product.quantity}</span>
          <button onClick={increaseQuantity}>+</button>
        </div>
        <div className={styles.total}>
          R$ {(product.price * product.quantity).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CheckoutCard;
