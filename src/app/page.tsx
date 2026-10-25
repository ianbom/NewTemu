import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Compass, Code2 } from 'lucide-react';
import { ContactCTA, Hero, SectionHeading } from '@/components/shared';
import { FeaturedProjects, InteractiveShowcase, IndustryExplorer } from '@/components/interactive';
import { categorySlug, expertise } from '@/lib/data';

export default function Home() {
  return (
    <div className="home-page">
      <Hero
        title={
          <>
            We Craft Digital Experiences
            <br className="desktop-break" /> for What&apos;s Next.
          </>
        }
        description="From distinctive websites to scalable digital platforms, we bring design, technology, and strategy together to create meaningful digital experiences."
      >
        <Link
          className="button button-light"
          href="/work"
        >
          Explore Our Work
        </Link>
      </Hero>
      <section className="section">
        <div className="container split-grid">
          <div>
            <SectionHeading
              eyebrow="About KIVORA STUDIO"
              title="More Than Just a Digital Agency."
            />
            <div className="prose">
              <p>
                We believe exceptional digital products are built at the intersection of thoughtful
                design, purposeful technology, and deep understanding of the people who use them.
              </p>
              <p>
                Based in Surabaya, we bring a considered perspective to websites, applications, and
                custom digital solutions. Every project starts with a conversation and an
                understanding of what your business actually needs.
              </p>
            </div>
            <div className="about-highlights">
              <div>
                <Compass size={21} />
                <div>
                  <h3>Design-Led Thinking</h3>
                  <p>Clear experiences, shaped around real people.</p>
                </div>
              </div>
              <div>
                <Code2 size={21} />
                <div>
                  <h3>Purposeful Engineering</h3>
                  <p>Careful development, built for the long term.</p>
                </div>
              </div>
            </div>
            <Link
              href="/about-us"
              className="button button-outline"
            >
              Read Our Story
            </Link>
          </div>
          <div className="portrait-image">
            <Image
              src="/images/creative-workspace.jpg"
              alt="An architectural workspace filled with natural light"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>
      <section className="section expertise-section">
        <div className="container">
          <SectionHeading
            center
            eyebrow="Our Expertise"
            title="Ideas, Made Digital."
          />
          <div className="expertise-grid">
            {expertise.map((item) => (
              <Link
                className="expertise-card"
                href={`/work/category/${categorySlug(item.category)}`}
                key={item.title}
              >
                <Image
                  src={item.image}
                  alt={`${item.title} original interface composition`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div className="expertise-shade" />
                <div className="expertise-copy">
                  <h3>{item.title}</h3>
                  <p>{item.items.join(' / ')}</p>
                  <span>
                    Explore our work
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section bordered">
        <div className="container">
          <SectionHeading
            center
            eyebrow="Selected Work"
            title="A Few Different Perspectives."
          >
            Original studio concepts exploring the space between thoughtful design and purposeful
            technology.
          </SectionHeading>
          <FeaturedProjects />
          <div className="center-action">
            <Link
              href="/work"
              className="button button-outline"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container service-split">
          <div>
            <SectionHeading
              eyebrow="What We Do"
              title="Digital Craft, Built Around You."
            />
            <div className="numbered-services">
              {[
                [
                  'Website Design & Development',
                  'Distinctive websites that bring your identity into focus, with considered content, responsive layouts, and a reliable technical foundation.',
                ],
                [
                  'Custom Web Applications',
                  'Purpose-built platforms, dashboards, and connected systems that support the way your business actually works.',
                ],
                [
                  'Digital Strategy & UI/UX',
                  'From understanding the challenge to refining the smallest interaction, we design for clarity, usability, and purpose.',
                ],
              ].map(([title, description], index) => (
                <Link
                  href="/services"
                  key={title}
                >
                  <span className="service-number">0{index + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="portrait-image">
            <Image
              src="/images/design-process.jpg"
              alt="A collaborative design session with interface sketches"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
        </div>
      </section>
      <section className="section carbon bordered">
        <div className="container">
          <SectionHeading
            center
            eyebrow="Industries & Capabilities"
            title="Building Digital Solutions for Ambitious Businesses."
          >
            We work across industries to create digital platforms that combine intuitive
            experiences, reliable engineering, and thoughtful business solutions.
          </SectionHeading>
          <IndustryExplorer />
        </div>
      </section>
      <InteractiveShowcase />
      <ContactCTA />
    </div>
  );
}
