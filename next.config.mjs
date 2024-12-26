/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost:8080",
        port: "",
        pathname: "/swagger/**"
      },
      {
        protocol: "https",
        hostname: "pkf-dev.vercel.app",
        port: "",
        pathname: "/**"
      },
      // Adiciona os domínios do Power BI
      {
        protocol: "https",
        hostname: "app.powerbi.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "api.powerbi.com",
        port: "",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
