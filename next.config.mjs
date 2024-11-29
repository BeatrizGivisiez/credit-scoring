/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "credit-score-dev.up.railway.app",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "localhost:8080",
        port: "",
        pathname: "/swagger/**"
      },
      {
        protocol: "https",
        hostname: "pkf-dev.vercel.app",
        port: "",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
