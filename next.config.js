/** @type {import('next').NextConfig} */

const rewrites = () => {
  return [
    {
      source: '/api/:path*',
      destination: `${process.env.BACKEND}/v1/api/:path*`,
    },
    {
      source: '/images/:path*',
      destination: `${process.env.BACKEND}/:path*`,
    },
  ];
};

const nextConfig = {
  rewrites,
  images: {
    remotePatterns: [
      {
        protocol: process.env.NODE_ENV === 'production' ? 'https' : 'http',
        hostname: process.env.HOSTNAME,
        port: process.env.NODE_ENV === 'production' ? '' : '8000',
        pathname: '/img/**',
      },
      {
        hostname: process.env.HOSTNAME,
        port: '5001',
      },
    ],
    domains: ['images.pexels.com', 'cdn.pixabay.com', 'images.unsplash.com'],
  },
};

module.exports = nextConfig;
