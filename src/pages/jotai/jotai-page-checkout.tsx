import { PageCheckout } from "@/components/page-checkout";
import { useCart } from "@/libs/jotai/jotai.hooks";
import { useNavigate } from "@tanstack/react-router";

export const JotaiPageCheckout = () => {
  const { items } = useCart();
  const navigate = useNavigate();
  return (
    <PageCheckout
      products={items}
      onSubmit={() => navigate({ to: "/jotai/products" })}
    />
  );
};
