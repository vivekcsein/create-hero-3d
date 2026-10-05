import type { NextConfig } from "next";

/**
 * Static export (GitHub Pages) is opt-in, so normal dev/build keep working:
 *   NEXT_OUTPUT=export  -> `output: "export"` (writes ./out)
 *   NEXT_PUBLIC_BASE_PATH=/repo-name  -> sub-path hosting (project pages)
 */
const isExport = process.env.NEXT_OUTPUT === "export";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: false,
  },

  ...(isExport && {
    output: "export",
    trailingSlash: true,
    basePath,
    // no image optimizer on static hosting; the loader only adds basePath
    images: {
      loader: "custom",
      loaderFile: "./src/packages/utils/image-loader.ts",
    },
  }),
};

export default nextConfig;
