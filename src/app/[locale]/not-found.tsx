'use client';
import { useI18n } from '@/components/i18n-provider';
import Link from '@/components/localized-link';
export default function NotFound() {
  const { t } = useI18n();
  return (
    <section className="not-found container">
      <p className="eyebrow">{t('404 / A different direction')}</p>
      <h1>{t('This page is out of frame.')}</h1>
      <p>{t("Let's get you back to the work.")}</p>
      <Link
        className="button button-light"
        href="/portfolio"
      >
        {t('Explore Our Portfolio')}
      </Link>
    </section>
  );
}
