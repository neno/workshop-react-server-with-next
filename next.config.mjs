/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      },
    ],
  },
  redirects() {
    return [
      {
        source: '/',
        destination: '/movies',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
