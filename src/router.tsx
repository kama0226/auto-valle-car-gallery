import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // GitHub Pages serves each page as folder/index.html, so its URLs end in "/".
    trailingSlash: import.meta.env.BASE_URL === "/" ? "never" : "always",
  });

  return router;
};
