'use client';
import { useI18n } from '@/components/i18n-provider';
import Link from '@/components/localized-link';
import { ProjectCard } from '@/components/shared';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { projects, type Project } from '@/lib/data';
import { localizedImage } from '@/lib/i18n';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
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
const showcaseProjects = [projects[3], projects[1], projects[0], projects[2]];
export function IndustryExplorer() {
  const { locale, t } = useI18n();
  const industries = [
    {
      title: 'Corporate & Business',
      project: projects[1],
      description: 'Clear information, connected workflows, and a purposeful digital presence.',
    },
    {
      title: 'E-Commerce & Retail',
      project: projects[0],
      description: 'Considered storefronts that bring products and people together.',
    },
    {
      title: 'Education & Learning',
      project: projects[5],
      description: 'Focused platforms that make room for better learning experiences.',
    },
    {
      title: 'Healthcare & Services',
      project: projects[2],
      description: 'Thoughtful interfaces that make complex services easier to navigate.',
    },
    {
      title: 'Technology & Startups',
      project: projects[8],
      description: 'Flexible foundations for ideas ready to take their next step.',
    },
  ];
  const [selected, setSelected] = useState(0);
  const industry = industries[selected];
  return (
    <div className="industry-explorer">
      <div className="industry-topline">
        <span>
          <span className="status-dot" />
          {t('Design meets business')}
        </span>
        <span>{t('One considered approach. Different possibilities.')}</span>
      </div>
      <div className="industry-visual">
        <Image
          src={localizedImage(industry.project.image, locale)}
          alt={t('{0} {1} interface concept', industry.project.name, t(industry.title))}
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
export function InteractiveShowcase() {
  const { locale, t } = useI18n();
  const [selected, setSelected] = useState(0);
  const project = showcaseProjects[selected];
  return (
    <section className="interactive-showcase">
      <Image
        src={localizedImage(project.image, locale)}
        alt={t('{0} digital experience', project.name)}
        fill
        sizes="100vw"
        className="showcase-background"
      />
      <div className="showcase-shade" />
      <div className="container showcase-content">
        <p className="eyebrow">{t('A closer look')}</p>
        <h2>{t('Explore Our Digital Experiences.')}</h2>
        <p>{t('Different challenges. Distinct perspectives. One considered approach.')}</p>
        <div
          className="showcase-tabs"
          role="tablist"
          aria-label={t('Project categories')}
        >
          {['Websites', 'Web Applications', 'E-Commerce', 'UI/UX'].map((label, index) => (
            <button
              key={label}
              id={`showcase-tab-${index}`}
              role="tab"
              aria-selected={selected === index}
              aria-controls="showcase-panel"
              tabIndex={selected === index ? 0 : -1}
              onClick={() => setSelected(index)}
              onKeyDown={(event) => {
                const next =
                  event.key === 'ArrowRight'
                    ? (index + 1) % 4
                    : event.key === 'ArrowLeft'
                      ? (index + 3) % 4
                      : event.key === 'Home'
                        ? 0
                        : event.key === 'End'
                          ? 3
                          : -1;
                if (next >= 0) {
                  event.preventDefault();
                  setSelected(next);
                  document.getElementById(`showcase-tab-${next}`)?.focus();
                }
              }}
            >
              {t(label)}
            </button>
          ))}
        </div>
        <div
          role="tabpanel"
          id="showcase-panel"
          aria-labelledby={`showcase-tab-${selected}`}
          className="showcase-panel"
        >
          <div>
            <span className="eyebrow">
              {t('Studio concept / ')}
              {t(project.category)}
            </span>
            <h3>
              {project.name} &mdash; {t(project.sector)}
            </h3>
            <p>{t(project.description)}</p>
          </div>
          <Link
            href="/portfolio"
            aria-label={t('Explore {0}', project.name)}
          >
            <ArrowUpRight size={28} />
          </Link>
        </div>
      </div>
    </section>
  );
}
export function PortfolioGallery() {
  const { locale, t } = useI18n();
  const [category, setCategory] = useState('All Work');
  const [selected, setSelected] = useState<Project | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const filtered = projects.filter(
    (project) =>
      category === 'All Work' ||
      (category === 'Website Design'
        ? ['Websites', 'E-Commerce'].includes(project.category)
        : ['Web Applications', 'UI/UX Design'].includes(project.category)),
  );
  const move = (direction: number) => {
    const index = filtered.findIndex((project) => project.slug === selected?.slug);
    setSelected(filtered[(index + direction + filtered.length) % filtered.length]);
  };
  return (
    <section className="section">
      <div className="container">
        <div
          className="gallery-filters"
          aria-label={t('Portfolio categories')}
        >
          {['All Work', 'Website Design', 'Web Applications'].map((item) => (
            <button
              key={item}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {t(item)}
            </button>
          ))}
        </div>
        <p
          className="gallery-count"
          aria-live="polite"
        >
          {filtered.length}
          {t(' original studio explorations')}
        </p>
        <div className="showcase-grid">
          {filtered.map((project, index) => (
            <button
              key={project.slug}
              className={`showcase-tile ${index % 5 === 1 ? 'tall' : ''}`}
              onClick={(event) => {
                opener.current = event.currentTarget;
                setSelected(project);
              }}
              aria-label={t('View {0}', project.name)}
            >
              <Image
                src={localizedImage(project.image, locale)}
                alt={t('{0}: {1}', project.name, t(project.description))}
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              />
              <span className="tile-caption">
                <span>
                  {project.name}
                  <small>
                    {t(project.category)}
                    {t(' / Studio concept')}
                  </small>
                </span>
                <ArrowUpRight size={22} />
              </span>
            </button>
          ))}
        </div>
        <Dialog
          open={selected !== null}
          onOpenChange={(open) => {
            if (!open) setSelected(null);
          }}
        >
          <DialogContent
            className="image-dialog"
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              opener.current?.focus();
            }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') move(-1);
              if (event.key === 'ArrowRight') move(1);
            }}
          >
            <DialogTitle>
              {selected?.name} / {t(selected?.category)}
            </DialogTitle>
            <DialogDescription>{t(selected?.description)}</DialogDescription>
            {selected && (
              <>
                <div className="lightbox-image">
                  <Image
                    src={localizedImage(selected.image, locale)}
                    alt={t('{0} original interface concept', selected.name)}
                    fill
                    sizes="90vw"
                  />
                </div>
                <div className="lightbox-controls">
                  <button
                    className="icon-button"
                    aria-label={t('Previous project')}
                    onClick={() => move(-1)}
                  >
                    <ArrowLeft />
                  </button>
                  <button
                    className="icon-button"
                    aria-label={t('Next project')}
                    onClick={() => move(1)}
                  >
                    <ArrowRight />
                  </button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
