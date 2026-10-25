import type { Metadata } from 'next';
import { Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { Hero, ContactCTA } from '@/components/shared';
import { ContactForm } from '@/components/interactive';
export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tell KIVORA STUDIO about your website, web application, or custom digital project. Based in Surabaya, East Java, Indonesia.',
};
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; project?: string }>;
}) {
  const query = await searchParams;
  return (
    <>
      <Hero
        contact
        title="Contact Us"
        description="A new idea, a complex challenge, or a digital experience ready for its next chapter. It starts with a conversation."
        image="/images/studio-architecture.jpg"
      />
      <section className="section carbon">
        <div className="container contact-layout">
          <div className="contact-information">
            <p className="eyebrow">Find the Studio</p>
            <h2>Surabaya, Indonesia.</h2>
            <p>
              Thoughtful conversations.
              <br />
              Considered digital solutions.
            </p>
            <div className="contact-channels">
              <div>
                <MapPin size={20} />
                <div>
                  <h3>Our Location</h3>
                  <p>
                    Surabaya, East Java,
                    <br />
                    Indonesia
                  </p>
                </div>
              </div>
              <div>
                <Mail size={20} />
                <div>
                  <h3>Email</h3>
                  <a href="mailto:mail@agency.site">mail@agency.site</a>
                </div>
              </div>
              <div>
                <Phone size={20} />
                <div>
                  <h3>Phone / WhatsApp</h3>
                  <a href="tel:+6285151994724">+62 851-5199-4724</a>
                </div>
              </div>
            </div>
            <a
              className="text-link"
              href="https://wa.me/6285151994724"
              target="_blank"
              rel="noreferrer"
            >
              Start a WhatsApp Conversation
              <ArrowUpRight size={16} />
            </a>
            <div className="location-note">
              <span className="eyebrow">Based in East Java</span>
              <p>
                Design and technology,
                <br />
                with a considered perspective.
              </p>
              <span>07&deg;15&apos; S &nbsp; 112&deg;45&apos; E</span>
            </div>
          </div>
          <ContactForm
            initialType={typeof query.type === 'string' ? query.type : ''}
            project={typeof query.project === 'string' ? query.project.slice(0, 120) : ''}
          />
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
