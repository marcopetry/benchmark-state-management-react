import { useEffect, useRef, useState } from "react";
import { Drawer } from "@/components/drawer";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useCart } from "@/libs/context-api/context-api.hooks";

export const ContextApiDrawer = () => {
  const firstRender = useRef(true);

  const { increaseQuantity, decreaseQuantity, items } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const router = useRouter();

  useEffect(() => {
    const pathname = router.state.location.pathname;
    if (items.length && !firstRender.current && pathname.includes("product")) {
      setIsOpen(true);
    }

    firstRender.current = false;
  }, [JSON.stringify(items)]);

  if (!isOpen) return null;

  return (
    <Drawer
      products={items}
      onClose={() => setIsOpen(false)}
      onCheckout={() => navigate({ to: "/react-context-api/checkout" })}
      decreaseQuantity={decreaseQuantity}
      increaseQuantity={increaseQuantity}
    />
  );
};
