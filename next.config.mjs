/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
      {
        protocol: "https",
        hostname: "saccharinportfolio.s3.ap-northeast-2.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
  },
};

export default nextConfig;
