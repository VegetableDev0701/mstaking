/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URI: 'mongodb://localhost:27017',
    API_SERVER: 'http://168.100.11.33:1337'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs.io',
        port: '',
        pathname: '/ipfs/**/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/image**',
      },
    ],
  },
}

module.exports = nextConfig
