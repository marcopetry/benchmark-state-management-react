import { Product } from "@/types/product.types";
import styles from "./card-product.module.css";

export const CardProductPrice = ({ product }: { product: Product }) => {
  return <p className={styles.price}>R$ {product.price.toFixed(2)}</p>;
};
