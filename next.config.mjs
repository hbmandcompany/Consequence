/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/cc", destination: "/shop", permanent: true },
      { source: "/software", destination: "/treasury", permanent: true },
      { source: "/how-the-rails-connect", destination: "/session-protocol", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
  },
};

export default nextConfig;
