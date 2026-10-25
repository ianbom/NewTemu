import type { Metadata } from 'next';
import { getTranslator, localeHref, type Locale } from './i18n';

export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const t = getTranslator(locale);
  return {
    title: { absolute: `${t(title)} | TemuWeb` },
    description: t(description),
    alternates: {
      canonical: localeHref(path, locale),
      languages: {
        'id-ID': localeHref(path, 'id'),
        'en-US': localeHref(path, 'en'),
        'x-default': localeHref(path, 'id'),
      },
    },
    openGraph: {
      title: `${t(title)} | TemuWeb`,
      description: t(description),
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      alternateLocale: locale === 'id' ? 'en_US' : 'id_ID',
      url: localeHref(path, locale),
      images: [{ url: '/images/social-cover.jpg', width: 1200, height: 630, alt: 'TemuWeb' }],
    },
  };
}
