import { ContextApiPages } from "@/libs/react-context-api";
import { ZustandPages } from "@/libs/zustand";
import { JotaiPages } from "@/libs/jotai";
import { RecoilPages } from "@/libs/recoil";
import { ValtioPages } from "@/libs/valtio";
import { EffectorPages } from "@/libs/effector";
import { ReduxToolkitPages } from "@/libs/redux-toolkit";
import { RematchPages } from "@/libs/rematch";
import { HookStatePages } from "@/libs/hook-state";
import { UseContextSelectorPages } from "@/libs/use-context-selector";
import { ConstatePages } from "@/libs/constate";
import { HomePage } from "@/pages/home/home-page";

import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import { PageInsightsLighthouse } from "@/pages/page-insights-lighthouse";
import { PageInsightsPlaywright } from "@/pages/page-insights-playwright/page-insights-playwright";

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

const {
  Effector,
  EffectorPageCart,
  EffectorPageCheckout,
  EffectorPageProductDetails,
  EffectorPageProducts,
} = EffectorPages;

const {
  ReduxToolkit,
  ReduxToolkitPageCart,
  ReduxToolkitPageCheckout,
  ReduxToolkitPageProductDetails,
  ReduxToolkitPageProducts,
} = ReduxToolkitPages;

const {
  Rematch,
  RematchPageCart,
  RematchPageCheckout,
  RematchPageProductDetails,
  RematchPageProducts,
} = RematchPages;

const {
  HookState,
  HookStatePageCart,
  HookStatePageCheckout,
  HookStatePageProductDetails,
  HookStatePageProducts,
} = HookStatePages;

const {
  UseContextSelector,
  UseContextSelectorPageCart,
  UseContextSelectorPageCheckout,
  UseContextSelectorPageProductDetails,
  UseContextSelectorPageProducts,
} = UseContextSelectorPages;

const {
  Constate,
  ConstatePageCart,
  ConstatePageCheckout,
  ConstatePageProductDetails,
  ConstatePageProducts,
} = ConstatePages;

// Definição da árvore de rotas
const rootRoute = createRootRoute({ component: Outlet });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const insightsLighthouseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/insights-lighthouse",
  component: PageInsightsLighthouse,
});

const insightsPlaywrightRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/insights-playwright",
  component: PageInsightsPlaywright,
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

const effectorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "effector",
  component: Effector,
});

const reduxToolkitRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "redux-toolkit",
  component: ReduxToolkit,
});

const rematchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "rematch",
  component: Rematch,
});

const hookStateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "hookstate",
  component: HookState,
});

const useContextSelectorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "use-context-selector",
  component: UseContextSelector,
});

const constateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "constate",
  component: Constate,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  insightsLighthouseRoute,
  insightsPlaywrightRoute,
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
  effectorRoute.addChildren([
    createRoute({
      path: "products",
      component: EffectorPageProducts,
      getParentRoute: () => effectorRoute,
    }),
    createRoute({
      path: "products/$id",
      component: EffectorPageProductDetails,
      getParentRoute: () => effectorRoute,
    }),
    createRoute({
      path: "cart",
      component: EffectorPageCart,
      getParentRoute: () => effectorRoute,
    }),
    createRoute({
      path: "checkout",
      component: EffectorPageCheckout,
      getParentRoute: () => effectorRoute,
    }),
  ]),
  reduxToolkitRoute.addChildren([
    createRoute({
      path: "products",
      component: ReduxToolkitPageProducts,
      getParentRoute: () => reduxToolkitRoute,
    }),
    createRoute({
      path: "products/$id",
      component: ReduxToolkitPageProductDetails,
      getParentRoute: () => reduxToolkitRoute,
    }),
    createRoute({
      path: "cart",
      component: ReduxToolkitPageCart,
      getParentRoute: () => reduxToolkitRoute,
    }),
    createRoute({
      path: "checkout",
      component: ReduxToolkitPageCheckout,
      getParentRoute: () => reduxToolkitRoute,
    }),
  ]),
  rematchRoute.addChildren([
    createRoute({
      path: "products",
      component: RematchPageProducts,
      getParentRoute: () => rematchRoute,
    }),
    createRoute({
      path: "products/$id",
      component: RematchPageProductDetails,
      getParentRoute: () => rematchRoute,
    }),
    createRoute({
      path: "cart",
      component: RematchPageCart,
      getParentRoute: () => rematchRoute,
    }),
    createRoute({
      path: "checkout",
      component: RematchPageCheckout,
      getParentRoute: () => rematchRoute,
    }),
  ]),
  hookStateRoute.addChildren([
    createRoute({
      path: "products",
      component: HookStatePageProducts,
      getParentRoute: () => hookStateRoute,
    }),
    createRoute({
      path: "products/$id",
      component: HookStatePageProductDetails,
      getParentRoute: () => hookStateRoute,
    }),
    createRoute({
      path: "cart",
      component: HookStatePageCart,
      getParentRoute: () => hookStateRoute,
    }),
    createRoute({
      path: "checkout",
      component: HookStatePageCheckout,
      getParentRoute: () => hookStateRoute,
    }),
  ]),
  useContextSelectorRoute.addChildren([
    createRoute({
      path: "products",
      component: UseContextSelectorPageProducts,
      getParentRoute: () => useContextSelectorRoute,
    }),
    createRoute({
      path: "products/$id",
      component: UseContextSelectorPageProductDetails,
      getParentRoute: () => useContextSelectorRoute,
    }),
    createRoute({
      path: "cart",
      component: UseContextSelectorPageCart,
      getParentRoute: () => useContextSelectorRoute,
    }),
    createRoute({
      path: "checkout",
      component: UseContextSelectorPageCheckout,
      getParentRoute: () => useContextSelectorRoute,
    }),
  ]),
  constateRoute.addChildren([
    createRoute({
      path: "products",
      component: ConstatePageProducts,
      getParentRoute: () => constateRoute,
    }),
    createRoute({
      path: "products/$id",
      component: ConstatePageProductDetails,
      getParentRoute: () => constateRoute,
    }),
    createRoute({
      path: "cart",
      component: ConstatePageCart,
      getParentRoute: () => constateRoute,
    }),
    createRoute({
      path: "checkout",
      component: ConstatePageCheckout,
      getParentRoute: () => constateRoute,
    }),
  ]),
]);

export const Route = createRouter({ routeTree });
