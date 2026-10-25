import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { navigation, services, type Project } from '@/lib/data';
import { Wordmark } from '@/components/header';

export function Hero({
  title,
  description,
  image = '/images/studio-architecture.jpg',
  eyebrow,
  contact = false,
  children,
}: {
  title: React.ReactNode;
  description: string;
  image?: string;
  eyebrow?: string;
  contact?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className={`hero ${contact ? 'hero-contact' : ''}`}>
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-image"
      />
      <div className="hero-shade" />
      <div className="hero-content container">
        {eyebrow && <p className="eyebrow hero-eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        <p className="hero-description">{description}</p>
        {children}
      </div>
    </section>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  children,
  center = false,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`section-heading ${center ? 'center' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children && <p className="section-description">{children}</p>}
    </div>
  );
}
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="project-card"
    >
      <div className="project-card-image">
        <Image
          src={project.image}
          alt={`${project.name} digital interface concept`}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
        />
        <span className="image-link-mark">
          <ArrowUpRight size={22} />
        </span>
      </div>
      <div className="project-card-meta">
        <span>{project.category}</span>
        <span>Studio concept</span>
      </div>
      <h3>
        {project.name}
        <ArrowUpRight size={17} />
      </h3>
      <p>{project.description}</p>
    </Link>
  );
}
export function ContactCTA() {
  return (
    <section className="contact-cta">
      <Image
        src="/images/creative-workspace.jpg"
        alt=""
        fill
        sizes="100vw"
        className="cta-image"
      />
      <div className="cta-shade" />
      <div className="container">
        <p className="eyebrow">The next conversation</p>
        <h2>Have Something Great in Mind?</h2>
        <p>
          Tell us about your idea. We&apos;ll help turn it into a thoughtfully designed, carefully
          developed digital experience.
        </p>
        <Link
          href="/contact"
          className="button button-light"
        >
          Let&apos;s Talk
        </Link>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link
              href="/"
              aria-label="KIVORA STUDIO home"
            >
              <Wordmark />
            </Link>
            <p>
              Crafting Digital Experiences
              <br />
              That Matter.
            </p>
            <p>
              Thoughtful design. Purposeful technology.
              <br />A digital studio based in Surabaya.
            </p>
          </div>
          <div>
            <h2>Explore</h2>
            {navigation.slice(0, 4).map((item) => (
              <Link
                key={item.href}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div>
            <h2>The Studio</h2>
            {navigation.slice(4).map((item) => (
              <Link
                key={item.href}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact">Contact Us</Link>
          </div>
          <div className="footer-contact">
            <h2>Get In Touch</h2>
            <a href="mailto:mail@agency.site">
              <Mail size={14} />
              mail@agency.site
            </a>
            <a href="tel:+6285151994724">
              <Phone size={14} />
              +62 851-5199-4724
            </a>
            <p>
              <MapPin size={14} />
              Surabaya, East Java,
              <br />
              Indonesia
            </p>
          </div>
          <div className="footer-services">
            <h2>Built Around Your Needs</h2>
            <p>Websites, applications, and meaningful digital experiences.</p>
            <a
              href="https://wa.me/6285151994724"
              target="_blank"
              rel="noreferrer"
              className="button button-outline"
            >
              Direct WhatsApp Inquiry
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} KIVORA STUDIO. All rights reserved.</span>
          <div>
            {[services[0], services[3], services[4]].map((service) => (
              <Link
                href={`/contact?type=${encodeURIComponent(service.type)}`}
                key={service.title}
              >
                {service.category}
              </Link>
            ))}
          </div>
          <span>Design with intention.</span>
        </div>
      </div>
    </footer>
  );
}
