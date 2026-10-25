import type { NextConfig } from 'next';
import { whatsappUrl } from './src/lib/behavior.ts';
const config: NextConfig = {
  devIndicators: false,
  experimental: { globalNotFound: true },
  async redirects() {
    return [
      { source: '/', destination: '/id', permanent: true },
      ...[
        'about-us',
        'our-process',
        'services',
        'portfolio',
        'our-approach',
      ].map((page) => ({
        source: `/${page}`,
        destination: `/id/${page}`,
        permanent: true,
      })),
      ...['/contact', '/id/contact', '/en/contact'].map((source) => ({
        source,
        destination: whatsappUrl,
        permanent: true,
      })),
      { source: '/showcase', destination: '/id/portfolio', permanent: true },
      { source: '/id/showcase', destination: '/id/portfolio', permanent: true },
      { source: '/en/showcase', destination: '/en/portfolio', permanent: true },
    ];
  },
};
export default config;
