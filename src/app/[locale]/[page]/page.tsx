import { ShowcaseGallery } from '@/components/interactive';
import Link from '@/components/localized-link';
import { ContactCTA, Hero, SectionHeading } from '@/components/shared';
import { services } from '@/lib/data';
import { editorial } from '@/lib/editorial';
import { getTranslator, localizedImage, type Locale } from '@/lib/i18n';
import { getLocale } from '@/lib/locale-server';
import { pageMetadata } from '@/lib/metadata';
import { ArrowUpRight, BookOpen, Code2, Mail, UsersRound } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
const additional = {
  services: {
    title: 'Our Services',
    description:
      'Design, development, and thoughtful digital solutions. Built around what your business needs.',
    image: '/images/engineering.jpg',
  },
  showcase: {
    title: 'Digital Showcase',
    description:
      'An ongoing exploration of interfaces, digital products, and different ways of seeing.',
    image: '/images/projects/forma.svg',
  },
  careers: {
    title: 'Careers',
    description: 'Good work happens when curious minds and considered perspectives come together.',
    image: '/images/collaboration.jpg',
  },
};
function CareersContent({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
  const values = [
    {
      title: 'Collaborative Problem-Solving',
      description:
        'Different perspectives make the work stronger. We make room for ideas, clear feedback, and constructive discussion.',
      icon: UsersRound,
    },
    {
      title: 'Design & Engineering, Together',
      description:
        'We value the relationship between a considered interface and the thoughtful systems that support it.',
      icon: Code2,
    },
    {
      title: 'A Learning Mindset',
      description:
        'Good questions, practical experimentation, and honest reflection help us improve the way we work.',
      icon: BookOpen,
    },
  ];
  return (
    <>
      <section className="section careers-culture">
        <div className="container">
          <SectionHeading
            center
            eyebrow={t('People & Perspectives')}
            title={t('A Culture of Curiosity & Care.')}
          >
            {t(
              'We value people who ask thoughtful questions, enjoy working through difficult problems, and care about the details that make digital products better.',
            )}
          </SectionHeading>
          <div className="careers-values">
            {values.map((value) => (
              <article key={value.title}>
                <span className="culture-icon">
                  <value.icon size={20} />
                </span>
                <h3>{t(value.title)}</h3>
                <p>{t(value.description)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section carbon bordered careers-connect">
        <div className="container career-inquiry">
          <span className="inquiry-icon">
            <Mail size={24} />
          </span>
          <SectionHeading
            eyebrow={t('Introductions & Collaboration')}
            title={t('Connect With Our Studio.')}
          >
            {t(
              'If our way of thinking resonates with you, introduce yourself. Share your perspective, your work, and what you would like to explore together.',
            )}
          </SectionHeading>
          <a
            href={`mailto:mail@agency.site?subject=${encodeURIComponent(t('Studio Introduction'))}`}
            className="button button-accent"
          >
            {t('Connect With Our Studio')}
            <ArrowUpRight size={16} />
          </a>
          <p>
            {t(
              'General introductions and collaboration inquiries are welcome. This is not a listing for a specific role.',
            )}
          </p>
        </div>
      </section>
    </>
  );
}
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
              <Link
                href="/contact"
                className="button button-outline"
              >
                {t('Start a Conversation')}
              </Link>
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
      {page === 'showcase' && <ShowcaseGallery />}
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
                    <Link
                      href={`/contact?type=${encodeURIComponent(service.type)}`}
                      className="service-card-image"
                    >
                      <Image
                        src={localizedImage(service.image, locale)}
                        alt={t('{0} interface concept', t(service.title))}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                      <span className="service-index">0{index + 1}</span>
                    </Link>
                    <p className="eyebrow">{t(service.category)}</p>
                    <h2>{t(service.title)}</h2>
                    <p>{t(service.description)}</p>
                    <div className="service-details">{t(service.details)}</div>
                    <Link
                      href={`/contact?type=${encodeURIComponent(service.type)}`}
                      className="text-link"
                    >
                      {t('Discuss Your Project')}
                      <ArrowUpRight size={15} />
                    </Link>
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
                <Link
                  className="button button-outline"
                  href="/contact?type=Custom%20Software"
                >
                  {t("Let's Discuss It")}
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
      {page === 'careers' && <CareersContent locale={locale} />}
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
