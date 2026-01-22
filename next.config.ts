import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        hostname: '**',
        protocol: 'https',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
