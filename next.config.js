/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'example.com', 
      'via.placeholder.com',
      'images.unsplash.com',
      'images.pexels.com',
      'source.unsplash.com',
      'cdn.pixabay.com'
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  },
}

module.exports = nextConfig
