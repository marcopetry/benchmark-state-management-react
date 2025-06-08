import { PageCheckout } from "@/components/page-checkout";
import { useCart } from "@/libs/context-api/context-api.hooks";
import { useNavigate } from "@tanstack/react-router";

export const ContextApiPageCheckout = () => {
  const { state } = useCart();
  const navigate = useNavigate();
  return (
    <PageCheckout
      products={state.items}
      onSubmit={() => navigate({ to: "/context-api/products" })}
    />
  );
};
