import { useProducts } from "../api/use-product";
import { CardProduct } from "../components/card-product";
import { Layout } from "../components/layout";

export const ProductList = () => {
  const { products } = useProducts();
  return (
    <Layout>
      {products.map((product) => (
        <CardProduct
          key={product.id}
          product={product}
          onClick={() => {}}
          onClickAction={() => {}}
        />
      ))}
    </Layout>
  );
};
