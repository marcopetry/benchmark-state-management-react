import { ContextApi } from "../pages/context-api";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/context-api")({
  component: ContextApi,
});
