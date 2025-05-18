import { Product } from "@/types/product.types";
import styles from "./card-product.module.css";

function renderStars(rating: number) {
  const fullStars = Math.floor(rating); // Estrelas cheias
  const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Meia estrela se houver decimal >= 0.5
  const emptyStars = 5 - fullStars - halfStar; // O restante são estrelas vazias

  return "★".repeat(fullStars) + "⯪".repeat(halfStar) + "☆".repeat(emptyStars);
}

export const CardProductRating = ({ product }: { product: Product }) => {
  return (
    <div className={styles.rating}>
      <div className={styles.stars}>{renderStars(product.rating.rate)}</div>
      <span className={styles.count}>({product.rating.count} avaliações)</span>
    </div>
  );
};
