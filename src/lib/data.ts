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
    title: 'Company Profile Websites',
    category: 'Websites',
    type: 'Company Profile Website',
    description:
      'Introduce your company, services, and contact information through a responsive website with a clear page structure.',
    details: 'Company information / Service pages / Contact links',
    image: '/images/projects/forma.svg',
    billing: 'Per project',
    packages: [
      {
        name: 'Starter',
        price: 1_000_000,
        description:
          'For small businesses ready to introduce their company and services online.',
        features: [
          'Company profile, services, and contact information',
          'Layouts that adapt to phones, tablets, and desktops',
          'WhatsApp links so visitors can contact your business',
          'Standard domain for the first year',
          'Basic hosting for the first year',
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
          'For businesses with more services to explain and information to keep up to date.',
        features: [
          'More space to introduce your company and services',
          'Layouts that adapt to phones, tablets, and desktops',
          'WhatsApp links so visitors can contact your business',
          'Update website information through a management area',
          'Standard domain for the first year',
          'Basic hosting for the first year',
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
          'For companies that need a fuller service presentation and a dedicated inquiry form.',
        features: [
          'A broader website structure for company and service information',
          'Layouts that adapt to phones, tablets, and desktops',
          'WhatsApp links so visitors can contact your business',
          'Update website information through a management area',
          'An inquiry form for prospective customers',
          'Standard domain for the first year',
          'Basic hosting for the first year',
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
    title: 'Custom Website Development',
    category: 'Websites',
    type: 'Company Profile Website',
    description:
      'Landing pages and custom websites with page layouts, content structure, and features tailored to your business requirements.',
    details: 'Landing pages / Custom features / Responsive layouts',
    image: '/images/projects/kaldo.svg',
    billing: 'Per project',
    packages: [
      {
        name: 'Starter',
        price: 1_500_000,
        description:
          'For a product, service, or campaign that needs its own focused landing page.',
        features: [
          'A landing page arranged around your offer',
          'Layouts that adapt to phones, tablets, and desktops',
          'WhatsApp links so visitors can contact your business',
          'Standard domain for the first year',
          'Basic hosting for the first year',
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
          'For businesses that need tailored pages and the ability to update their own content.',
        features: [
          'Page layouts and content structure tailored to your business',
          'Layouts that adapt to phones, tablets, and desktops',
          'Update website information through a management area',
          'An inquiry form for prospective customers',
          'Standard domain for the first year',
          'Basic hosting for the first year',
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
          'For a larger custom website that also needs to connect with an external service.',
        features: [
          'A broader set of page layouts tailored to your business',
          'Layouts that adapt to phones, tablets, and desktops',
          'Update website information through a management area',
          'An inquiry form for prospective customers',
          'Connect your website with an agreed external service',
          'Standard domain for the first year',
          'Basic hosting for the first year',
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
    title: 'E-Commerce Development',
    category: 'Commerce',
    type: 'E-Commerce Website',
    description:
      'Online stores with product catalogs, product detail pages, and shopping flows. Payment and delivery integrations follow the agreed scope.',
    details: 'Product catalogs / Shopping flows / Integrations',
    image: '/images/projects/auren.svg',
    billing: 'Per project',
    packages: [
      {
        name: 'Starter',
        price: 3_000_000,
        description:
          'For businesses that want an online product catalog and take orders through WhatsApp.',
        features: [
          'A product catalog for visitors to browse your range',
          'Product detail pages to explain each item',
          'Customers continue their order through WhatsApp',
          'Layouts that adapt to phones, tablets, and desktops',
          'Standard domain for the first year',
          'Basic hosting for the first year',
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
          'For online stores ready to manage products, receive orders, and accept online payments.',
        features: [
          'A product catalog with individual product pages',
          'Manage products and incoming orders in one place',
          'Customers can add items to a cart and complete checkout',
          'Connect checkout to an online payment provider',
          'Layouts that adapt to phones, tablets, and desktops',
          'Standard domain for the first year',
          'Basic hosting for the first year',
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
          'For stores with a larger catalog that need payment and delivery services in checkout.',
        features: [
          'A product catalog with individual product pages',
          'Manage products and incoming orders in one place',
          'Customers can add items to a cart and complete checkout',
          'Connect checkout to an online payment provider',
          'Connect your store to an agreed delivery service',
          'Layouts that adapt to phones, tablets, and desktops',
          'Standard domain for the first year',
          'Basic hosting for the first year',
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
    title: 'Business Web Applications',
    category: 'Applications',
    type: 'Web Application',
    description:
      'Web applications for internal operations, data management, and reporting, with access roles and integrations defined during discovery.',
    details: 'Dashboards / Integrations / Workflows',
    image: '/images/projects/norden.svg',
    billing: 'Per project',
    packages: [
      {
        name: 'Starter',
        price: 5_000_000,
        description:
          'For teams moving an agreed part of their day-to-day work into a web application.',
        features: [
          'A sign-in area for your team',
          'Access permissions matched to agreed responsibilities',
          'Manage business records through a web application',
          'Layouts that adapt to phones, tablets, and desktops',
          'Written documentation at handover',
          'Standard domain for the first year',
          'Basic hosting for the first year',
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
          'For teams managing several areas of work that also need reports and downloadable data.',
        features: [
          'A sign-in area for your team',
          'Access permissions matched to agreed responsibilities',
          'Manage business records through a web application',
          'Review business activity through reports',
          'Download data for your reporting needs',
          'Layouts that adapt to phones, tablets, and desktops',
          'Written documentation at handover',
          'Standard domain for the first year',
          'Basic hosting for the first year',
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
          'For broader internal operations that need reporting and a connection to another service.',
        features: [
          'A sign-in area for your team',
          'Access permissions matched to agreed responsibilities',
          'Manage business records through a web application',
          'Review business activity through reports',
          'Download data for your reporting needs',
          'Connect your application with an agreed external service',
          'Layouts that adapt to phones, tablets, and desktops',
          'Written documentation at handover',
          'Standard domain for the first year',
          'Basic hosting for the first year',
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
      'Website structures, wireframes, and interface prototypes to review content, navigation, and user flows before development.',
    details: 'User journeys / Prototypes / Design systems',
    image: '/images/projects/lumio.svg',
    billing: 'Per project',
    packages: [
      {
        name: 'Starter',
        price: 1_000_000,
        description:
          'For reviewing the structure and look of key pages before development begins.',
        features: [
          'Page structure and navigation planning',
          'Interface designs for the agreed pages',
          'Design variants for different screen sizes',
          'Editable design files in Figma',
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
          'For reviewing more pages and trying out the main user flow before it is built.',
        features: [
          'Page structure and navigation planning',
          'Interface designs for the agreed pages',
          'Design variants for different screen sizes',
          'Editable design files in Figma',
          'A clickable prototype to review the user flow',
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
          'For a wider digital product with consistent design elements across its main screens.',
        features: [
          'Page structure and navigation planning',
          'Interface designs for the agreed pages',
          'Design variants for different screen sizes',
          'Editable design files in Figma',
          'A clickable prototype to review the user flow',
          'Reusable design elements for a consistent interface',
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
      'Website updates, bug fixes, performance reviews, and compatibility checks. Maintenance responsibilities and frequency are agreed separately.',
    details: 'Technical reviews / Iterative improvements',
    image: '/images/projects/atlas.svg',
    billing: 'Per month',
    packages: [
      {
        name: 'Starter',
        price: 250_000,
        description:
          'For occasional content changes and minor website fixes within a monthly allowance.',
        features: [
          'Update existing website content',
          'Address minor website issues',
          'Check technical aspects of the website',
          'A monthly summary of the work carried out',
        ],
        scopeDetails: [
          'Up to 1 hour of work per month, shared across the listed tasks',
        ],
      },
      {
        name: 'Pro',
        price: 500_000,
        description:
          'For businesses making more frequent updates that need a larger monthly work allowance.',
        features: [
          'Update existing website content',
          'Address minor website issues',
          'Check technical aspects of the website',
          'A monthly summary of the work carried out',
        ],
        scopeDetails: [
          'Up to 3 hours of work per month, shared across the listed tasks',
        ],
      },
      {
        name: 'Business',
        price: 1_000_000,
        description:
          'For websites with a fuller monthly list of content changes and minor fixes.',
        features: [
          'Update existing website content',
          'Address minor website issues',
          'Check technical aspects of the website',
          'A monthly summary of the work carried out',
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
