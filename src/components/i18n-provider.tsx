'use client';

import { getTranslator, type Locale } from '@/lib/i18n';
import { createContext, useContext } from 'react';

const LocaleContext = createContext<Locale>('id');

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useI18n() {
  const locale = useContext(LocaleContext);
  return { locale, t: getTranslator(locale) };
}
