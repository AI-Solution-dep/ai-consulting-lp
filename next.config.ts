import type { NextConfig } from "next";

// GitHub Pages への静的書き出し（BUILD_STATIC=true のときのみ有効）
const isStatic = process.env.BUILD_STATIC === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = isStatic
  ? {
      output: "export",
      images: { unoptimized: true },
      basePath: basePath || undefined,
      assetPrefix: basePath || undefined,
      trailingSlash: true,
    }
  : {};

export default nextConfig;
