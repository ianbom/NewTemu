'use client';
import { Wordmark } from '@/components/header';
import { useI18n } from '@/components/i18n-provider';
import Link from '@/components/localized-link';
import { whatsappHref } from '@/lib/behavior';
import { navigation, services, type Project } from '@/lib/data';
import { localizedImage } from '@/lib/i18n';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
export function Hero({
  title,
  description,
  image = '/images/studio-architecture.jpg',
  eyebrow,
  children,
}: {
  title: React.ReactNode;
  description: string;
  image?: string;
  eyebrow?: string;
  children?: React.ReactNode;
}) {
  const { locale, t } = useI18n();
  return (
    <section className="hero">
      <Image
        src={localizedImage(image, locale)}
        alt={t('')}
        fill
        priority
        sizes="100vw"
        className="hero-image"
      />
      <div className="hero-shade" />
      <div className="hero-content container">
        {eyebrow && <p className="eyebrow hero-eyebrow">{t(eyebrow)}</p>}
        <h1>{typeof title === 'string' ? t(title) : title}</h1>
        <p className="hero-description">{t(description)}</p>
        {typeof children === 'string' ? t(children) : children}
      </div>
    </section>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  children,
  center = false,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  center?: boolean;
}) {
  const { t } = useI18n();
  return (
    <div className={`section-heading ${center ? 'center' : ''}`}>
      <p className="eyebrow">{t(eyebrow)}</p>
      <h2>{typeof title === 'string' ? t(title) : title}</h2>
      {children && (
        <p className="section-description">
          {typeof children === 'string' ? t(children) : children}
        </p>
      )}
    </div>
  );
}
export function ProjectCard({ project }: { project: Project }) {
  const { locale, t } = useI18n();
  return (
    <Link
      href="/portfolio"
      className="project-card"
    >
      <div className="project-card-image">
        <Image
          src={localizedImage(project.image, locale)}
          alt={t('{0} digital interface concept', project.name)}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
        />
        <span className="image-link-mark">
          <ArrowUpRight size={22} />
        </span>
      </div>
      <div className="project-card-meta">
        <span>{t(project.category)}</span>
        <span>{t('Studio concept')}</span>
      </div>
      <h3>
        {project.name}
        <ArrowUpRight size={17} />
      </h3>
      <p>{t(project.description)}</p>
    </Link>
  );
}
export function ContactCTA() {
  const { locale, t } = useI18n();
  return (
    <section className="contact-cta">
      <Image
        src={localizedImage('/images/creative-workspace.jpg', locale)}
        alt={t('')}
        fill
        sizes="100vw"
        className="cta-image"
      />
      <div className="cta-shade" />
      <div className="container">
        <p className="eyebrow">{t('The next conversation')}</p>
        <h2>{t('Have Something Great in Mind?')}</h2>
        <p>
          {t(
            "Tell us about your idea. We'll help turn it into a thoughtfully designed, carefully developed digital experience.",
          )}
        </p>
        <a
          href={whatsappHref(locale)}
          target="_blank"
          rel="noopener noreferrer"
          className="button button-light"
        >
          {t("Let's Talk")}
        </a>
      </div>
    </section>
  );
}
export function Footer() {
  const { locale, t } = useI18n();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link
              href="/"
              aria-label={t('KIVORA STUDIO home')}
            >
              <Wordmark />
            </Link>
            <p>
              {t('Crafting Digital Experiences')}
              <br />
              {t('That Matter.')}
            </p>
            <p>
              {t('Thoughtful design. Purposeful technology.')}
              <br />
              {t('A digital studio based in Surabaya.')}
            </p>
          </div>
          <div>
            <h2>{t('Explore')}</h2>
            {navigation.slice(2, 4).map((item) => (
              <Link
                key={item.href}
                href={item.href}
              >
                {t(item.label)}
              </Link>
            ))}
          </div>
          <div>
            <h2>{t('The Studio')}</h2>
            {navigation.filter((_, index) => index < 2 || index === 4).map((item) => (
              <Link
                key={item.href}
                href={item.href}
              >
                {t(item.label)}
              </Link>
            ))}
            <a
              href={whatsappHref(locale)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('Contact Us')}
            </a>
          </div>
          <div className="footer-contact">
            <h2>{t('Get In Touch')}</h2>
            <a href="mailto:mail@agency.site">
              <Mail size={14} />
              {t('mail@agency.site')}
            </a>
            <a
              href={whatsappHref(locale)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone size={14} />
              +62 851-5199-4724
            </a>
            <p>
              <MapPin size={14} />
              {t('Surabaya, East Java,')}
              <br />
              {t('Indonesia')}
            </p>
          </div>
          <div className="footer-services">
            <h2>{t('Built Around Your Needs')}</h2>
            <p>{t('Websites, applications, and meaningful digital experiences.')}</p>
            <a
              href={whatsappHref(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-outline"
            >
              {t('Direct WhatsApp Inquiry')}
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            &copy; {new Date().getFullYear()}
            {t(' KIVORA STUDIO. All rights reserved.')}
          </span>
          <div>
            {[services[0], services[3], services[4]].map((service) => (
              <a
                href={whatsappHref(locale, service.type)}
                target="_blank"
                rel="noopener noreferrer"
                key={service.title}
              >
                {t(service.category)}
              </a>
            ))}
          </div>
          <span>{t('Design with intention.')}</span>
        </div>
      </div>
    </footer>
  );
}
