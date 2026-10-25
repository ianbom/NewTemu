import { indonesian } from './messages/id.ts';

export const locales = ['id', 'en'] as const;
export type Locale = (typeof locales)[number];
export type LocaleParams = { params: Promise<{ locale: string }> };

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export function stripLocale(path: string) {
  return path.replace(/^\/(id|en)(?=\/|[?#]|$)/, '') || '/';
}

export function localeHref(path: string, locale: Locale) {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  const suffix = stripLocale(path);
  return `/${locale}${suffix === '/' ? '' : suffix}`;
}

export function translate(
  locale: Locale,
  message: string | null | undefined,
  ...values: (string | number)[]
) {
  if (!message) return '';
  const trimmed = message.trim();
  const translation = Object.hasOwn(indonesian, trimmed) ? indonesian[trimmed] : undefined;
  const translated =
    locale === 'id' && translation !== undefined ? message.replace(trimmed, translation) : message;
  return translated.replace(/\{(\d+)\}/g, (placeholder, index) =>
    values[Number(index)] === undefined ? placeholder : String(values[Number(index)]),
  );
}

export function getTranslator(locale: Locale) {
  return (message: string | null | undefined, ...values: (string | number)[]) =>
    translate(locale, message, ...values);
}

export function localizedImage(source: string, locale: Locale) {
  return locale === 'id' &&
    source.startsWith('/images/projects/') &&
    !source.startsWith('/images/projects/id/')
    ? source.replace('/images/projects/', '/images/projects/id/')
    : source;
}
