/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/products',
        permanent: false
      },
    ]
  },
}

module.exports = nextConfig
