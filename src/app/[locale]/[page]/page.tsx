import { PortfolioGallery } from '@/components/interactive';
import { ContactCTA, Hero, SectionHeading } from '@/components/shared';
import { whatsappHref } from '@/lib/behavior';
import { services } from '@/lib/data';
import { editorial } from '@/lib/editorial';
import { getTranslator, localizedImage } from '@/lib/i18n';
import { getLocale } from '@/lib/locale-server';
import { pageMetadata } from '@/lib/metadata';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
const additional = {
  services: {
    title: 'Our Services',
    description:
      'Design, development, and thoughtful digital solutions. Built around what your business needs.',
    image: '/images/services-hero.jpg',
  },
  portfolio: {
    title: 'Portfolio',
    description:
      'An ongoing exploration of interfaces, digital products, and different ways of seeing.',
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
    return (
      <div className={`editorial-page ${page}`}>
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
  const content = additional[page as keyof typeof additional];
  if (!content) notFound();
  return (
    <>
      <Hero
        title={t(content.title)}
        description={t(content.description)}
        image={content.image}
      />
      {page === 'portfolio' && <PortfolioGallery />}
      {page === 'services' && (
        <>
          <section className="section">
            <div className="container">
              <SectionHeading
                center
                eyebrow={t('Made for your next chapter')}
                title={t('Considered Solutions. Clear Intentions.')}
              >
                {t(
                  'From a focused company website to a connected business platform, we shape the work around your goals.',
                )}
              </SectionHeading>
              <div className="services-grid">
                {services.map((service, index) => (
                  <article
                    className="service-card"
                    key={service.title}
                  >
                    <a
                      href={whatsappHref(locale, service.type)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="service-card-image"
                    >
                      <Image
                        src={localizedImage(service.image, locale)}
                        alt={t('{0} interface concept', t(service.title))}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                      <span className="service-index">0{index + 1}</span>
                    </a>
                    <p className="eyebrow">{t(service.category)}</p>
                    <h2>{t(service.title)}</h2>
                    <p>{t(service.description)}</p>
                    <div className="service-details">{t(service.details)}</div>
                    <a
                      href={whatsappHref(locale, service.type)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                    >
                      {t('Discuss Your Project')}
                      <ArrowUpRight size={15} />
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>
          <section className="section carbon bordered service-custom">
            <div className="container split-grid">
              <h2>{t('Something More Specific in Mind?')}</h2>
              <div>
                <p className="body-copy">
                  {t(
                    "API integrations, business process automation, or a custom digital workflow. Tell us what you need to make possible, and we'll explore the right approach together.",
                  )}
                </p>
                <a
                  className="button button-outline"
                  href={whatsappHref(locale, 'Custom Software')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("Let's Discuss It")}
                </a>
              </div>
            </div>
          </section>
        </>
      )}
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
