/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'otmhkfujxehpaywcdtxa.supabase.co'
      },
      {
        protocol: 'https',
        hostname: 'images.clerk.dev'
      }
    ],
  },
}

module.exports = nextConfig
