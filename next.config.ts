import type { NextConfig } from "next";
import { LEGACY_REDIRECTS } from "./src/lib/routes";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "www.gomberamd.com", pathname: "/wp-content/uploads/**" },
    ],
  },
  async redirects() {
    return [
      ...LEGACY_REDIRECTS.map((r) => ({ ...r, permanent: true })),
      // www to apex
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "www.fixmyhips.com" }],
        destination: "https://fixmyhips.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
