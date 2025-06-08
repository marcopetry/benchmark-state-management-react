import { Button } from "@/components/button";
import { CardProductDefault } from "@/components/card-product/use-cases";
import { useCartActions } from "@/libs/context-api/context-api.hooks";
import { Product } from "@/types/product.types";
import { useNavigate } from "@tanstack/react-router";

type ContextApiProductProps = {
  product: Product;
};

export const ContextApiProduct = ({ product }: ContextApiProductProps) => {
  const navigate = useNavigate();
  const { addToCart, removeFromCart, getProductInCart } = useCartActions();

  const productIsInCart = !!getProductInCart(product.id);

  return (
    <CardProductDefault
      key={product.id}
      product={product}
      onClickSeeDetails={() =>
        navigate({ to: `/context-api/products/${product.id}` })
      }
    >
      {productIsInCart ? (
        <Button onClick={() => removeFromCart(product)} variant="error">
          Remover do Carrinho
        </Button>
      ) : (
        <Button onClick={() => addToCart(product)} variant="success">
          Adicionar ao Carrinho
        </Button>
      )}
    </CardProductDefault>
  );
};
