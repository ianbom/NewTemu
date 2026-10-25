import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { projects } from '@/lib/data';
import { ContactCTA, ProjectCard, SectionHeading } from '@/components/shared';
import { ProjectGallery } from '@/components/interactive';
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return {
    title: project ? `${project.name} - ${project.category}` : 'Project Not Found',
    description: project?.description,
  };
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
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
          aria-label="Breadcrumb"
          className="breadcrumbs"
        >
          <Link href="/">Home</Link>
          <ChevronRight size={12} />
          <Link href="/work">Selected Work</Link>
          <ChevronRight size={12} />
          <span aria-current="page">{project.name}</span>
        </nav>
        <div className="project-detail-grid">
          <ProjectGallery project={project} />
          <div className="project-information">
            <p className="eyebrow">{project.category} / Studio concept</p>
            <h1>{project.name}</h1>
            <p className="project-headline">{project.headline}</p>
            <p className="body-copy">{project.overview}</p>
            <dl className="project-specifications">
              <div>
                <dt>Discipline</dt>
                <dd>{project.category}</dd>
              </div>
              <div>
                <dt>Industry</dt>
                <dd>{project.sector}</dd>
              </div>
              <div>
                <dt>Project type</dt>
                <dd>Original studio concept</dd>
              </div>
              <div>
                <dt>
                  {project.category === 'UI/UX Design' ? 'Design toolkit' : 'Proposed technology'}
                </dt>
                <dd>{project.stack.join(' / ')}</dd>
              </div>
            </dl>
            <Link
              className="button button-accent"
              href={`/contact?type=${encodeURIComponent(type)}&project=${project.name}`}
            >
              Start a Similar Project
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="project-story">
          <div>
            <SectionHeading
              eyebrow="The Direction"
              title="A Considered Point of View."
            />
            <p className="body-copy">{project.direction}</p>
          </div>
          <div>
            <p className="eyebrow">Experience Highlights</p>
            <ul>
              {project.features.map((feature, index) => (
                <li key={feature}>
                  <span>0{index + 1}</span>
                  {feature}
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
            eyebrow="Keep Exploring"
            title="More From the Studio."
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
