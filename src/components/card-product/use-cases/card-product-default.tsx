import { Product } from "@/types/product.types";
import { CardProduct } from "../card-product";
import { CardProductTitle } from "../card-product-title";
import { CardProductImage } from "../card-product-image";
import { CardProductDescription } from "../card-product-description";
import { CardProductPrice } from "../card-product-price";
import { CardProductRating } from "../card-product-rating";
import { Button } from "@/components/button";

export const CardProductDefault = ({ product }: { product: Product }) => {
  return (
    <CardProduct
      onClick={() => {
        console.log(product);
      }}
      productImage={<CardProductImage product={product} />}
      productTitle={<CardProductTitle product={product} />}
      productDescription={<CardProductDescription product={product} />}
      productPrice={<CardProductPrice product={product} />}
      productRating={<CardProductRating product={product} />}
    >
      <Button onClick={() => console.log("ver detalhes")} variant="outlined">
        Ver detalhes
      </Button>
      <div style={{ marginTop: 20 }}>
        <Button
          onClick={() => console.log("adiciona ao carrinho")}
          variant="success"
        >
          Adicionar ao Carrinho
        </Button>
      </div>
    </CardProduct>
  );
};
