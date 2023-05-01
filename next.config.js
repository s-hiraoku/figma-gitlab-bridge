// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolve } = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": resolve(__dirname, "src/components"),
      "@pages": resolve(__dirname, "src/pages"),
      "@features": resolve(__dirname, "src/features"),
      "@utils": resolve(__dirname, "src/utils"),
      "@types": resolve(__dirname, "src/types"),
      "@hooks": resolve(__dirname, "src/hooks"),
      "@styles": resolve(__dirname, "src/styles"),
      "@assets": resolve(__dirname, "src/assets"),
      "@stores": resolve(__dirname, "src/stores"),
    };
    return config;
  },
};

module.exports = nextConfig;
