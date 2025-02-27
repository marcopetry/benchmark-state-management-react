import { ReactNode } from "@tanstack/react-router";
import { Product } from "../../types/product.types";
import styles from "./card-product.module.css";
import { Button } from "../button";

type CardProductProps = {
  productImage: ReactNode;
  productTitle: ReactNode;
  productDescription: ReactNode;
  productPrice: ReactNode;
  productRating: ReactNode;
  onClick: VoidFunction;
  onClickAction: VoidFunction;
};

export const CardProduct = ({
  onClick,
  onClickAction,
  productDescription,
  productImage,
  productPrice,
  productRating,
  productTitle,
}: CardProductProps) => {
  return (
    <div className={styles.card} onClick={() => onClick()}>
      {productImage}
      {productTitle}
      {productDescription}
      {productPrice}

      <Button onClick={() => onClickAction()} variant="success">
        Adicionar ao Carrinho
      </Button>

      {productRating}
    </div>
  );
};
