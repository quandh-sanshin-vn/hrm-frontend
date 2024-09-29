/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.1.171",
        port: "8000",
      },
    ],
  },
};

export default nextConfig;
