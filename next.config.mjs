/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  compiler: {
    styledComponents: true,
  },
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
      {
        protocol: "http",
        hostname: "localhost",
        port: "8019",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
