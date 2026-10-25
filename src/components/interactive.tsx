'use client';
import { useI18n } from '@/components/i18n-provider';
import Link from '@/components/localized-link';
import { ProjectCard } from '@/components/shared';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { contactLinks, filterProjects, paginate } from '@/lib/behavior';
import { categories, projects, projectTypes, type Project } from '@/lib/data';
import { localizedImage } from '@/lib/i18n';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Mail,
  MessageCircle,
  Search,
  ZoomIn,
} from 'lucide-react';
import Image from 'next/image';
import { useRef, useState, type FormEvent } from 'react';
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
            href={`/work/${project.slug}`}
            aria-label={t('Explore {0}', project.name)}
          >
            <ArrowUpRight size={28} />
          </Link>
        </div>
      </div>
    </section>
  );
}
export function Portfolio({ initialCategory = 'All Projects' }: { initialCategory?: string }) {
  const { locale, t } = useI18n();
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const filtered = filterProjects(projects, category, query, locale);
  const result = paginate(filtered, page, 6);
  return (
    <section className="section">
      <div className="container portfolio-layout">
        <aside className="project-sidebar">
          <label className="search-field">
            <span className="sr-only">{t('Search projects')}</span>
            <input
              type="search"
              value={query}
              placeholder={t('Search projects...')}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
            />
            <Search size={16} />
          </label>
          <div className="sidebar-heading">
            <h2>{t('Project Categories')}</h2>
            <button
              onClick={() => {
                setCategory('All Projects');
                setQuery('');
                setPage(1);
              }}
            >
              {t('View All')}
            </button>
          </div>
          <div className="category-list">
            {categories.slice(1).map((item) => (
              <div
                className="category-group"
                key={item}
              >
                <button
                  aria-pressed={category === item}
                  onClick={() => {
                    setCategory(item);
                    setQuery('');
                    setPage(1);
                  }}
                >
                  {t(item)}
                  <span>
                    {projects
                      .filter((project) => project.category === item)
                      .length.toString()
                      .padStart(2, '0')}
                  </span>
                </button>
                <div>
                  {projects
                    .filter((project) => project.category === item)
                    .map((project) => (
                      <button
                        className={query === project.name ? 'active' : ''}
                        key={project.slug}
                        onClick={() => {
                          setCategory(item);
                          setQuery(project.name);
                          setPage(1);
                        }}
                      >
                        {project.name}
                        <span>{t(project.sector)}</span>
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
        <div>
          <div
            className="results-heading"
            aria-live="polite"
          >
            <span>{t(category)}</span>
            <span>
              {filtered.length} {t(filtered.length === 1 ? 'project' : 'projects')}
            </span>
          </div>
          {result.items.length ? (
            <div className="portfolio-grid">
              {result.items.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>{t('No projects found.')}</h2>
              <p>{t('Try another term or explore all our work.')}</p>
              <button
                className="button button-outline"
                onClick={() => {
                  setQuery('');
                  setCategory('All Projects');
                  setPage(1);
                }}
              >
                {t('Reset Filters')}
              </button>
            </div>
          )}
          <nav
            className="pagination"
            aria-label={t('Portfolio pagination')}
          >
            <button
              disabled={result.page === 1}
              aria-label={t('Previous page')}
              onClick={() => setPage(result.page - 1)}
            >
              <ArrowLeft size={16} />
            </button>
            {Array.from({ length: result.totalPages }, (_, index) => (
              <button
                aria-current={result.page === index + 1 ? 'page' : undefined}
                key={index}
                onClick={() => {
                  setPage(index + 1);
                  document
                    .querySelector('.results-heading')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
              >
                {index + 1}
              </button>
            ))}
            <button
              disabled={result.page === result.totalPages}
              aria-label={t('Next page')}
              onClick={() => setPage(result.page + 1)}
            >
              <ArrowRight size={16} />
            </button>
          </nav>
        </div>
      </div>
    </section>
  );
}
export function ProjectGallery({ project }: { project: Project }) {
  const { locale, t } = useI18n();
  const [selected, setSelected] = useState(0);
  const move = (direction: number) =>
    setSelected((selected + direction + project.gallery.length) % project.gallery.length);
  return (
    <div className="project-gallery">
      <div className="gallery-main">
        <Dialog>
          <DialogTrigger asChild>
            <button
              className="gallery-expand"
              aria-label={t('Enlarge {0} image {1}', project.name, selected + 1)}
            >
              <Image
                src={localizedImage(project.gallery[selected], locale)}
                alt={t('{0} interface view {1}', project.name, selected + 1)}
                fill
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
              <ZoomIn
                className="zoom-icon"
                size={23}
              />
            </button>
          </DialogTrigger>
          <DialogContent className="image-dialog">
            <DialogTitle>
              {project.name}
              {t(' / Interface study ')}
              {selected + 1}
            </DialogTitle>
            <DialogDescription>{t('Original KIVORA STUDIO concept.')}</DialogDescription>
            <div className="lightbox-image">
              <Image
                src={localizedImage(project.gallery[selected], locale)}
                alt={t('{0} enlarged interface view', project.name)}
                fill
                sizes="90vw"
              />
            </div>
            <div className="lightbox-controls">
              <button
                className="button button-outline"
                onClick={() => move(-1)}
              >
                <ArrowLeft size={16} />
                {t('Previous')}
              </button>
              <span>
                {selected + 1} / {project.gallery.length}
              </span>
              <button
                className="button button-outline"
                onClick={() => move(1)}
              >
                {t('Next')}
                <ArrowRight size={16} />
              </button>
            </div>
          </DialogContent>
        </Dialog>
        <button
          className="gallery-arrow left"
          onClick={() => move(-1)}
          aria-label={t('Previous image')}
        >
          <ArrowLeft size={18} />
        </button>
        <button
          className="gallery-arrow right"
          onClick={() => move(1)}
          aria-label={t('Next image')}
        >
          <ArrowRight size={18} />
        </button>
      </div>
      <div className="gallery-thumbnails">
        {project.gallery.map((image, index) => (
          <button
            className={selected === index ? 'selected' : ''}
            aria-label={t('Show image {0}', index + 1)}
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
            key={image}
          >
            <Image
              src={localizedImage(image, locale)}
              alt={t('{0} thumbnail {1}', project.name, index + 1)}
              fill
              sizes="96px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
export function ShowcaseGallery() {
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
          aria-label={t('Showcase categories')}
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
                  <Link
                    className="button button-outline"
                    href={`/work/${selected.slug}`}
                  >
                    {t('View Project')}
                    <ArrowUpRight size={15} />
                  </Link>
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
export function ContactForm({
  initialType = '',
  project = '',
}: {
  initialType?: string;
  project?: string;
}) {
  const { locale, t } = useI18n();
  const [status, setStatus] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    for (const element of Array.from(form.elements)) {
      if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement ||
        element instanceof HTMLSelectElement
      ) {
        element.setCustomValidity('');
        if (element.required && !element.value.trim()) {
          element.setCustomValidity(
            t(
              element instanceof HTMLSelectElement
                ? 'Please select a project type.'
                : 'Please complete this field.',
            ),
          );
        } else if (element.validity.typeMismatch) {
          element.setCustomValidity(t('Please enter a valid email address.'));
        } else if (element.validity.patternMismatch) {
          element.setCustomValidity(
            t('Use 7 to 25 characters: digits, spaces, +, parentheses, or hyphens.'),
          );
        }
      }
    }
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const links = contactLinks(
      {
        name: String(values.get('name')).trim(),
        email: String(values.get('email')).trim(),
        phone: String(values.get('phone')).trim(),
        type: String(values.get('type')),
        description: String(values.get('description')).trim(),
      },
      locale,
    );
    const channel =
      (event.nativeEvent as SubmitEvent).submitter?.getAttribute('value') || 'whatsapp';
    if (channel === 'email') {
      window.location.href = links.email;
      setStatus(t('Your email application opens with a prepared draft. Review and send it there.'));
    } else {
      window.open(links.whatsapp, '_blank', 'noopener,noreferrer');
      setStatus(
        t('WhatsApp opens with your project details. Review the message and send it there.'),
      );
    }
  }
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      noValidate
      onInput={(event) => {
        const input = event.target;
        if (
          input instanceof HTMLInputElement ||
          input instanceof HTMLTextAreaElement ||
          input instanceof HTMLSelectElement
        ) {
          input.setCustomValidity('');
        }
      }}
    >
      <h2>{t('Tell Us About Your Project')}</h2>
      <p>{t('A few details are all we need to begin a conversation.')}</p>
      <div className="form-row">
        <label>
          {t('Full Name ')}
          <span>*</span>
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={120}
            placeholder={t('Your full name')}
            onInput={(event) => event.currentTarget.setCustomValidity('')}
          />
        </label>
        <label>
          {t('Email Address ')}
          <span>*</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder={t('you@company.com')}
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          {t('Phone / WhatsApp')}
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={25}
            pattern="[+0-9 \(\)\-]{7,25}"
            title={t('Use 7 to 25 characters: digits, spaces, +, parentheses, or hyphens.')}
            placeholder={t('+62 ...')}
          />
        </label>
        <label>
          {t('Project Type ')}
          <span>*</span>
          <select
            name="type"
            required
            defaultValue={projectTypes.includes(initialType) ? initialType : ''}
          >
            <option
              value=""
              disabled
            >
              {t('Select a project type')}
            </option>
            {projectTypes.map((type) => (
              <option
                key={type}
                value={type}
              >
                {t(type)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        {t('Project Description ')}
        <span>*</span>
        <textarea
          name="description"
          required
          maxLength={4000}
          rows={5}
          defaultValue={
            project
              ? t("I'd like to discuss a project with a similar direction to {0}.", project)
              : ''
          }
          placeholder={t(
            'What would you like to build? Tell us about your goals, scope, and anything else we should know.',
          )}
          onInput={(event) => event.currentTarget.setCustomValidity('')}
        />
      </label>
      <p className="form-note">
        {t('Your details stay in your browser until you send them through WhatsApp or email.')}
      </p>
      <div className="form-actions">
        <button
          type="submit"
          name="channel"
          value="whatsapp"
          className="button button-accent"
        >
          <MessageCircle size={15} />
          {t('Continue on WhatsApp')}
        </button>
        <button
          type="submit"
          name="channel"
          value="email"
          className="button button-outline"
        >
          <Mail size={15} />
          {t('Open Email Draft')}
        </button>
      </div>
      <p
        role="status"
        className="form-status"
      >
        {t(status)}
      </p>
    </form>
  );
}
