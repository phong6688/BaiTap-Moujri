import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Áp dụng CORS cho tất cả các api route trong thư mục src/app/api/
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", "value": "true" },
          { key: "Access-Control-Allow-Origin", "value": "https://bai-tap-moujri-frontend.vercel.app" }, 
          { key: "Access-Control-Allow-Methods", "value": "GET,DELETE,PATCH,POST,PUT,OPTIONS" },
          { key: "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
};

export default nextConfig;