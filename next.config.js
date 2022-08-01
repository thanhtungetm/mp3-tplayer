/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['photo-resize-zmp3.zmdcdn.me'],
  },
}

module.exports = nextConfig
