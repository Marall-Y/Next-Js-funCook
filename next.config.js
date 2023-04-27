/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.clerk.dev',
        port: '',
        pathname: '/oauth_google/**',
      },
    ],
  },
}

module.exports = nextConfig
