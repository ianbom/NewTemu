import type { Locale } from './i18n.ts';

const SITE_URL = 'https://www.liniweb.site';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: 'LiniWeb',
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/images/social-cover.jpg`,
    image: `${SITE_URL}/images/social-cover.jpg`,
    description:
      'Software house di Surabaya yang menyediakan jasa pembuatan website company profile, landing page, toko online, aplikasi web, dan pemeliharaan website.',
    telephone: '+62-851-5199-4724',
    priceRange: 'Rp 250.000 - Rp 18.000.000',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Surabaya',
      addressRegion: 'Jawa Timur',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -7.2575,
      longitude: 112.7521,
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'Indonesia',
      },
      {
        '@type': 'City',
        name: 'Surabaya',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+62-851-5199-4724',
      contactType: 'customer service',
      availableLanguage: ['Indonesian', 'English'],
    },
    sameAs: ['https://wa.me/6285151994724'],
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: 'LiniWeb',
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    inLanguage: ['id', 'en'],
  };
}

export function getServicesSchema(locale: Locale) {
  const isId = locale === 'id';
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/#service-website`,
        name: isId ? 'Jasa Pembuatan Website' : 'Website Development',
        serviceType: 'Website Design & Development',
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: { '@type': 'Country', name: 'Indonesia' },
        description: isId
          ? 'Pembuatan website company profile, landing page, dan website khusus dengan desain responsif dan terawat.'
          : 'Company profile websites, landing pages, and custom websites with responsive design and maintainable structure.',
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/#service-ecommerce`,
        name: isId ? 'Jasa Pembuatan Toko Online' : 'E-Commerce Website Development',
        serviceType: 'E-Commerce Development',
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: { '@type': 'Country', name: 'Indonesia' },
        description: isId
          ? 'Pembuatan toko online dan katalog produk dengan integrasi WhatsApp dan payment gateway.'
          : 'Online store and product catalog websites with WhatsApp and payment gateway integration.',
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/#service-webapp`,
        name: isId ? 'Pengembangan Aplikasi Web' : 'Custom Web Applications',
        serviceType: 'Web Application Development',
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: { '@type': 'Country', name: 'Indonesia' },
        description: isId
          ? 'Aplikasi web khusus, dashboard bisnis, dan integrasi sistem sesuai alur operasional.'
          : 'Custom web applications, business dashboards, and system integrations tailored to business workflows.',
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/#service-maintenance`,
        name: isId ? 'Pemeliharaan Website' : 'Website Maintenance',
        serviceType: 'Website Maintenance & Support',
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: { '@type': 'Country', name: 'Indonesia' },
        description: isId
          ? 'Layanan update konten, perbaikan kendala ringan, dan pemeriksaan kesehatan website berkala.'
          : 'Website content updates, minor issue fixes, and regular website health checks.',
      },
    ],
  };
}

export function getBreadcrumbSchema(locale: Locale, pageName: string, path: string) {
  const isId = locale === 'id';
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isId ? 'Beranda' : 'Home',
        item: `${SITE_URL}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: pageName,
        item: `${SITE_URL}/${locale}${path}`,
      },
    ],
  };
}

export function getFaqSchema(locale: Locale) {
  const isId = locale === 'id';
  const faqs = isId
    ? [
        {
          q: 'Bagaimana cara memilih paket?',
          a: 'Pilih layanan yang Anda butuhkan, lalu bandingkan manfaat setiap paket. Buka Rincian Cakupan untuk melihat batas pekerjaan. Cakupan dan harga dikonfirmasi sebelum pengerjaan.',
        },
        {
          q: 'Apakah domain dan hosting sudah termasuk?',
          a: 'Paket website mencakup domain standar dan hosting tahun pertama, SSL selama hosting aktif, dashboard admin, serta integrasi WhatsApp. Paket aplikasi mobile mencakup domain dan hosting backend tahun pertama. Biaya perpanjangan terpisah.',
        },
        {
          q: 'Apakah paket aplikasi mobile mencakup Android dan iOS?',
          a: 'Semua paket aplikasi mobile mencakup Android dan iOS. Biaya akun developer dan publikasi di toko aplikasi terpisah. Fitur serta proses rilis disepakati sebelum pengerjaan.',
        },
        {
          q: 'Apakah ada biaya tambahan?',
          a: 'Biaya akun developer, publikasi toko aplikasi, lisensi premium, langganan, dan transaksi pembayaran terpisah. Paket UI/UX hanya mencakup desain. Maintenance mengikuti kapasitas pekerjaan bulanan, tanpa dukungan tanpa batas atau jaminan penanganan darurat.',
        },
        {
          q: 'Bagaimana jika kebutuhan saya berubah?',
          a: 'Perubahan cakupan atau harga dikonfirmasi sebelum dilanjutkan. Tambahan tampilan, fitur, atau integrasi disepakati secara terpisah.',
        },
      ]
    : [
        {
          q: 'How do I choose a package?',
          a: 'Choose the service you need, then compare the included benefits. Open Delivery scope for work limits. We confirm the scope and price before starting.',
        },
        {
          q: 'Are domain and hosting included?',
          a: 'Website packages include a standard domain and hosting for the first year, SSL while hosting is active, an admin dashboard, and WhatsApp integration. Mobile packages include first-year domain and hosting for the backend. Renewals are separate.',
        },
        {
          q: 'Do mobile packages include Android and iOS?',
          a: 'All mobile packages cover Android and iOS. Developer account and app store publication costs are separate. Features and release arrangements are confirmed before work begins.',
        },
        {
          q: 'Are there additional costs?',
          a: 'Developer accounts, app store publication, premium licenses, subscriptions, and payment transaction fees are separate. UI/UX covers design only. Maintenance follows the monthly work allowance, without unlimited support or emergency response guarantees.',
        },
        {
          q: 'What if my requirements change?',
          a: 'We confirm any change in scope or price before continuing. Additional screens, features, or integrations are agreed separately.',
        },
      ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}
