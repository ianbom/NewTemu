import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.liniweb.site';
  const pages = ['', 'about-us', 'pricing', 'our-process', 'portfolio', 'our-approach'];

  return pages.flatMap((page) => {
    const slug = page ? `/${page}` : '';
    const idUrl = `${baseUrl}/id${slug}`;
    const enUrl = `${baseUrl}/en${slug}`;

    return [
      {
        url: idUrl,
        lastModified: new Date(),
        changeFrequency: page === '' || page === 'pricing' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : page === 'pricing' ? 0.9 : 0.8,
        alternates: {
          languages: {
            id: idUrl,
            en: enUrl,
            'x-default': idUrl,
          },
        },
      },
      {
        url: enUrl,
        lastModified: new Date(),
        changeFrequency: page === '' || page === 'pricing' ? 'weekly' : 'monthly',
        priority: page === '' ? 0.9 : page === 'pricing' ? 0.8 : 0.7,
        alternates: {
          languages: {
            id: idUrl,
            en: enUrl,
            'x-default': idUrl,
          },
        },
      },
    ];
  });
}
