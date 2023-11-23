/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  webpack: (config, { isServer }) => {
    isServer && (config.externals = [...config.externals,  'socket.io-client']);
    return config;
  },

  }
