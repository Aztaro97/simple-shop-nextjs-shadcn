/** @type {import('next').NextConfig} */

const hostname = ['fakestoreapi.com'];

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: hostname.map((domain) => ({
      protocol: "https",
      hostname: domain,
    })),
  },
};

module.exports = nextConfig;
