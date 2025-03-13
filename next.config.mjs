import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  disable: process.env.NODE_ENV !== "production",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  ...withPWA,
};

export default nextConfig;
