import { createLazyFileRoute } from "@tanstack/react-router";
import { ProductList } from "@/pages";

export const Route = createLazyFileRoute("/")({
  component: ProductList,
});
