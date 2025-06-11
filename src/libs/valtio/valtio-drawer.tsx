import { useEffect, useRef, useState } from "react";
import { Drawer } from "@/components/drawer";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useCart } from "./valtio.hooks";
import { CartItem } from "@/types/cart-item.types";

export const ValtioDrawer = () => {
  const firstRender = useRef(true);

  const { increaseQuantity, decreaseQuantity, items } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const router = useRouter();

  console.log({ items, l: items.length, firstRender });

  useEffect(() => {
    const pathname = router.state.location.pathname;
    if (items.length && !firstRender.current && pathname.includes("product")) {
      setIsOpen(true);
    }

    firstRender.current = false;
  }, [items]);

  if (!isOpen) return null;

  return (
    <Drawer
      products={items as CartItem[]}
      onClose={() => setIsOpen(false)}
      onCheckout={() => navigate({ to: "/zustand/checkout" })}
      decreaseQuantity={decreaseQuantity}
      increaseQuantity={increaseQuantity}
    />
  );
};
