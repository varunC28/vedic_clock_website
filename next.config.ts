import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/clock',
        destination: '/',
        permanent: true,
      },
      {
        source: '/panchang',
        destination: '/guide',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
