import { Header } from '@/components/header';
import { LocaleProvider } from '@/components/i18n-provider';
import { Footer } from '@/components/shared';
import { getTranslator, locales, type LocaleParams } from '@/lib/i18n';
import { getLocale } from '@/lib/locale-server';
import { getOrganizationSchema, getWebSiteSchema } from '@/lib/structured-data';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import '../globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.liniweb.site'),
  title: { default: 'LiniWeb', template: '%s | LiniWeb' },
  applicationName: 'LiniWeb',
  icons: {
    icon: '/liniweb.ico',
    shortcut: '/liniweb.ico',
    apple: '/liniweb.ico',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: { card: 'summary_large_image' },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleParams & { children: React.ReactNode }) {
  const locale = await getLocale(params);
  const t = getTranslator(locale);
  const organizationSchema = getOrganizationSchema();
  const webSiteSchema = getWebSiteSchema();

  return (
    <html
      lang={locale}
      className={geist.variable}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body>
        <LocaleProvider locale={locale}>
          <a
            href="#main"
            className="skip-link"
          >
            {t('Skip to content')}
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
