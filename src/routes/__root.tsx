import { ContextApi } from "@/libs/context-api";
import {
  ContextApiPageCart,
  ContextApiPageCheckout,
  ContextApiPageProductDetails,
  ContextApiPageProducts,
} from "@/pages/context-api";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({ component: Outlet });

const contextRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "context-api",
  component: ContextApi,
});

const routeTree = rootRoute.addChildren([
  contextRoute.addChildren([
    createRoute({
      path: "products",
      component: ContextApiPageProducts,
      getParentRoute: () => contextRoute,
    }),
    createRoute({
      path: "products/$id",
      component: ContextApiPageProductDetails,
      getParentRoute: () => contextRoute,
    }),
    createRoute({
      path: "cart",
      component: ContextApiPageCart,
      getParentRoute: () => contextRoute,
    }),
    createRoute({
      path: "checkout",
      component: ContextApiPageCheckout,
      getParentRoute: () => contextRoute,
    }),
  ]),
]);

export const Route = createRouter({ routeTree });
