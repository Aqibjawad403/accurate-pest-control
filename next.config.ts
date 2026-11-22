import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  // Static HTML/CSS/JS export → `out/` after `next build` (shared hosting).
  output: "export",
  images: {
    unoptimized: true,
  },
  // send-mail.php lives in /public so `next build` includes it in the
  // deployable output (served from site root as /send-mail.php).
  turbopack: {
    rules: {
      "*.css": {
        condition: {
          not: {
            path: /(\.module\.css$|[\\/]components[\\/]pdf[\\/])/,
          },
        },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
