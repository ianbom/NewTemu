import type { Metadata } from 'next';
import { Hero, ContactCTA } from '@/components/shared';
import { Portfolio } from '@/components/interactive';
export const metadata: Metadata = {
  title: 'Selected Work',
  description:
    'Original KIVORA STUDIO concepts in websites, web applications, e-commerce, and UI/UX design.',
};
export default function WorkPage() {
  return (
    <>
      <Hero
        title="Selected Work"
        description="Different ideas. Thoughtfully brought to life. Explore our original studio concepts in design and technology."
        image="/images/projects/auren.svg"
      />
      <Portfolio />
      <ContactCTA />
    </>
  );
}
