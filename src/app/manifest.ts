import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'LiniWeb - Jasa Pembuatan Website & Software House',
    short_name: 'LiniWeb',
    description:
      'Software house di Surabaya untuk pembuatan website company profile, toko online, dan aplikasi web bisnis.',
    start_url: '/id',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/liniweb.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
