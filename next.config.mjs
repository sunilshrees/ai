/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kechahiyo.com',
        pathname: '**',
      },
    ],
  },
}

export default nextConfig
