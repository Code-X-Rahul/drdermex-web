import type { NextConfig } from "next";

import createMDX from "@next/mdx";

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  // basePath: "/drdermex-web",

  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: { unoptimized: true },
};

export default withMDX(nextConfig);
