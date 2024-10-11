/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "credit-score-dev.up.railway.app",
        port: "",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
