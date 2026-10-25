import { Header } from '@/components/header';
import { LocaleProvider } from '@/components/i18n-provider';
import { Footer } from '@/components/shared';
import { getTranslator, locales, type LocaleParams } from '@/lib/i18n';
import { getLocale } from '@/lib/locale-server';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import '../globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3017'),
  ),
  title: { default: 'KIVORA STUDIO', template: '%s | KIVORA STUDIO' },
  applicationName: 'KIVORA STUDIO',
  icons: { icon: '/icon.svg' },
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
  return (
    <html
      lang={locale}
      className={geist.variable}
    >
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
