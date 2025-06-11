import { ContextApi } from "@/libs/context-api";
import { Zustand } from "@/libs/zustand";
import { Jotai } from "@/libs/jotai";

import {
  ContextApiPageCart,
  ContextApiPageCheckout,
  ContextApiPageProductDetails,
  ContextApiPageProducts,
} from "@/pages/context-api";

import {
  ZustandPageProducts,
  ZustandPageProductDetails,
  ZustandPageCart,
  ZustandPageCheckout,
} from "@/pages/zustand";

import {
  JotaiPageProducts,
  JotaiPageProductDetails,
  JotaiPageCart,
  JotaiPageCheckout,
} from "@/pages/jotai";

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

const zustandRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "zustand",
  component: Zustand,
});

const jotaiRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "jotai",
  component: Jotai,
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
  zustandRoute.addChildren([
    createRoute({
      path: "products",
      component: ZustandPageProducts,
      getParentRoute: () => zustandRoute,
    }),
    createRoute({
      path: "products/$id",
      component: ZustandPageProductDetails,
      getParentRoute: () => zustandRoute,
    }),
    createRoute({
      path: "cart",
      component: ZustandPageCart,
      getParentRoute: () => zustandRoute,
    }),
    createRoute({
      path: "checkout",
      component: ZustandPageCheckout,
      getParentRoute: () => zustandRoute,
    }),
  ]),
  jotaiRoute.addChildren([
    createRoute({
      path: "products",
      component: JotaiPageProducts,
      getParentRoute: () => jotaiRoute,
    }),
    createRoute({
      path: "products/$id",
      component: JotaiPageProductDetails,
      getParentRoute: () => jotaiRoute,
    }),
    createRoute({
      path: "cart",
      component: JotaiPageCart,
      getParentRoute: () => jotaiRoute,
    }),
    createRoute({
      path: "checkout",
      component: JotaiPageCheckout,
      getParentRoute: () => jotaiRoute,
    }),
  ]),
]);

export const Route = createRouter({ routeTree });
