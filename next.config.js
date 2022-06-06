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
  i18n: {
    locales: ['en', 'pl', 'ua'],
    defaultLocale: 'pl',

    domains: [
      {
        domain: 'copotrzebne.pl',
        defaultLocale: 'pl',
      },
      {
        domain: 'whatisneeded.pl',
        defaultLocale: 'en',
      },
      {
        domain: 'shchopotribno.pl',
        defaultLocale: 'ua',
      },
    ],
  },
}

module.exports = nextConfig
