/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*', // Proxy to Backend
      },
    ];
  },
  images: {
    domains: ['localhost', '127.0.0.1'],
  },
};

module.exports = nextConfig;
