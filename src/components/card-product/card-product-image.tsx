import { Product } from "../../types/product.types";
import styles from "./card-product.module.css";

export const CardProductImage = ({ product }: { product: Product }) => {
  return (
    <img className={styles.image} src={product.image} alt={product.title} />
  );
};
