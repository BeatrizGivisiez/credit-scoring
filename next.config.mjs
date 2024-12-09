/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "credit-score-dbgfaceagwhphsb2.canadacentral-01.azurewebsites.net",
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
