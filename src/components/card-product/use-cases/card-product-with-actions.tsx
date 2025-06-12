import { Button } from "@/components/button";
import { CardProductDefault } from "@/components/card-product/use-cases";
import { UseCartHook } from "@/types/cart-state.types";
import { Product } from "@/types/product.types";
import { useNavigate } from "@tanstack/react-router";

type CardProductWithActionsProps = {
  product: Product;
  useCart: UseCartHook;
  basePath: string;
};

export const CardProductWithActions = ({
  product,
  basePath,
  useCart,
}: CardProductWithActionsProps) => {
  const navigate = useNavigate();
  const { addToCart, removeFromCart, getProductInCart } = useCart();

  const productIsInCart = !!getProductInCart(product.id);

  return (
    <CardProductDefault
      key={product.id}
      product={product}
      onClickSeeDetails={() =>
        navigate({ to: `/${basePath}/products/${product.id}` })
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
