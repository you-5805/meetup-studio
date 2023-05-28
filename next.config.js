const withInterceptStdout = require('next-intercept-stdout');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  pageExtensions: ['page.tsx', 'api.ts'],
  swcMinify: true,
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    appDir: false,
  },
};

module.exports = withInterceptStdout(nextConfig, (text) => (text.includes('Duplicate atom key') ? '' : text));
