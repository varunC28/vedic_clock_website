import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/clock',
        destination: 'https://thevedicghadi.in/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
