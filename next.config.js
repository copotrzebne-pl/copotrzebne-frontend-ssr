/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  styledComponents: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts)x?$/]
      },
      use: ['@svgr/webpack', 'url-loader'],
    });

    return config;
  },
  images: {
    domains: ['images.prismic.io'],
  },
}

module.exports = nextConfig
