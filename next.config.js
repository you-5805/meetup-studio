/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  swcMinify: true,
  output: 'standalone',
  images: {
    domains: ['pbs.twimg.com'],
  },
  experimental: {
    appDir: true,
  },
};
