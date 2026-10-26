export const navigation = [
  { label: 'About Us', href: '/about-us' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Our Process', href: '/our-process' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Our Approach', href: '/our-approach' },
];
export type Project = {
  slug: string;
  name: string;
  category: 'Websites' | 'E-Commerce';
  description: string;
  image: string;
  url: string;
};
const entries = [
  [
    'vyren-ecom',
    'VYREN',
    'E-Commerce',
    'An online storefront with product collections and editorial presentation.',
    'https://vyren-ecom.vercel.app/',
  ],
  [
    'atelier',
    'ATELIER',
    'Websites',
    'An image-led website with a considered visual hierarchy.',
    'https://arvena.vercel.app/',
  ],
  [
    'galerya',
    'GALERYA',
    'Websites',
    'A website that brings photography, content, and navigation together.',
    'https://galerya-living.vercel.app/',
  ],
  [
    'noirel',
    'NOIREL',
    'Websites',
    'A studio website with a restrained palette and expressive typography.',
    'https://noirel-studio.vercel.app/',
  ],
  [
    'noirva',
    'NOIRVA',
    'Websites',
    'A website that gives imagery and project presentation room to lead.',
    'https://studio-noirva.vercel.app/',
  ],
  [
    'noirva-2',
    'NOIRVA / Studio',
    'Websites',
    'A studio website with an editorial approach to content and composition.',
    'https://noirva-studio.vercel.app/',
  ],
  [
    'vantra',
    'VANTRA',
    'Websites',
    'A brand-led website with a structured, image-focused presentation.',
    'https://studio-vantra.vercel.app/',
  ],
  [
    'northform-ecom',
    'NORTHFORM',
    'E-Commerce',
    'A footwear storefront with collection browsing and product-led imagery.',
    'https://northform-shoes.vercel.app/',
  ],
  [
    'lifetime',
    'LIFETIME',
    'Websites',
    'A website built around visual storytelling and clear content sections.',
    'https://life-livin.vercel.app/',
  ],
  [
    'liftco',
    'LIFTCO',
    'Websites',
    'A company website with a focused presentation of business information.',
    'https://vinch.vercel.app/',
  ],
  [
    'spil',
    'SPIL',
    'Websites',
    'A company website with structured information and image-led sections.',
    'https://spill-ship.vercel.app/',
  ],
] as const;
export const projects: Project[] = entries.map(
  ([slug, name, category, description, url]) => ({
    slug,
    name,
    category,
    description,
    image: `/images/portfolio/${slug}.webp`,
    url,
  }),
);
export const services = [
  {
    slug: 'company-profile',
    title: 'Website Company Profile',
    category: 'Websites',
    type: 'Company Profile Website',
    description:
      'Company websites with service information and easy contact options.',
    details: 'Company information / Service pages / Contact links',
    image: '/images/projects/forma.svg',
    billing: 'Per project',
    packages: [
      {
        name: 'Starter',
        price: 1_000_000,
        description:
          'A clear first website for your company.',
        features: [
          'Company profile, services & contact',
          'Mobile-friendly layout',
          'Domain for the first year',
          'Hosting for the first year',
          'SSL while hosting is active',
          'Admin dashboard',
          'WhatsApp integration',
        ],
        scopeDetails: [
          'Up to 3 website pages',
          '1 round of revisions before handover',
        ],
      },
      {
        name: 'Pro',
        price: 2_500_000,
        description:
          'More room to present your company and services.',
        features: [
          'Expanded company & service pages',
          'Mobile-friendly layout',
          'Domain for the first year',
          'Hosting for the first year',
          'SSL while hosting is active',
          'Admin dashboard',
          'WhatsApp integration',
        ],
        scopeDetails: [
          'Up to 6 website pages',
          '2 rounds of revisions before handover',
        ],
      },
      {
        name: 'Business',
        price: 4_500_000,
        description:
          'A fuller company profile with dedicated inquiry forms.',
        features: [
          'Complete company & service presentation',
          'Mobile-friendly layout',
          'Domain for the first year',
          'Hosting for the first year',
          'SSL while hosting is active',
          'Admin dashboard',
          'WhatsApp integration',
          'Quotation request form',
        ],
        scopeDetails: [
          'Up to 10 website pages',
          '3 rounds of revisions before handover',
        ],
      },
    ],
  },
  {
    slug: 'custom-website',
    title: 'Web Custom',
    category: 'Websites',
    type: 'Company Profile Website',
    description:
      'Landing pages and custom websites shaped around your business.',
    details: 'Landing pages / Custom features / Responsive layouts',
    image: '/images/projects/kaldo.svg',
    billing: 'Per project',
    packages: [
      {
        name: 'Starter',
        price: 1_500_000,
        description:
          'A focused landing page for your main offer.',
        features: [
          'Custom landing page',
          'Mobile-friendly layout',
          'Domain for the first year',
          'Hosting for the first year',
          'SSL while hosting is active',
          'Admin dashboard',
          'WhatsApp integration',
        ],
        scopeDetails: [
          '1 custom landing page',
          '1 round of revisions before handover',
        ],
      },
      {
        name: 'Pro',
        price: 3_500_000,
        description:
          'Custom pages with forms for new customer inquiries.',
        features: [
          'Custom page layouts',
          'Mobile-friendly layout',
          'Domain for the first year',
          'Hosting for the first year',
          'SSL while hosting is active',
          'Admin dashboard',
          'WhatsApp integration',
          'Customer inquiry form',
        ],
        scopeDetails: [
          'Up to 5 custom website pages',
          '2 rounds of revisions before handover',
        ],
      },
      {
        name: 'Business',
        price: 6_000_000,
        description:
          'A larger custom website connected to external services.',
        features: [
          'Extended custom page layouts',
          'Mobile-friendly layout',
          'Domain for the first year',
          'Hosting for the first year',
          'SSL while hosting is active',
          'Admin dashboard',
          'WhatsApp integration',
          'Customer inquiry form',
          'External service integration',
        ],
        scopeDetails: [
          'Up to 10 custom website pages',
          'Connection to 1 external service, agreed before development',
          '3 rounds of revisions before handover',
        ],
      },
    ],
  },
  {
    slug: 'e-commerce',
    title: 'Website E-Commerce',
    category: 'Commerce',
    type: 'E-Commerce Website',
    description:
      'Online stores with product catalogs, ordering, and payment options.',
    details: 'Product catalogs / Shopping flows / Integrations',
    image: '/images/projects/auren.svg',
    billing: 'Per project',
    packages: [
      {
        name: 'Starter',
        price: 3_000_000,
        description:
          'A product catalog with orders through WhatsApp.',
        features: [
          'Product catalog & detail pages',
          'Product management',
          'Orders through WhatsApp',
          'Mobile-friendly layout',
          'Domain for the first year',
          'Hosting for the first year',
          'SSL while hosting is active',
          'Admin dashboard',
          'WhatsApp integration',
        ],
        scopeDetails: [
          'Initial catalog setup for up to 20 products',
          '1 round of revisions before handover',
        ],
      },
      {
        name: 'Pro',
        price: 6_000_000,
        description:
          'An online store with checkout and online payments.',
        features: [
          'Product catalog & detail pages',
          'Product & order management',
          'Shopping cart & checkout',
          'Online payment integration',
          'Mobile-friendly layout',
          'Domain for the first year',
          'Hosting for the first year',
          'SSL while hosting is active',
          'Admin dashboard',
          'WhatsApp integration',
        ],
        scopeDetails: [
          'Initial catalog setup for up to 100 products',
          '2 rounds of revisions before handover',
        ],
      },
      {
        name: 'Business',
        price: 10_000_000,
        description:
          'An online store with payment and shipping integrations.',
        features: [
          'Product catalog & detail pages',
          'Product & order management',
          'Shopping cart & checkout',
          'Online payment integration',
          'Mobile-friendly layout',
          'Domain for the first year',
          'Hosting for the first year',
          'SSL while hosting is active',
          'Admin dashboard',
          'WhatsApp integration',
          'Shipping service integration',
        ],
        scopeDetails: [
          'Initial catalog setup for up to 300 products',
          '3 rounds of revisions before handover',
        ],
      },
    ],
  },
  {
    slug: 'web-applications',
    title: 'Aplikasi Mobile',
    category: 'Applications',
    type: 'Mobile Application',
    description:
      'Android and iOS applications for managing business activities.',
    details: 'Android / iOS / Admin dashboard',
    image: '/images/projects/norden.svg',
    billing: 'Per project',
    packages: [
      {
        name: 'Starter',
        price: 5_000_000,
        description:
          'Android and iOS apps for essential business tasks.',
        features: [
          'Android & iOS applications',
          'User login & access permissions',
          'Business data management',
          'Admin dashboard',
          'Handover documentation',
          'Backend domain for the first year',
          'Backend hosting for the first year',
        ],
        scopeDetails: [
          'Covers 1 agreed area of business activity',
          'Access settings for 2 types of user',
        ],
      },
      {
        name: 'Pro',
        price: 10_000_000,
        description:
          'Mobile apps with business reports and data exports.',
        features: [
          'Android & iOS applications',
          'User login & access permissions',
          'Business data management',
          'Admin dashboard',
          'Handover documentation',
          'Backend domain for the first year',
          'Backend hosting for the first year',
          'Business activity reports',
          'Data export',
        ],
        scopeDetails: [
          'Covers up to 3 agreed areas of business activity',
          'Access settings for 3 types of user',
        ],
      },
      {
        name: 'Business',
        price: 18_000_000,
        description:
          'Connected mobile apps for wider business operations.',
        features: [
          'Android & iOS applications',
          'User login & access permissions',
          'Business data management',
          'Admin dashboard',
          'Handover documentation',
          'Backend domain for the first year',
          'Backend hosting for the first year',
          'Business activity reports',
          'Data export',
          'External service integration',
        ],
        scopeDetails: [
          'Covers up to 5 agreed areas of business activity',
          'Access settings for 5 types of user',
          'Connection to 1 external service, agreed before development',
        ],
      },
    ],
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    category: 'Design',
    type: 'UI/UX Design',
    description:
      'Interface designs and interactive prototypes for websites and applications.',
    details: 'User journeys / Prototypes / Design systems',
    image: '/images/projects/lumio.svg',
    billing: 'Per project',
    packages: [
      {
        name: 'Starter',
        price: 1_000_000,
        description:
          'Interface designs with editable files for your team.',
        features: [
          'Page structure & navigation',
          'Interface design',
          'Responsive screen designs',
          'Editable Figma files',
        ],
        scopeDetails: [
          'Designs for up to 3 main screens',
          '1 round of revisions before handover',
        ],
      },
      {
        name: 'Pro',
        price: 2_500_000,
        description:
          'Interface designs with a prototype you can explore.',
        features: [
          'Page structure & navigation',
          'Interface design',
          'Responsive screen designs',
          'Editable Figma files',
          'Interactive prototype',
        ],
        scopeDetails: [
          'Designs for up to 6 main screens',
          '2 rounds of revisions before handover',
        ],
      },
      {
        name: 'Business',
        price: 5_000_000,
        description:
          'Complete interface designs with a reusable component library.',
        features: [
          'Page structure & navigation',
          'Interface design',
          'Responsive screen designs',
          'Editable Figma files',
          'Interactive prototype',
          'Reusable design components',
        ],
        scopeDetails: [
          'Designs for up to 12 main screens',
          '3 rounds of revisions before handover',
        ],
      },
    ],
  },
  {
    slug: 'maintenance',
    title: 'Maintenance & Optimization',
    category: 'Ongoing support',
    type: 'Other',
    description:
      'Content updates, minor fixes, and routine website checks.',
    details: 'Technical reviews / Iterative improvements',
    image: '/images/projects/atlas.svg',
    billing: 'Per month',
    packages: [
      {
        name: 'Starter',
        price: 250_000,
        description:
          'Light website upkeep for occasional content changes.',
        features: [
          'Website content updates',
          'Minor issue fixes',
          'Website health checks',
          'Monthly work report',
        ],
        scopeDetails: [
          'Up to 1 hour of work per month, shared across the listed tasks',
        ],
      },
      {
        name: 'Pro',
        price: 500_000,
        description:
          'Regular website upkeep with more room for updates.',
        features: [
          'Website content updates',
          'Minor issue fixes',
          'Website health checks',
          'Monthly work report',
        ],
        scopeDetails: [
          'Up to 3 hours of work per month, shared across the listed tasks',
        ],
      },
      {
        name: 'Business',
        price: 1_000_000,
        description:
          'Broader website upkeep for more frequent business updates.',
        features: [
          'Website content updates',
          'Minor issue fixes',
          'Website health checks',
          'Monthly work report',
        ],
        scopeDetails: [
          'Up to 6 hours of work per month, shared across the listed tasks',
        ],
      },
    ],
  },
];
export const expertise = [
  {
    title: 'Website Development',
    category: 'Websites',
    image: '/images/projects/kaldo.svg',
    items: ['Company Profiles', 'Landing Pages', 'Corporate Websites', 'Custom Websites'],
  },
  {
    title: 'Web Applications & Integrations',
    category: 'Web Applications',
    image: '/images/projects/norden.svg',
    items: [
      'Business Dashboards',
      'Internal Systems',
      'API Connections',
      'Workflow Automation',
    ],
  },
  {
    title: 'Commerce & Website Support',
    category: 'E-Commerce',
    image: '/images/projects/auren.svg',
    items: ['E-Commerce', 'UI/UX Design', 'API Integrations', 'Digital Optimization'],
  },
];
