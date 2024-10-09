/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns: [
    //   "lomusic2.s3.amazonaws.com",
    //   "lomusic2.s3.ap-northeast-2.amazonaws.com",
    // ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lomusic2.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lomusic2.s3.ap-northeast-2.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
};

export default nextConfig;
