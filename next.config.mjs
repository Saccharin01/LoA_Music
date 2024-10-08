/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lomusic2.s3.amazonaws.com', 'lomusic2.s3.ap-northeast-2.amazonaws.com'],
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  }
}

export default nextConfig;