/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.dns = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.tls = false;
    }

    config.module.rules.push({
      test: /\.tsx?/,
      // Transpile rari-components
      include: [/rari-components/],
      use: "next-swc-loader",
    });

    return config;
  },
};

module.exports = nextConfig;
