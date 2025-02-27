import { Product } from "../../../types/product.types";
import { CardProduct } from "../card-product";
import { CardProductDescription } from "../card-product-description";
import { CardProductImage } from "../card-product-image";
import { CardProductPrice } from "../card-product-price";
import { CardProductRating } from "../card-product-rating";
import { CardProductTitle } from "../card-product-title";

export const CardProductDefault = ({ product }: { product: Product }) => {
  return (
    <CardProduct
      onClick={() => {
        console.log(product);
      }}
      onClickAction={() => {
        console.log(product);
      }}
      productImage={<CardProductImage product={product} />}
      productTitle={<CardProductTitle product={product} />}
      productDescription={<CardProductDescription product={product} />}
      productPrice={<CardProductPrice product={product} />}
      productRating={<CardProductRating product={product} />}
    />
  );
};
