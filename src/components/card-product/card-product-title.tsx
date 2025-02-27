import { Product } from "../../types/product.types";
import styles from "./card-product.module.css";

export const CardProductTitle = ({ product }: { product: Product }) => {
  return <h2 className={styles.title}>{product.title}</h2>;
};
