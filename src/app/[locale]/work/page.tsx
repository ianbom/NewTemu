import { Portfolio } from '@/components/interactive';
import { ContactCTA, Hero } from '@/components/shared';
import { getTranslator, type LocaleParams } from '@/lib/i18n';
import { getLocale } from '@/lib/locale-server';
import { pageMetadata } from '@/lib/metadata';
export default async function WorkPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const t = getTranslator(locale);
  return (
    <>
      <Hero
        title={t('Selected Work')}
        description={t(
          'Different ideas. Thoughtfully brought to life. Explore our original studio concepts in design and technology.',
        )}
        image="/images/projects/auren.svg"
      />
      <Portfolio />
      <ContactCTA />
    </>
  );
}

export async function generateMetadata({ params }: LocaleParams) {
  const locale = await getLocale(params);
  return pageMetadata(
    locale,
    '/work',
    'Selected Work',
    'Original KIVORA STUDIO concepts in websites, web applications, e-commerce, and UI/UX design.',
  );
}
