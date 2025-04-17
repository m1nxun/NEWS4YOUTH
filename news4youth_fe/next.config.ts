import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,

  // 커스텀 설정 추가
  publicRuntimeConfig: {
    allowedDevOrigins: ['http://*.local-origin.dev', 'http://172.16.1.225:4000:3000'],
  },
}


export default nextConfig;
