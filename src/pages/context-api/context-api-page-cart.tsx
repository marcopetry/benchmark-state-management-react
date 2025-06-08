import { PageCart } from "@/components/page-cart";
import { useCart, useCartActions } from "@/libs/context-api/context-api.hooks";
import { useNavigate } from "@tanstack/react-router";

export const ContextApiPageCart = () => {
  const { state } = useCart();
  const { increaseQuantity, decreaseQuantity } = useCartActions();

  const navigate = useNavigate();
  const onCheckout = () => navigate({ to: "context-api/checkout" });

  return (
    <PageCart
      products={state.items}
      decreaseQuantity={decreaseQuantity}
      increaseQuantity={increaseQuantity}
      onCheckout={onCheckout}
    />
  );
};
