import { useState } from "react";
import styles from "./product-details.module.css";
import { Product } from "@/types/product.types";

type ProductDetailProps = {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
};

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, value));
  };

  return (
    <div className={styles.container}>
      <div className={styles.productCard}>
        <div className={styles.imageWrapper}>
          <img
            src={product.image}
            alt={product.title}
            className={styles.productImage}
          />
        </div>
        <div className={styles.info}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.price}>${product.price.toFixed(2)}</div>
          <div className={styles.rating}>
            ⭐ {product.rating.rate} ({product.rating.count} avaliações)
          </div>
          <div className={styles.actions}>
            <div className={styles.quantityGroup}>
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className={styles.quantityButton}
              >
                −
              </button>
              <span className={styles.quantityText}>{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className={styles.quantityButton}
              >
                +
              </button>
            </div>
            <button
              onClick={() => onAddToCart(product, quantity)}
              className={styles.addButton}
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
