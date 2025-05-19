import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["cdn.shopify.com"], // Add the domain(s) of your image URLs
  },
};

export default nextConfig;
