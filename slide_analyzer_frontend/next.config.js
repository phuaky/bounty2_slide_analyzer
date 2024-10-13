/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false, // Disable minification
  images: {
    domains: [
      "1418d83d-5628-4e22-aa05-9e0a1e652aa6-00-1vrvyf7rhyugz.worf.replit.dev",
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
