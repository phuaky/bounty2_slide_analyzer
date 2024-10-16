// next.config.js
const nextConfig = {
  async rewrites() {
    return [
      // Proxy all API requests except those under /api/auth/
      {
        source: '/api/:path((?!auth/).*)', // Exclude paths starting with 'auth/'
        destination: 'http://localhost:8000/api/:path*',
      },
    ];
  },
  images: {
    domains: ['localhost', '127.0.0.1'],
  },
};

module.exports = nextConfig;
