import { PortfolioGallery } from '@/components/interactive';
import { ContactCTA, Hero, SectionHeading } from '@/components/shared';
import { whatsappHref } from '@/lib/behavior';
import { Pricing } from '@/components/pricing';
import { editorial } from '@/lib/editorial';
import { getTranslator, localizedImage } from '@/lib/i18n';
import { getLocale } from '@/lib/locale-server';
import { pageMetadata } from '@/lib/metadata';
import { getBreadcrumbSchema, getFaqSchema } from '@/lib/structured-data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
const additional = {
  pricing: {
    title: 'Website Development Pricing',
    description:
      'Compare LiniWeb website, e-commerce, web application, UI/UX, and maintenance packages. Company profile websites start at Rp1.000.000, including first-year domain and basic hosting.',
  },
  portfolio: {
    title: 'Portfolio',
    description:
      'Browse our website and e-commerce portfolio. Select a project to visit its website.',
    image: '/images/portfolio-hero.jpg',
  },
};
export function generateStaticParams() {
  return [...Object.keys(editorial), ...Object.keys(additional)].map((page) => ({ page }));
}
export default async function ContentPage({
  params,
}: {
  params: Promise<{
    locale: string;
    page: string;
  }>;
}) {
  const { page } = await params;
  const locale = await getLocale(params);
  const t = getTranslator(locale);
  if (Object.hasOwn(editorial, page)) {
    const content = editorial[page as keyof typeof editorial];
    const breadcrumbSchema = getBreadcrumbSchema(locale, t(content.title), '/' + page);
    return (
      <div className={`editorial-page ${page}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <Hero
          title={t(content.title)}
          description={t(content.intro)}
          image={content.heroImage}
        />
        <section className="section editorial-intro">
          <div className="container split-grid">
            <div>
              <SectionHeading
                eyebrow={t(content.eyebrow)}
                title={t(content.heading)}
              />
              <div className="prose">
                {content.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{t(paragraph)}</p>
                ))}
              </div>
            </div>
            <div className="editorial-image">
              <Image
                src={localizedImage(content.image, locale)}
                alt={t('Design and engineering collaboration in a modern studio')}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </section>
        <section
          className={`section carbon bordered principles-section ${page === 'our-process' ? 'process-principles' : ''}`}
        >
          <div className="container">
            <SectionHeading
              center
              eyebrow={t(page === 'our-process' ? 'The Process' : 'Our Principles')}
              title={t(content.principleHeading)}
            />
            <div className="principles-grid">
              {content.principles.map(([title, description], index) => (
                <article key={title}>
                  <span className="principle-number">0{index + 1}</span>
                  <h3>{typeof title === 'string' ? t(title) : title}</h3>
                  <p>{t(description)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container split-grid reversed">
            <div className="landscape-image">
              <Image
                src={localizedImage(content.closingImage, locale)}
                alt={t('A considered creative workspace')}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <div>
              <SectionHeading
                eyebrow={t(content.closingEyebrow)}
                title={t(content.closingTitle)}
              />
              <p className="body-copy">{t(content.closingCopy)}</p>
              <a
                href={whatsappHref(locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-outline"
              >
                {t('Start a Conversation')}
              </a>
            </div>
          </div>
        </section>
        <ContactCTA />
      </div>
    );
  }
  if (page === 'pricing') {
    const faqSchema = getFaqSchema(locale);
    const breadcrumbSchema = getBreadcrumbSchema(locale, t(additional.pricing.title), '/pricing');
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <Pricing locale={locale} />
      </>
    );
  }
  if (page !== 'portfolio') notFound();
  const content = additional.portfolio;
  const breadcrumbSchema = getBreadcrumbSchema(locale, t(content.title), '/portfolio');
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Hero
        title={t(content.title)}
        description={t(content.description)}
        image={content.image}
      />
      <PortfolioGallery />
      <ContactCTA />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; page: string }>;
}) {
  const { page } = await params;
  const locale = await getLocale(params);
  if (Object.hasOwn(editorial, page)) {
    const content = editorial[page as keyof typeof editorial];
    return pageMetadata(locale, '/' + page, content.title, content.intro);
  }
  if (!Object.hasOwn(additional, page)) notFound();
  const content = additional[page as keyof typeof additional];
  return pageMetadata(locale, '/' + page, content.title, content.description);
}
