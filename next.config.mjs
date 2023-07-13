/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 30, // One Month
    domains: [
      "uploadthing.com",
      "lh3.googleusercontent.com",
      "source.unsplash.com",
    ],
  },
  experimental: {
    appDir: true,
    serverActions: true,
  },
};

export default nextConfig;
