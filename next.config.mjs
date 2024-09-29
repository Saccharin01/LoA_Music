/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lomusic2.s3.amazonaws.com', 'lomusic2.s3.ap-northeast-2.amazonaws.com'], // 허용할 도메인 추가
  }
}

export default nextConfig;
