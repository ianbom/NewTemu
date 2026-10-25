'use client';

import { localeHref, locales } from '@/lib/i18n';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useI18n } from './i18n-provider';

export function LanguageSwitcher({ onChange }: { onChange?: () => void }) {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <nav
      className="language-switcher"
      aria-label={t('Language')}
    >
      {locales.map((language) => (
        <Link
          key={language}
          href={localeHref(pathname, language)}
          hrefLang={language}
          lang={language}
          aria-current={language === locale ? 'true' : undefined}
          aria-label={t(language === 'id' ? 'Switch to Indonesian' : 'Switch to English')}
          onClick={(event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            router.push(
              localeHref(pathname + window.location.search + window.location.hash, language),
            );
            onChange?.();
          }}
        >
          {language.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}
