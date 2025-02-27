import { Product } from "../../../types/product.types";
import { CardProduct } from "../card-product";
import { CardProductPrice } from "../card-product-price";
import { CardProductTitle } from "../card-product-title";

export const CardProductCarShop = ({ product }: { product: Product }) => {
  return (
    <CardProduct
      onClick={() => {
        console.log(product);
      }}
      onClickAction={() => {
        console.log(product);
      }}
      productTitle={<CardProductTitle product={product} />}
      productPrice={<CardProductPrice product={product} />}
      productImage={
        <img src={product.image} alt={product.title} width={60} height={60} />
      }
      productDescription={null}
      productRating={null}
    />
  );
};
