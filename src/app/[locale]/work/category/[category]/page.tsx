import { Portfolio } from '@/components/interactive';
import { ContactCTA, Hero } from '@/components/shared';
import { categories, categorySlug, projects } from '@/lib/data';
import { getTranslator } from '@/lib/i18n';
import { getLocale } from '@/lib/locale-server';
import { pageMetadata } from '@/lib/metadata';
import { notFound } from 'next/navigation';
export function generateStaticParams() {
  return categories.slice(1).map((category) => ({ category: categorySlug(category) }));
}
export default async function CategoryPage({
  params,
}: {
  params: Promise<{
    locale: string;
    category: string;
  }>;
}) {
  const { category } = await params;
  const locale = await getLocale(params);
  const t = getTranslator(locale);
  const selected = categories.slice(1).find((item) => categorySlug(item) === category);
  if (!selected) notFound();
  const project = projects.find((item) => item.category === selected)!;
  return (
    <>
      <Hero
        title={t(selected)}
        description={t(
          'A considered collection of original studio concepts. Explore the details, ideas, and interfaces behind the work.',
        )}
        image={project.image}
      />
      <Portfolio initialCategory={selected} />
      <ContactCTA />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { category } = await params;
  const locale = await getLocale(params);
  const selected = categories.slice(1).find((item) => categorySlug(item) === category);
  if (!selected) notFound();
  return pageMetadata(
    locale,
    '/work/category/' + category,
    selected,
    'A considered collection of original studio concepts. Explore the details, ideas, and interfaces behind the work.',
  );
}
