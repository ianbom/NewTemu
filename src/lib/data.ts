export const categories = [
  'All Projects',
  'Websites',
  'Web Applications',
  'E-Commerce',
  'UI/UX Design',
] as const;
export const categorySlug = (category: string) =>
  category.toLowerCase().replaceAll('/', '-').replaceAll(' ', '-');
export const navigation = [
  { label: 'About Us', href: '/about-us' },
  { label: 'Our Process', href: '/our-process' },
  { label: 'Selected Work', href: '/work' },
  { label: 'Our Services', href: '/services' },
  { label: 'Showcase', href: '/showcase' },
  { label: 'Our Approach', href: '/our-approach' },
  { label: 'Careers', href: '/careers' },
];
export const projectTypes = [
  'Company Profile Website',
  'E-Commerce Website',
  'Web Application',
  'UI/UX Design',
  'Custom Software',
  'Other',
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
    'An editorial approach to everyday essentials.',
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
    'A clearer view of the working day.',
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
    'Care, with a more human interface.',
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
    'A quieter kind of hospitality.',
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
    'A digital home for architectural thinking.',
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
    'Learning, organized around people.',
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
    'Small rituals. Thoughtful details.',
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
    'Movement, made easier to navigate.',
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
    'A shared view of ambitious projects.',
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
    'Objects of character. Commerce with clarity.',
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
    'An independent perspective on culture.',
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
    'A financial interface with a calmer rhythm.',
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
      'A clear, considered introduction to your business. Built around your identity, your work, and the people you want to reach.',
    details: 'Brand storytelling / Responsive design',
    image: '/images/projects/forma.svg',
  },
  {
    title: 'Custom Website Development',
    category: 'Websites',
    type: 'Company Profile Website',
    description:
      'Distinctive websites shaped around specific goals, with considered interactions and a foundation that is easy to maintain.',
    details: 'Custom interfaces / Content architecture',
    image: '/images/projects/kaldo.svg',
  },
  {
    title: 'E-Commerce Development',
    category: 'Commerce',
    type: 'E-Commerce Website',
    description:
      'Thoughtful shopping experiences that make it easier to discover products, understand the details, and take the next step.',
    details: 'Product discovery / Shopping journeys',
    image: '/images/projects/auren.svg',
  },
  {
    title: 'Business Web Applications',
    category: 'Applications',
    type: 'Web Application',
    description:
      'Purpose-built dashboards, internal tools, and digital platforms that bring clarity to the way your business works.',
    details: 'Dashboards / Integrations / Workflows',
    image: '/images/projects/norden.svg',
  },
  {
    title: 'UI/UX Design',
    category: 'Design',
    type: 'UI/UX Design',
    description:
      'From early journeys to detailed interfaces, we turn complex requirements into experiences people can understand and use.',
    details: 'User journeys / Prototypes / Design systems',
    image: '/images/projects/lumio.svg',
  },
  {
    title: 'Maintenance & Optimization',
    category: 'Ongoing support',
    type: 'Other',
    description:
      'Practical care for your digital product, with attention to performance, accessibility, compatibility, and evolving needs.',
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
    title: 'Mobile Applications',
    category: 'Web Applications',
    image: '/images/projects/norden.svg',
    items: [
      'iOS & Android Apps',
      'Cross-Platform Dev',
      'Custom Mobile Systems',
      'Mobile App UI/UX',
    ],
  },
  {
    title: 'Digital Experiences',
    category: 'E-Commerce',
    image: '/images/projects/auren.svg',
    items: ['E-Commerce', 'UI/UX Design', 'API Integrations', 'Digital Optimization'],
  },
];
