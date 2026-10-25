import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/shared';
import './globals.css';
const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });
export const metadata: Metadata = {
  title: {
    default: 'KIVORA STUDIO | Thoughtful Digital Experiences',
    template: '%s | KIVORA STUDIO',
  },
  description:
    'Independent digital agency and software development studio in Surabaya, Indonesia. Thoughtfully designed websites, web applications, and custom digital solutions.',
  applicationName: 'KIVORA STUDIO',
  openGraph: {
    title: 'KIVORA STUDIO',
    description: 'Crafting Digital Experiences That Matter.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/images/social-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'KIVORA STUDIO - Crafting Digital Experiences That Matter.',
      },
    ],
  },
  twitter: { card: 'summary_large_image' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={geist.variable}
    >
      <body>
        <a
          href="#main"
          className="skip-link"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
