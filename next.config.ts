import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 👈 ЭТО ГЛАВНОЕ
  images: {
    unoptimized: true, // 👈 обязательно для static
    remotePatterns: [
      { protocol: "https", hostname: "nikifilini.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
    ],
  },
};

export default nextConfig;