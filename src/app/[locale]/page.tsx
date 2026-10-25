import { FeaturedProjects, IndustryExplorer } from '@/components/interactive';
import Link from '@/components/localized-link';
import { ContactCTA, Hero, SectionHeading } from '@/components/shared';
import { expertise } from '@/lib/data';
import { getTranslator, localizedImage, type LocaleParams } from '@/lib/i18n';
import { getLocale } from '@/lib/locale-server';
import { pageMetadata } from '@/lib/metadata';
import { ArrowUpRight, Code2, Compass } from 'lucide-react';
import Image from 'next/image';
export default async function Home({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const t = getTranslator(locale);
  return (
    <div className="home-page">
      <Hero
        title={
          <>
            {t('Website Development')}
            <br className="desktop-break" />
            {t(' for Your Business.')}
          </>
        }
        description={t(
          'We build company websites, landing pages, and online stores, with web applications and integrations tailored to your business processes.',
        )}
      >
        <Link
          className="button button-light"
          href="/portfolio"
        >
          {t('Explore Our Portfolio')}
        </Link>
      </Hero>
      <section className="section">
        <div className="container split-grid">
          <div>
            <SectionHeading
              eyebrow={t('About TemuWeb')}
              title={t('Your Website Development Partner.')}
            />
            <div className="prose">
              <p>
                {t(
                  'TemuWeb is a software house in Surabaya focused on website development. We help you present your business, explain your services, and make it easier for customers to get in touch.',
                )}
              </p>
              <p>
                {t(
                  'From company profiles to custom web applications, we define the content, features, and technical requirements with you before development begins.',
                )}
              </p>
            </div>
            <div className="about-highlights">
              <div>
                <Compass size={21} />
                <div>
                  <h3>{t('Clear Website Structure')}</h3>
                  <p>{t('Content and navigation that help visitors find what they need.')}</p>
                </div>
              </div>
              <div>
                <Code2 size={21} />
                <div>
                  <h3>{t('Maintainable Development')}</h3>
                  <p>{t('Responsive websites with a foundation for future updates.')}</p>
                </div>
              </div>
            </div>
            <Link
              href="/about-us"
              className="button button-outline"
            >
              {t('Get to Know TemuWeb')}
            </Link>
          </div>
          <div className="portrait-image">
            <Image
              src={localizedImage('/images/home-about.jpg', locale)}
              alt={t('An architectural workspace filled with natural light')}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>
      <section className="section expertise-section">
        <div className="container">
          <SectionHeading
            center
            eyebrow={t('Our Expertise')}
            title={t('Websites, Applications, Integrations.')}
          />
          <div className="expertise-grid">
            {expertise.map((item) => (
              <Link
                className="expertise-card"
                href="/portfolio"
                key={item.title}
              >
                <Image
                  src={localizedImage(item.image, locale)}
                  alt={t('{0} original interface composition', t(item.title))}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div className="expertise-shade" />
                <div className="expertise-copy">
                  <h3>{t(item.title)}</h3>
                  <p>{item.items.map((value) => t(value)).join(' / ')}</p>
                  <span>
                    {t('Explore our work')}
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section bordered">
        <div className="container">
          <SectionHeading
            center
            eyebrow={t('Portfolio')}
            title={t('Website & Application Concepts.')}
          >
            {t(
              'Explore our original interface concepts for company websites, online stores, and business applications. These are design explorations, not commissioned client projects.',
            )}
          </SectionHeading>
          <FeaturedProjects />
          <div className="center-action">
            <Link
              href="/portfolio"
              className="button button-outline"
            >
              {t('View Portfolio')}
            </Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container service-split">
          <div>
            <SectionHeading
              eyebrow={t('What We Do')}
              title={t('From Website Design to Launch.')}
            />
            <div className="numbered-services">
              {[
                [
                  'Website Design & Development',
                  'Company profiles, landing pages, and custom websites with clear content, responsive layouts, and features agreed around your business needs.',
                ],
                [
                  'Custom Web Applications',
                  'Web-based dashboards and internal systems for managing information, coordinating tasks, and connecting existing business tools.',
                ],
                [
                  'UI/UX & Website Maintenance',
                  'Interface design, technical reviews, and ongoing improvements to keep your website usable and ready for changing requirements.',
                ],
              ].map(([title, description], index) => (
                <Link
                  href="/services"
                  key={title}
                >
                  <span className="service-number">0{index + 1}</span>
                  <div>
                    <h3>{typeof title === 'string' ? t(title) : title}</h3>
                    <p>{t(description)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="portrait-image">
            <Image
              src={localizedImage('/images/home-what-we-do.jpg', locale)}
              alt={t('A collaborative design session with interface sketches')}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
        </div>
      </section>
      <section className="section carbon bordered">
        <div className="container">
          <SectionHeading
            center
            eyebrow={t('Industries & Capabilities')}
            title={t('Websites for Different Business Needs.')}
          >
            {t(
              'A company website, product catalog, booking interface, or internal dashboard: the structure and features follow how your business serves its customers.',
            )}
          </SectionHeading>
          <IndustryExplorer />
        </div>
      </section>
      <ContactCTA />
    </div>
  );
}

export async function generateMetadata({ params }: LocaleParams) {
  const locale = await getLocale(params);
  return pageMetadata(
    locale,
    '/',
    'Website Development & Software House',
    'TemuWeb is a software house in Surabaya offering company profile websites, landing pages, e-commerce development, web applications, and website maintenance.',
  );
}
