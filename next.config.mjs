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
        hostname: "credit-score-dbgfaceagwhphsb2.canadacentral-01.azurewebsites.net",
        port: "",
        pathname: "/swagger/**"
      }
    ]
  }
};

export default nextConfig;
