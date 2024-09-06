/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "t0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "ichef.bbci.co.uk",
      },
      {
        protocol: "https",
        hostname: "bizweb.dktcdn.net",
      },
      {
        protocol: "https",
        hostname: "product.hstatic.net",
      },
      {
        protocol: "https",
        hostname: "product.hstatic.net",
      },
    ],
  },
};

export default nextConfig;
