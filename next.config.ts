import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/*": ["./data/seed.db"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "canaacontroladoria.com.br",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "canaacontroladoria.com.br",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;
