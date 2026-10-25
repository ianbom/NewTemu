import { ContactForm } from '@/components/interactive';
import { ContactCTA, Hero } from '@/components/shared';
import { getTranslator, type LocaleParams } from '@/lib/i18n';
import { getLocale } from '@/lib/locale-server';
import { pageMetadata } from '@/lib/metadata';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
export default async function ContactPage({
  searchParams,
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    type?: string;
    project?: string;
  }>;
}) {
  const query = await searchParams;
  const locale = await getLocale(params);
  const t = getTranslator(locale);
  return (
    <>
      <Hero
        contact
        title={t('Contact Us')}
        description={t(
          'A new idea, a complex challenge, or a digital experience ready for its next chapter. It starts with a conversation.',
        )}
        image="/images/studio-architecture.jpg"
      />
      <section className="section carbon">
        <div className="container contact-layout">
          <div className="contact-information">
            <p className="eyebrow">{t('Find the Studio')}</p>
            <h2>{t('Surabaya, Indonesia.')}</h2>
            <p>
              {t('Thoughtful conversations.')}
              <br />
              {t('Considered digital solutions.')}
            </p>
            <div className="contact-channels">
              <div>
                <MapPin size={20} />
                <div>
                  <h3>{t('Our Location')}</h3>
                  <p>
                    {t('Surabaya, East Java,')}
                    <br />
                    {t('Indonesia')}
                  </p>
                </div>
              </div>
              <div>
                <Mail size={20} />
                <div>
                  <h3>{t('Email')}</h3>
                  <a href="mailto:mail@agency.site">{t('mail@agency.site')}</a>
                </div>
              </div>
              <div>
                <Phone size={20} />
                <div>
                  <h3>{t('Phone / WhatsApp')}</h3>
                  <a href="tel:+6285151994724">+62 851-5199-4724</a>
                </div>
              </div>
            </div>
            <a
              className="text-link"
              href="https://wa.me/6285151994724"
              target="_blank"
              rel="noreferrer"
            >
              {t('Start a WhatsApp Conversation')}
              <ArrowUpRight size={16} />
            </a>
            <div className="location-note">
              <span className="eyebrow">{t('Based in East Java')}</span>
              <p>
                {t('Design and technology,')}
                <br />
                {t('with a considered perspective.')}
              </p>
              <span>{t("07\u00B015' S \u00A0 112\u00B045' E")}</span>
            </div>
          </div>
          <ContactForm
            initialType={typeof query.type === 'string' ? query.type : ''}
            project={typeof query.project === 'string' ? query.project.slice(0, 120) : ''}
          />
        </div>
      </section>
      <ContactCTA />
    </>
  );
}

export async function generateMetadata({ params }: LocaleParams) {
  const locale = await getLocale(params);
  return pageMetadata(
    locale,
    '/contact',
    'Contact',
    'Tell KIVORA STUDIO about your website, web application, or custom digital project. Based in Surabaya, East Java, Indonesia.',
  );
}
