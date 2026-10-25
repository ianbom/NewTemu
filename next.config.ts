import type { NextConfig } from 'next';
const config: NextConfig = {
  devIndicators: false,
  experimental: { globalNotFound: true },
  async redirects() {
    return [
      { source: '/', destination: '/id', permanent: true },
      ...[
        'about-us',
        'our-process',
        'work',
        'services',
        'showcase',
        'our-approach',
        'careers',
        'contact',
      ].map((page) => ({
        source: `/${page}`,
        destination: `/id/${page}`,
        permanent: true,
      })),
      { source: '/work/:path+', destination: '/id/work/:path+', permanent: true },
    ];
  },
};
export default config;
