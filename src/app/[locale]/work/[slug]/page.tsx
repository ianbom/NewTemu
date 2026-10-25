import { ProjectGallery } from '@/components/interactive';
import Link from '@/components/localized-link';
import { ContactCTA, ProjectCard, SectionHeading } from '@/components/shared';
import { projects } from '@/lib/data';
import { getTranslator } from '@/lib/i18n';
import { getLocale } from '@/lib/locale-server';
import { pageMetadata } from '@/lib/metadata';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { notFound } from 'next/navigation';
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const locale = await getLocale(params);
  const t = getTranslator(locale);
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const related = projects
    .filter((item) => item.slug !== slug)
    .sort(
      (first, second) =>
        Number(second.category === project.category) - Number(first.category === project.category),
    )
    .slice(0, 4);
  const type =
    project.category === 'E-Commerce'
      ? 'E-Commerce Website'
      : project.category === 'Web Applications'
        ? 'Web Application'
        : project.category === 'UI/UX Design'
          ? 'UI/UX Design'
          : 'Company Profile Website';
  return (
    <>
      <div className="container project-detail">
        <nav
          aria-label={t('Breadcrumb')}
          className="breadcrumbs"
        >
          <Link href="/">{t('Home')}</Link>
          <ChevronRight size={12} />
          <Link href="/work">{t('Selected Work')}</Link>
          <ChevronRight size={12} />
          <span aria-current="page">{project.name}</span>
        </nav>
        <div className="project-detail-grid">
          <ProjectGallery project={project} />
          <div className="project-information">
            <p className="eyebrow">
              {t(project.category)}
              {t(' / Studio concept')}
            </p>
            <h1>{project.name}</h1>
            <p className="project-headline">{t(project.headline)}</p>
            <p className="body-copy">{t(project.overview)}</p>
            <dl className="project-specifications">
              <div>
                <dt>{t('Discipline')}</dt>
                <dd>{t(project.category)}</dd>
              </div>
              <div>
                <dt>{t('Industry')}</dt>
                <dd>{t(project.sector)}</dd>
              </div>
              <div>
                <dt>{t('Project type')}</dt>
                <dd>{t('Original studio concept')}</dd>
              </div>
              <div>
                <dt>
                  {t(
                    project.category === 'UI/UX Design' ? 'Design toolkit' : 'Proposed technology',
                  )}
                </dt>
                <dd>{project.stack.map((value) => t(value)).join(' / ')}</dd>
              </div>
            </dl>
            <Link
              className="button button-accent"
              href={`/contact?type=${encodeURIComponent(type)}&project=${project.name}`}
            >
              {t('Start a Similar Project')}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="project-story">
          <div>
            <SectionHeading
              eyebrow={t('The Direction')}
              title={t('A Considered Point of View.')}
            />
            <p className="body-copy">{t(project.direction)}</p>
          </div>
          <div>
            <p className="eyebrow">{t('Experience Highlights')}</p>
            <ul>
              {project.features.map((feature, index) => (
                <li key={feature}>
                  <span>0{index + 1}</span>
                  {t(feature)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <section className="section carbon bordered">
        <div className="container">
          <SectionHeading
            center
            eyebrow={t('Keep Exploring')}
            title={t('More From the Studio.')}
          />
          <div className="featured-grid">
            {related.map((item) => (
              <ProjectCard
                key={item.slug}
                project={item}
              />
            ))}
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale(params);
  const t = getTranslator(locale);
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return pageMetadata(
    locale,
    '/work/' + slug,
    project.name + ' - ' + t(project.category),
    project.description,
  );
}
