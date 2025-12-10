import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  serverExternalPackages: ['ytdlp-nodejs'],
  images: {
    domains: ["i.ytimg.com"],
  },
};

export default nextConfig;

