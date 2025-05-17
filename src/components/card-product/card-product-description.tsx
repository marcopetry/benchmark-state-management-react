import { Product } from "../../types/product.types";
import styles from "./card-product.module.css";

export const CardProductDescription = ({ product }: { product: Product }) => {
  return <p className={styles.description}>{product.description}</p>;
};
