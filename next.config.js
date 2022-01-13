module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};
