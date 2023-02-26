/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
    serverComponentsExternalPackages: ["prisma", "@prisma/client"],
  },
};

module.exports = nextConfig;
