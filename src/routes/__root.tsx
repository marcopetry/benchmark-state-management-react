import { ContextApiPages } from "@/libs/context-api";
import { ZustandPages } from "@/libs/zustand";
import { JotaiPages } from "@/libs/jotai";
import { RecoilPages } from "@/libs/recoil";
import { ValtioPages } from "@/libs/valtio";
import { HomePage } from "@/pages/home/home-page";

import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";

// Desestruturação das páginas de cada state manager
const {
  ReactContextApi,
  ReactContextApiPageCart,
  ReactContextApiPageCheckout,
  ReactContextApiPageProductDetails,
  ReactContextApiPageProducts,
} = ContextApiPages;

const {
  Zustand,
  ZustandPageCart,
  ZustandPageCheckout,
  ZustandPageProductDetails,
  ZustandPageProducts,
} = ZustandPages;

const {
  Jotai,
  JotaiPageCart,
  JotaiPageCheckout,
  JotaiPageProductDetails,
  JotaiPageProducts,
} = JotaiPages;

const {
  Valtio,
  ValtioPageProducts,
  ValtioPageProductDetails,
  ValtioPageCart,
  ValtioPageCheckout,
} = ValtioPages;

const {
  Recoil,
  RecoilPageCart,
  RecoilPageCheckout,
  RecoilPageProductDetails,
  RecoilPageProducts,
} = RecoilPages;

// Definição da árvore de rotas
const rootRoute = createRootRoute({ component: Outlet });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const contextRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "react-context-api",
  component: ReactContextApi,
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

const valtioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "valtio",
  component: Valtio,
});

const recoilRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "recoil",
  component: Recoil,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  contextRoute.addChildren([
    createRoute({
      path: "products",
      component: ReactContextApiPageProducts,
      getParentRoute: () => contextRoute,
    }),
    createRoute({
      path: "products/$id",
      component: ReactContextApiPageProductDetails,
      getParentRoute: () => contextRoute,
    }),
    createRoute({
      path: "cart",
      component: ReactContextApiPageCart,
      getParentRoute: () => contextRoute,
    }),
    createRoute({
      path: "checkout",
      component: ReactContextApiPageCheckout,
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
  valtioRoute.addChildren([
    createRoute({
      path: "products",
      component: ValtioPageProducts,
      getParentRoute: () => valtioRoute,
    }),
    createRoute({
      path: "products/$id",
      component: ValtioPageProductDetails,
      getParentRoute: () => valtioRoute,
    }),
    createRoute({
      path: "cart",
      component: ValtioPageCart,
      getParentRoute: () => valtioRoute,
    }),
    createRoute({
      path: "checkout",
      component: ValtioPageCheckout,
      getParentRoute: () => valtioRoute,
    }),
  ]),
  recoilRoute.addChildren([
    createRoute({
      path: "products",
      component: RecoilPageProducts,
      getParentRoute: () => recoilRoute,
    }),
    createRoute({
      path: "products/$id",
      component: RecoilPageProductDetails,
      getParentRoute: () => recoilRoute,
    }),
    createRoute({
      path: "cart",
      component: RecoilPageCart,
      getParentRoute: () => recoilRoute,
    }),
    createRoute({
      path: "checkout",
      component: RecoilPageCheckout,
      getParentRoute: () => recoilRoute,
    }),
  ]),
]);

export const Route = createRouter({ routeTree });
