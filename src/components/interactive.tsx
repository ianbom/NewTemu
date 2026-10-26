'use client';
import { useI18n } from '@/components/i18n-provider';
import { ProjectCard } from '@/components/shared';
import { projects } from '@/lib/data';
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
  const { t } = useI18n();
  const industries = [
    {
      title: 'Corporate & Business',
      image: '/images/industries/atelier.webp',
    },
    {
      title: 'E-Commerce & Retail',
      image: '/images/industries/vyren.webp',
    },
    {
      title: 'Education & Learning',
      image: '/images/industries/galerya.webp',
    },
    {
      title: 'Healthcare & Services',
      image: '/images/industries/noirel.webp',
    },
    {
      title: 'Technology & Startups',
      image: '/images/industries/north.webp',
    },
  ];
  const [selected, setSelected] = useState(0);
  const industry = industries[selected];
  return (
    <div className="industry-explorer">
      <div
        className="industry-visual"
        aria-live="polite"
      >
        <Image
          src={industry.image}
          alt={t('{0} website preview', t(industry.title))}
          fill
          sizes="(min-width: 1072px) 1024px, 100vw"
        />
      </div>
      <div
        className="industry-navigation"
        aria-label={t('Explore industries')}
      >
        <button
          type="button"
          aria-label={t('Previous image')}
          onClick={() => setSelected((selected + industries.length - 1) % industries.length)}
        >
          <ArrowLeft
            size={19}
            aria-hidden="true"
          />
        </button>
        <button
          type="button"
          aria-label={t('Next image')}
          onClick={() => setSelected((selected + 1) % industries.length)}
        >
          <ArrowRight
            size={19}
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}
export function PortfolioGallery() {
  const { t } = useI18n();
  return (
    <section className="section">
      <div className="container">
        <h2 className="portfolio-heading">
          {t('Websites Built Around Your Business.')}
        </h2>
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
                <div className="tile-copy">
                  <span>{project.name}</span>
                  <small>{t(project.category)}</small>
                  <p className="tile-description">
                    {t(project.description)}
                  </p>
                </div>
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
