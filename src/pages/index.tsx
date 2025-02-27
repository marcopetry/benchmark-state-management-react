import { useProducts } from "../api/use-product";
import { CardProduct } from "../components/card-product";
import { CardProductDescription } from "../components/card-product/card-product-description";
import { CardProductImage } from "../components/card-product/card-product-image";
import { CardProductPrice } from "../components/card-product/card-product-price";
import { CardProductRating } from "../components/card-product/card-product-rating";
import { CardProductTitle } from "../components/card-product/card-product-title";
import { Layout } from "../components/layout";

export const ProductList = () => {
  const { products } = useProducts();
  return (
    <Layout>
      {products.map((product) => (
        <CardProduct
          key={product.id}
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
      ))}
    </Layout>
  );
};
