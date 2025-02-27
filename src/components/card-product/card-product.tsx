import { ReactNode } from "@tanstack/react-router";
import { Product } from "../../types/product.types";
import styles from "./card-product.module.css";
import { Button } from "../button";

type CardProductProps = {
  product: Product;
  onClick: (product: Product) => void;
  onClickAction: (product: Product) => void;
};

function renderStars(rating: number) {
  const fullStars = Math.floor(rating); // Estrelas cheias
  const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Meia estrela se houver decimal >= 0.5
  const emptyStars = 5 - fullStars - halfStar; // O restante são estrelas vazias

  return "★".repeat(fullStars) + "⯪".repeat(halfStar) + "☆".repeat(emptyStars);
}

export const CardProduct = ({
  product,
  onClick,
  onClickAction,
}: CardProductProps) => {
  const { description, image, price, title, rating } = product;

  return (
    <div className={styles.card} onClick={() => onClick(product)}>
      <img className={styles.image} src={image} alt={title} />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <p className={styles.price}>R$ {price}</p>

      <Button onClick={() => onClickAction(product)} variant="success">
        Adicionar ao Carrinho
      </Button>

      <div className={styles.rating}>
        <div className={styles.stars}>{renderStars(rating.rate)}</div>
        <span className={styles.count}>({rating.count} avaliações)</span>
      </div>
    </div>
  );
};
