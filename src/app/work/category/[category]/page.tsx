import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categories, categorySlug, projects } from '@/lib/data';
import { Hero, ContactCTA } from '@/components/shared';
import { Portfolio } from '@/components/interactive';
export function generateStaticParams() {
  return categories.slice(1).map((category) => ({ category: categorySlug(category) }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  return {
    title: categories.find((item) => categorySlug(item) === category) || 'Project Category',
  };
}
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const selected = categories.slice(1).find((item) => categorySlug(item) === category);
  if (!selected) notFound();
  const project = projects.find((item) => item.category === selected)!;
  return (
    <>
      <Hero
        title={selected}
        description="A considered collection of original studio concepts. Explore the details, ideas, and interfaces behind the work."
        image={project.image}
      />
      <Portfolio initialCategory={selected} />
      <ContactCTA />
    </>
  );
}
