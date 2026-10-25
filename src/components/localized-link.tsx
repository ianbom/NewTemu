'use client';

import { localeHref } from '@/lib/i18n';
import Link from 'next/link';
import { useI18n } from './i18n-provider';

export default function LocalizedLink({ href, ...props }: React.ComponentProps<typeof Link>) {
  const { locale } = useI18n();
  const localized =
    typeof href === 'string'
      ? localeHref(href, locale)
      : { ...href, pathname: href.pathname ? localeHref(href.pathname, locale) : href.pathname };
  return (
    <Link
      href={localized}
      {...props}
    />
  );
}
