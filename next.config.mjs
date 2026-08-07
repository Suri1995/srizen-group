/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow local images from public folder in production
    unoptimized: process.env.NODE_ENV === 'production' ? true : false,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "randomuser.me" },
    ],
    // Allow localhost for development
    domains: ['localhost', '127.0.0.1'],
  },
  // For static file serving in production
  // // output: 'standalone', // Commented out for Windows compatibility // Commented out for Windows compatibility with pnpm
  // Handle trailing slashes
  trailingSlash: false,
  // Webpack configuration
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  // Add headers for static files
  async headers() {
    return [
      {
        source: '/floorplans/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },
};

export default nextConfig;
