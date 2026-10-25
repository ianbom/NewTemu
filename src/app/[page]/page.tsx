import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, UsersRound, Code2, BookOpen, Mail } from 'lucide-react';
import { Hero, ContactCTA, SectionHeading } from '@/components/shared';
import { ShowcaseGallery } from '@/components/interactive';
import { editorial } from '@/lib/editorial';
import { services } from '@/lib/data';

const additional = {
  services: {
    title: 'Our Services',
    description:
      'Design, development, and thoughtful digital solutions. Built around what your business needs.',
    image: '/images/engineering.jpg',
  },
  showcase: {
    title: 'Digital Showcase',
    description:
      'An ongoing exploration of interfaces, digital products, and different ways of seeing.',
    image: '/images/projects/forma.svg',
  },
  careers: {
    title: 'Careers',
    description: 'Good work happens when curious minds and considered perspectives come together.',
    image: '/images/collaboration.jpg',
  },
};
function CareersContent() {
  const values = [
    {
      title: 'Collaborative Problem-Solving',
      description:
        'Different perspectives make the work stronger. We make room for ideas, clear feedback, and constructive discussion.',
      icon: UsersRound,
    },
    {
      title: 'Design & Engineering, Together',
      description:
        'We value the relationship between a considered interface and the thoughtful systems that support it.',
      icon: Code2,
    },
    {
      title: 'A Learning Mindset',
      description:
        'Good questions, practical experimentation, and honest reflection help us improve the way we work.',
      icon: BookOpen,
    },
  ];
  return (
    <>
      <section className="section careers-culture">
        <div className="container">
          <SectionHeading
            center
            eyebrow="People & Perspectives"
            title="A Culture of Curiosity & Care."
          >
            We value people who ask thoughtful questions, enjoy working through difficult problems,
            and care about the details that make digital products better.
          </SectionHeading>
          <div className="careers-values">
            {values.map((value) => (
              <article key={value.title}>
                <span className="culture-icon">
                  <value.icon size={20} />
                </span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section carbon bordered careers-connect">
        <div className="container career-inquiry">
          <span className="inquiry-icon">
            <Mail size={24} />
          </span>
          <SectionHeading
            eyebrow="Introductions & Collaboration"
            title="Connect With Our Studio."
          >
            If our way of thinking resonates with you, introduce yourself. Share your perspective,
            your work, and what you would like to explore together.
          </SectionHeading>
          <a
            href="mailto:mail@agency.site?subject=Studio%20Introduction"
            className="button button-accent"
          >
            Connect With Our Studio
            <ArrowUpRight size={16} />
          </a>
          <p>
            General introductions and collaboration inquiries are welcome. This is not a listing for
            a specific role.
          </p>
        </div>
      </section>
    </>
  );
}
export function generateStaticParams() {
  return [...Object.keys(editorial), ...Object.keys(additional)].map((page) => ({ page }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  if (page in editorial) {
    const content = editorial[page as keyof typeof editorial];
    return { title: content.title, description: content.intro };
  }
  const content = additional[page as keyof typeof additional];
  return { title: content?.title || 'Page Not Found', description: content?.description };
}
export default async function ContentPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  if (page in editorial) {
    const content = editorial[page as keyof typeof editorial];
    return (
      <div className={`editorial-page ${page}`}>
        <Hero
          title={content.title}
          description={content.intro}
          image={content.heroImage}
        />
        <section className="section editorial-intro">
          <div className="container split-grid">
            <div>
              <SectionHeading
                eyebrow={content.eyebrow}
                title={content.heading}
              />
              <div className="prose">
                {content.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="editorial-image">
              <Image
                src={content.image}
                alt="Design and engineering collaboration in a modern studio"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </section>
        <section
          className={`section carbon bordered principles-section ${page === 'our-process' ? 'process-principles' : ''}`}
        >
          <div className="container">
            <SectionHeading
              center
              eyebrow={page === 'our-process' ? 'The Process' : 'Our Principles'}
              title={content.principleHeading}
            />
            <div className="principles-grid">
              {content.principles.map(([title, description], index) => (
                <article key={title}>
                  <span className="principle-number">0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container split-grid reversed">
            <div className="landscape-image">
              <Image
                src={content.closingImage}
                alt="A considered creative workspace"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <div>
              <SectionHeading
                eyebrow={content.closingEyebrow}
                title={content.closingTitle}
              />
              <p className="body-copy">{content.closingCopy}</p>
              <Link
                href="/contact"
                className="button button-outline"
              >
                Start a Conversation
              </Link>
            </div>
          </div>
        </section>
        <ContactCTA />
      </div>
    );
  }
  const content = additional[page as keyof typeof additional];
  if (!content) notFound();
  return (
    <>
      <Hero
        title={content.title}
        description={content.description}
        image={content.image}
      />
      {page === 'showcase' && <ShowcaseGallery />}
      {page === 'services' && (
        <>
          <section className="section">
            <div className="container">
              <SectionHeading
                center
                eyebrow="Made for your next chapter"
                title="Considered Solutions. Clear Intentions."
              >
                From a focused company website to a connected business platform, we shape the work
                around your goals.
              </SectionHeading>
              <div className="services-grid">
                {services.map((service, index) => (
                  <article
                    className="service-card"
                    key={service.title}
                  >
                    <Link
                      href={`/contact?type=${encodeURIComponent(service.type)}`}
                      className="service-card-image"
                    >
                      <Image
                        src={service.image}
                        alt={`${service.title} interface concept`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                      <span className="service-index">0{index + 1}</span>
                    </Link>
                    <p className="eyebrow">{service.category}</p>
                    <h2>{service.title}</h2>
                    <p>{service.description}</p>
                    <div className="service-details">{service.details}</div>
                    <Link
                      href={`/contact?type=${encodeURIComponent(service.type)}`}
                      className="text-link"
                    >
                      Discuss Your Project
                      <ArrowUpRight size={15} />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
          <section className="section carbon bordered service-custom">
            <div className="container split-grid">
              <h2>Something More Specific in Mind?</h2>
              <div>
                <p className="body-copy">
                  API integrations, business process automation, or a custom digital workflow. Tell
                  us what you need to make possible, and we&apos;ll explore the right approach
                  together.
                </p>
                <Link
                  className="button button-outline"
                  href="/contact?type=Custom%20Software"
                >
                  Let&apos;s Discuss It
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
      {page === 'careers' && <CareersContent />}
      <ContactCTA />
    </>
  );
}
