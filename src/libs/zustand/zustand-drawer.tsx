import { useEffect, useRef, useState } from "react";
import { Drawer } from "@/components/drawer";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useCart } from "./zustand.hooks";

export const ZustandDrawer = () => {
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
      onCheckout={() => navigate({ to: "/zustand/checkout" })}
      decreaseQuantity={decreaseQuantity}
      increaseQuantity={increaseQuantity}
    />
  );
};
