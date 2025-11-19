import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    // domains:["picsum.photos", "google.com", "img.lovepik.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
      },
      {
        protocol: "https",
        hostname: "google.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "img.lovepik.com",
        port: "",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NEXT_BACKEND_HIDDEN_URL + "/:path*",
      },
    ];
  },
};

export default nextConfig;
