import { ContextApi } from "@/libs/context-api";
import {
  ContextApiPageCart,
  ContextApiPageCheckout,
  ContextApiPageProductDetails,
  ContextApiPageProducts,
} from "@/pages/context-api";
import { HomePage } from "@/pages/home/home-page";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({ component: Outlet });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const contextRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "react-context-api",
  component: ContextApi,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
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
