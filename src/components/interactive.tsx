'use client';
import { useI18n } from '@/components/i18n-provider';
import { ProjectCard } from '@/components/shared';
import { projects } from '@/lib/data';
import { localizedImage } from '@/lib/i18n';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
export function FeaturedProjects() {
  const { t } = useI18n();
  const [offset, setOffset] = useState(0);
  const visible = Array.from(
    { length: 4 },
    (_, index) => projects[(offset + index) % projects.length],
  );
  return (
    <div className="featured-projects">
      <button
        className="carousel-arrow previous"
        aria-label={t('Previous projects')}
        onClick={() => setOffset((offset + projects.length - 1) % projects.length)}
      >
        <ArrowLeft size={19} />
      </button>
      <div
        className="featured-grid"
        aria-live="polite"
      >
        {visible.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
          />
        ))}
      </div>
      <button
        className="carousel-arrow next"
        aria-label={t('Next projects')}
        onClick={() => setOffset((offset + 1) % projects.length)}
      >
        <ArrowRight size={19} />
      </button>
    </div>
  );
}
export function IndustryExplorer() {
  const { locale, t } = useI18n();
  const industries = [
    {
      title: 'Corporate & Business',
      image: '/images/projects/norden.svg',
      description: 'Company profiles, service pages, and inquiry channels in one website.',
    },
    {
      title: 'E-Commerce & Retail',
      image: '/images/projects/auren.svg',
      description: 'Online stores with product catalogs and clear shopping journeys.',
    },
    {
      title: 'Education & Learning',
      image: '/images/projects/sora.svg',
      description: 'Course websites and web applications for organizing learning materials.',
    },
    {
      title: 'Healthcare & Services',
      image: '/images/projects/lumio.svg',
      description: 'Service information and appointment interfaces that are easy to navigate.',
    },
    {
      title: 'Technology & Startups',
      image: '/images/projects/atlas.svg',
      description: 'Product websites and web applications shaped around an agreed scope.',
    },
  ];
  const [selected, setSelected] = useState(0);
  const industry = industries[selected];
  return (
    <div className="industry-explorer">
      <div className="industry-topline">
        <span>
          <span className="status-dot" />
          {t('Website features for your business')}
        </span>
        <span>{t('Different requirements. A clear development scope.')}</span>
      </div>
      <div className="industry-visual">
        <Image
          src={localizedImage(industry.image, locale)}
          alt={t('{0} interface illustration', t(industry.title))}
          fill
          sizes="(min-width: 1024px) 1000px, 100vw"
        />
        <div className="industry-label">
          <span className="eyebrow">{t(industry.title)}</span>
          <p>{t(industry.description)}</p>
        </div>
      </div>
      <div
        className="industry-controls"
        aria-label={t('Explore industries')}
      >
        {industries.map((item, index) => (
          <button
            aria-pressed={selected === index}
            key={item.title}
            onClick={() => setSelected(index)}
          >
            {t(item.title)}
          </button>
        ))}
      </div>
    </div>
  );
}
export function PortfolioGallery() {
  const { t } = useI18n();
  return (
    <section className="section">
      <div className="container">
        <p className="portfolio-introduction">
          {t('Websites for a range of business needs.')}
        </p>
        <div className="showcase-grid">
          {projects.map((project) => (
            <a
              key={project.slug}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="showcase-tile"
              aria-label={t('{0} website (opens in a new tab)', project.name)}
            >
              <div className="portfolio-preview">
                <Image
                  src={project.image}
                  alt={t('{0}: {1}', project.name, t(project.description))}
                  fill
                  sizes="(max-width: 1023px) 50vw, 33vw"
                />
              </div>
              <div className="tile-caption">
                <span>
                  {project.name}
                  <small>{t(project.category)}</small>
                </span>
                <ArrowUpRight
                  size={22}
                  aria-hidden="true"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
