import { getTranslator, type Locale } from './i18n.ts';

export const whatsappUrl = 'https://wa.me/6285151994724';

export function whatsappHref(locale: Locale, serviceType = '') {
  const t = getTranslator(locale);
  const message = serviceType
    ? t('Hello TemuWeb, I would like to discuss {0}.', t(serviceType))
    : t('Hello TemuWeb, I would like to discuss my website requirements.');
  return `${whatsappUrl}?text=${encodeURIComponent(message)}`;
}
