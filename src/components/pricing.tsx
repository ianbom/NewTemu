import { whatsappHref } from '@/lib/behavior';
import { services } from '@/lib/data';
import { getTranslator, type Locale } from '@/lib/i18n';
import { ArrowUpRight, Plus } from 'lucide-react';

const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

const questions = [
  [
    'How do I choose a package?',
    'Choose based on what your business needs: an introduction, an online store, or help with daily operations. Each package explains who it suits and what is included. Open Delivery scope for the work allowance, then confirm the details and final price with us before starting.',
  ],
  [
    'Are domain and hosting included?',
    'A standard domain and basic hosting for the first year are included in website and web application packages. Renewal from the second year and any capacity upgrades are charged separately according to your requirements.',
  ],
  [
    'Are there additional costs?',
    'Premium licenses, payment transaction fees, and third-party subscriptions are separate. UI/UX packages cover design, not website development. Maintenance follows the monthly work allowance shown in Delivery scope; it does not include unlimited support or a guaranteed emergency response.',
  ],
  [
    'What if my requirements change?',
    'Tell us what you would like to add or change. We explain any effect on the agreed work and price before proceeding. For business applications, we agree which activities and types of user the application will support before development.',
  ],
];

export function Pricing({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
  return (
    <div className="pricing-page">
      <section className="pricing-intro container">
        <div className="pricing-intro-topline">
          <p className="eyebrow">{t('Pricing')} / IDR</p>
        </div>
        <h1>{t('Website Packages for Your Business.')}</h1>
        <p className="pricing-intro-description">
          {t('Package prices can change based on agreement.')}
        </p>
      </section>

      <div
        className="pricing-content container"
        id="pricing-packages"
      >
        <nav
          className="pricing-index"
          aria-label={t('Pricing service navigation')}
        >
          {services.map((service, index) => (
            <a
              key={service.slug}
              href={`#${service.slug}`}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {t(service.title)}
            </a>
          ))}
        </nav>

        {services.map((service, index) => (
          <section
            className="pricing-service"
            id={service.slug}
            aria-labelledby={`${service.slug}-title`}
            key={service.slug}
          >
            <div className="pricing-service-heading">
              <span className="pricing-service-number">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="eyebrow">{t(service.category)}</p>
                <h2 id={`${service.slug}-title`}>{t(service.title)}</h2>
                <p className="pricing-service-description">{t(service.description)}</p>
              </div>
              <p className="pricing-service-note">
                {t(
                  index < 4
                    ? 'First-year domain & hosting included.'
                    : service.slug === 'ui-ux-design'
                      ? 'Design deliverables only. No development.'
                      : 'A monthly allowance for updates and minor fixes.',
                )}
              </p>
            </div>

            <div className="pricing-packages">
              {service.packages.map((plan) => {
                const amount = rupiah.format(plan.price).replace(/\s/g, '');
                const inquiry = [
                  t(service.title),
                  plan.name,
                  t('Starting at {0}', amount),
                  t(service.billing),
                ].join(' / ');
                return (
                  <article
                    className="pricing-package"
                    aria-labelledby={`${service.slug}-${plan.name}`}
                    key={plan.name}
                  >
                    <h3 id={`${service.slug}-${plan.name}`}>{plan.name}</h3>
                    <p className="pricing-from">{t('Starting at')}</p>
                    <p className="pricing-amount">{amount}</p>
                    <p className="pricing-billing">{t(service.billing)}</p>
                    <p className="pricing-package-description">
                      {t(plan.description)}
                    </p>
                    <ul className="pricing-features">
                      {plan.features.map((feature) => (
                        <li key={feature}>{t(feature)}</li>
                      ))}
                    </ul>
                    <details className="pricing-scope">
                      <summary>
                        {t('Delivery scope')}
                        <Plus
                          size={14}
                          aria-hidden="true"
                        />
                      </summary>
                      <ul>
                        {plan.scopeDetails.map((detail) => (
                          <li key={detail}>{t(detail)}</li>
                        ))}
                      </ul>
                    </details>
                    <a
                      className="button button-outline pricing-package-cta"
                      href={whatsappHref(locale, inquiry)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t('Discuss {0}: {1}', t(service.title), plan.name)}
                    >
                      {t('Discuss {0}', plan.name)}
                      <ArrowUpRight
                        size={16}
                        aria-hidden="true"
                      />
                    </a>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
        <p className="pricing-terms">
          {t(
            'All prices are starting prices in Rupiah. The final price and scope are confirmed before work begins. First-year domain and basic hosting apply to website and web application packages only; renewal, upgrades, premium licenses, and third-party fees are separate.',
          )}
        </p>
      </div>

      <section className="pricing-faq-section carbon bordered">
        <div className="container pricing-faq-layout">
          <div>
            <p className="eyebrow">{t('Before we begin')}</p>
            <h2>{t('A Few Things to Know.')}</h2>
          </div>
          <div className="pricing-faq">
            {questions.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {t(question)}
                  <Plus
                    size={18}
                    aria-hidden="true"
                  />
                </summary>
                <p>{t(answer)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing-contact container">
        <p className="eyebrow">{t('Discuss your website')}</p>
        <h2>{t('Need a Different Scope?')}</h2>
        <p>
          {t(
            'Share the pages, features, and integrations you have in mind. We can help define a package around your actual requirements.',
          )}
        </p>
        <a
          className="button button-light"
          href={whatsappHref(locale)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('Discuss on WhatsApp')}
          <ArrowUpRight
            size={16}
            aria-hidden="true"
          />
        </a>
      </section>
    </div>
  );
}
