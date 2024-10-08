/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lomusic2.s3.amazonaws.com', 'lomusic2.s3.ap-northeast-2.amazonaws.com'], // 허용할 도메인 추가
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://saccharin01.com/',
  },
}

export default nextConfig;
