import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Ad campaigns point at /start/ — keep the trailing slash canonical.
  trailingSlash: true,
  images: {
    qualities: [75, 90],
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
  },
  async redirects() {
    return [{ source: "/", destination: "/start/", permanent: false }];
  },
};

export default nextConfig;
