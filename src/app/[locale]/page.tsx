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
            {t('We Craft Digital Experiences')}
            <br className="desktop-break" />
            {t(" for What's Next.")}
          </>
        }
        description={t(
          'From distinctive websites to scalable digital platforms, we bring design, technology, and strategy together to create meaningful digital experiences.',
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
              eyebrow={t('About KIVORA STUDIO')}
              title={t('More Than Just a Digital Agency.')}
            />
            <div className="prose">
              <p>
                {t(
                  'We believe exceptional digital products are built at the intersection of thoughtful design, purposeful technology, and deep understanding of the people who use them.',
                )}
              </p>
              <p>
                {t(
                  'Based in Surabaya, we bring a considered perspective to websites, applications, and custom digital solutions. Every project starts with a conversation and an understanding of what your business actually needs.',
                )}
              </p>
            </div>
            <div className="about-highlights">
              <div>
                <Compass size={21} />
                <div>
                  <h3>{t('Design-Led Thinking')}</h3>
                  <p>{t('Clear experiences, shaped around real people.')}</p>
                </div>
              </div>
              <div>
                <Code2 size={21} />
                <div>
                  <h3>{t('Purposeful Engineering')}</h3>
                  <p>{t('Careful development, built for the long term.')}</p>
                </div>
              </div>
            </div>
            <Link
              href="/about-us"
              className="button button-outline"
            >
              {t('Read Our Story')}
            </Link>
          </div>
          <div className="portrait-image">
            <Image
              src={localizedImage('/images/creative-workspace.jpg', locale)}
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
            title={t('Ideas, Made Digital.')}
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
            title={t('A Few Different Perspectives.')}
          >
            {t(
              'Original studio concepts exploring the space between thoughtful design and purposeful technology.',
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
              title={t('Digital Craft, Built Around You.')}
            />
            <div className="numbered-services">
              {[
                [
                  'Website Design & Development',
                  'Distinctive websites that bring your identity into focus, with considered content, responsive layouts, and a reliable technical foundation.',
                ],
                [
                  'Custom Web Applications',
                  'Purpose-built platforms, dashboards, and connected systems that support the way your business actually works.',
                ],
                [
                  'Digital Strategy & UI/UX',
                  'From understanding the challenge to refining the smallest interaction, we design for clarity, usability, and purpose.',
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
              src={localizedImage('/images/design-process.jpg', locale)}
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
            title={t('Building Digital Solutions for Ambitious Businesses.')}
          >
            {t(
              'We work across industries to create digital platforms that combine intuitive experiences, reliable engineering, and thoughtful business solutions.',
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
    'Thoughtful Digital Experiences',
    'Independent digital agency and software development studio in Surabaya, Indonesia. Thoughtfully designed websites, web applications, and custom digital solutions.',
  );
}
