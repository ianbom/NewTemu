import { notFound } from 'next/navigation';
import { isLocale } from './i18n';

export async function getLocale(params: Promise<{ locale: string }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}
