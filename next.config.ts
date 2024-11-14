import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // ignore typescript errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // cloudinary domain
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      
       {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
    ],
  },

};

export default nextConfig;
