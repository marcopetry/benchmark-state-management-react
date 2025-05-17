import { ReactNode } from "@tanstack/react-router";
import styles from "./card-product.module.css";

type CardProductProps = {
  productImage: ReactNode;
  productTitle: ReactNode;
  productDescription: ReactNode;
  productPrice: ReactNode;
  productRating: ReactNode;
  children: ReactNode;
  onClick: VoidFunction;
};

export const CardProduct = ({
  onClick,
  children,
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

      {children}

      {productRating}
    </div>
  );
};
