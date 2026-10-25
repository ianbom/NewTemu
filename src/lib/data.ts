export const categories = [
  'All Projects',
  'Websites',
  'Web Applications',
  'E-Commerce',
  'UI/UX Design',
] as const;
export const navigation = [
  { label: 'About Us', href: '/about-us' },
  { label: 'Our Process', href: '/our-process' },
  { label: 'Our Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Our Approach', href: '/our-approach' },
];
export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  sector: string;
  headline: string;
  overview: string;
  direction: string;
  features: string[];
  stack: string[];
  image: string;
  gallery: string[];
};
const entries = [
  [
    'auren',
    'AUREN',
    'E-Commerce',
    'Online store concept with product collections and a shopping flow.',
    'Lifestyle & Retail',
    'An understated storefront. A considered shopping experience.',
    'A study in calm commerce, AUREN brings product discovery, clear information, and a focused checkout journey into one coherent experience.',
    'Warm paper tones, deliberate product compositions, and oversized typography give every item room to speak.',
    ['Curated product collections', 'Responsive product discovery', 'Accessible shopping flow'],
  ],
  [
    'norden',
    'NORDEN',
    'Web Applications',
    'Dashboard concept for tasks, projects, and business activity.',
    'Business & Operations',
    'Complex operations. Clear decisions.',
    'NORDEN explores a unified workspace for understanding projects, coordinating tasks, and reviewing business activity without switching between disconnected tools.',
    'Precise grids and quiet data visualization bring structure to dense operational information.',
    [
      'Business overview dashboard',
      'Project and task organization',
      'Reporting and activity views',
    ],
  ],
  [
    'lumio',
    'LUMIO',
    'UI/UX Design',
    'Healthcare interface concept for services and appointments.',
    'Healthcare & Services',
    'Less friction between people and care.',
    'LUMIO is a healthcare interface concept that considers the complete appointment journey, from finding the right service to preparing for a consultation.',
    'Soft blue tones, generous spacing, and plain-language guidance create a reassuring visual system.',
    ['Appointment journey design', 'Responsive patient interface', 'Accessible form patterns'],
  ],
  [
    'kaldo',
    'KALDO',
    'Websites',
    'Hospitality website concept with accommodation and inquiry pages.',
    'Hospitality & Travel',
    'A place to pause. An experience to remember.',
    'KALDO translates the atmosphere of an independent retreat into a website built around considered imagery, intuitive exploration, and straightforward inquiries.',
    'Architectural compositions and restrained serif accents balance warmth with a distinctly editorial rhythm.',
    ['Destination storytelling', 'Accommodation detail pages', 'Direct inquiry experience'],
  ],
  [
    'forma',
    'FORMA',
    'Websites',
    'Company website concept for an architecture practice and its projects.',
    'Architecture & Design',
    'Space, proportion, and a new perspective.',
    'FORMA examines how an architecture practice can present its ideas and projects through image-led storytelling and a carefully structured portfolio.',
    'Monochrome surfaces and a strong typographic grid keep attention on the work.',
    ['Project archive', 'Practice introduction', 'Responsive editorial pages'],
  ],
  [
    'sora',
    'SORA',
    'Web Applications',
    'Learning dashboard concept for courses, progress, and schedules.',
    'Education & Learning',
    'Make room for a better way to learn.',
    'SORA brings learning materials, progress, and upcoming sessions together in a focused student workspace concept.',
    'A clear navigation system and warm accent colors help users distinguish learning tasks without visual overload.',
    ['Course workspace', 'Progress visualization', 'Learning schedule'],
  ],
  [
    'mori',
    'MORI',
    'E-Commerce',
    'Skincare store concept with product and ingredient information.',
    'Beauty & Wellbeing',
    'A considered approach to daily care.',
    'MORI explores a product-led skincare storefront, where ingredient information and daily rituals make product selection feel approachable.',
    'Sage green, generous whitespace, and simple product silhouettes form a quiet visual identity.',
    ['Product storytelling', 'Ingredient information', 'Collection browsing'],
  ],
  [
    'velo',
    'VELO',
    'UI/UX Design',
    'Travel planning interface concept with route comparison.',
    'Mobility & Technology',
    'Find your next way forward.',
    'VELO is a mobility interface exploration focused on helping people understand route options and plan a journey with fewer decisions.',
    'Directional graphics, concise labels, and clear states keep the experience legible on smaller screens.',
    ['Mobile journey planning', 'Route comparison', 'Reusable interface system'],
  ],
  [
    'atlas',
    'ATLAS',
    'Web Applications',
    'Team workspace concept for project planning and activity tracking.',
    'Technology & Teams',
    'Keep the work moving, together.',
    'ATLAS investigates a collaborative project workspace where teams can connect milestones, priorities, and the details that often get lost between tools.',
    'A disciplined sidebar and balanced information density support day-to-day concentration.',
    ['Team project overview', 'Milestone planning', 'Activity and reporting'],
  ],
  [
    'objet',
    'OBJET',
    'E-Commerce',
    'Retail website concept with collections and product detail pages.',
    'Design & Retail',
    'Less noise. More character.',
    'OBJET is a digital retail concept for carefully selected personal accessories, bringing a gallery-like pace to product discovery.',
    'Deep ink, ivory surfaces, and close-up geometric compositions create a focused product stage.',
    ['Editorial collections', 'Product detail experience', 'Mobile shopping design'],
  ],
  [
    'vesper',
    'VESPER',
    'Websites',
    'Editorial website concept with articles and an event archive.',
    'Arts & Culture',
    'Ideas worth spending time with.',
    'VESPER explores an editorial website for independent arts programming, balancing an evolving journal with a structured event archive.',
    'Rich burgundy and confident typography give cultural stories a distinctive visual home.',
    ['Editorial journal', 'Event archive', 'Inquiry and information pages'],
  ],
  [
    'circa',
    'CIRCA',
    'UI/UX Design',
    'Personal finance interface concept with spending and account views.',
    'Finance & Productivity',
    'Make sense of the everyday.',
    'CIRCA is a personal finance interface study designed to make everyday spending patterns understandable without adding complexity.',
    'Warm neutral surfaces and clear hierarchy separate account information, activity, and next steps.',
    ['Account overview design', 'Spending insights', 'Mobile component library'],
  ],
] as const;
export const projects: Project[] = entries.map(
  ([slug, name, category, description, sector, headline, overview, direction, features]) => ({
    slug,
    name,
    category,
    description,
    sector,
    headline,
    overview,
    direction,
    features: [...features],
    stack:
      category === 'UI/UX Design'
        ? ['Figma', 'Design systems', 'Interactive prototyping']
        : ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    image: `/images/projects/${slug}.svg`,
    gallery: [0, 1, 2].map((index) => `/images/projects/${slug}${index ? `-${index}` : ''}.svg`),
  }),
);
export const services = [
  {
    title: 'Company Profile Websites',
    category: 'Websites',
    type: 'Company Profile Website',
    description:
      'Introduce your company, services, and contact information through a responsive website with a clear page structure.',
    details: 'Company information / Service pages / Contact links',
    image: '/images/projects/forma.svg',
  },
  {
    title: 'Custom Website Development',
    category: 'Websites',
    type: 'Company Profile Website',
    description:
      'Landing pages and custom websites with page layouts, content structure, and features tailored to your business requirements.',
    details: 'Landing pages / Custom features / Responsive layouts',
    image: '/images/projects/kaldo.svg',
  },
  {
    title: 'E-Commerce Development',
    category: 'Commerce',
    type: 'E-Commerce Website',
    description:
      'Online stores with product catalogs, product detail pages, and shopping flows. Payment and delivery integrations follow the agreed scope.',
    details: 'Product catalogs / Shopping flows / Integrations',
    image: '/images/projects/auren.svg',
  },
  {
    title: 'Business Web Applications',
    category: 'Applications',
    type: 'Web Application',
    description:
      'Web applications for internal operations, data management, and reporting, with access roles and integrations defined during discovery.',
    details: 'Dashboards / Integrations / Workflows',
    image: '/images/projects/norden.svg',
  },
  {
    title: 'UI/UX Design',
    category: 'Design',
    type: 'UI/UX Design',
    description:
      'Website structures, wireframes, and interface prototypes to review content, navigation, and user flows before development.',
    details: 'User journeys / Prototypes / Design systems',
    image: '/images/projects/lumio.svg',
  },
  {
    title: 'Maintenance & Optimization',
    category: 'Ongoing support',
    type: 'Other',
    description:
      'Website updates, bug fixes, performance reviews, and compatibility checks. Maintenance responsibilities and frequency are agreed separately.',
    details: 'Technical reviews / Iterative improvements',
    image: '/images/projects/atlas.svg',
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
