/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      fallback: [
        {
          source: "/api/:path*",
          destination: `${process.env.BACK_END_SERVER}/api/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
