// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { readFileSync } from "node:fs";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { Plugin } from "vite";

// GitHub Pages build: only active when GITHUB_PAGES=true (set by .github/workflows/deploy.yml).
// The Lovable preview and the Lovable published site keep using the default config below.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const GITHUB_PAGES_BASE = "/auto-valle-car-gallery/";
// Uploaded photos are served by the Lovable site; GitHub Pages loads them from there.
const LOVABLE_ASSET_HOST = "https://auto-valle-car-gallery.lovable.app";

function absoluteLovableAssets(): Plugin {
  return {
    name: "github-pages:absolute-lovable-assets",
    enforce: "pre",
    load(id) {
      const file = id.split("?")[0] ?? id;
      if (!file.endsWith(".asset.json")) return null;
      const asset = JSON.parse(readFileSync(file, "utf8")) as { url?: string };
      if (asset.url?.startsWith("/")) asset.url = LOVABLE_ASSET_HOST + asset.url;
      return JSON.stringify(asset);
    },
  };
}

// Every vehicle detail page is generated as its own HTML file for GitHub Pages.
const vehicleSlugs = [...readFileSync("src/lib/vehicles.ts", "utf8").matchAll(/slug:\s*["']([^"']+)["']/g)].map(
  (m) => m[1],
);

export default defineConfig(
  isGithubPages
    ? {
        nitro: false,
        plugins: [absoluteLovableAssets()],
        vite: { base: GITHUB_PAGES_BASE },
        tanstackStart: {
          server: { entry: "server" },
          pages: ["/", "/catalogo", ...vehicleSlugs.map((slug) => `/autos/${slug}`)].map((path) => ({ path })),
          prerender: { enabled: true, autoStaticPathsDiscovery: false, crawlLinks: false },
          // 404.html: a blank app shell so unknown or old links (e.g. replaced vehicles) still load and redirect.
          spa: { enabled: true, maskPath: "/404", prerender: { outputPath: "/404.html" } },
        },
      }
    : {
        tanstackStart: {
          // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
          // nitro/vite builds from this
          server: { entry: "server" },
        },
      },
);
