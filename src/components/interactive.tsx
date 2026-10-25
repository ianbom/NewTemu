'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, type FormEvent } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Search,
  Mail,
  MessageCircle,
  ZoomIn,
} from 'lucide-react';
import { categories, projects, projectTypes, type Project } from '@/lib/data';
import { contactLinks, filterProjects, paginate } from '@/lib/behavior';
import { ProjectCard } from '@/components/shared';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function FeaturedProjects() {
  const [offset, setOffset] = useState(0);
  const visible = Array.from(
    { length: 4 },
    (_, index) => projects[(offset + index) % projects.length],
  );
  return (
    <div className="featured-projects">
      <button
        className="carousel-arrow previous"
        aria-label="Previous projects"
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
        aria-label="Next projects"
        onClick={() => setOffset((offset + 1) % projects.length)}
      >
        <ArrowRight size={19} />
      </button>
    </div>
  );
}
const showcaseProjects = [projects[3], projects[1], projects[0], projects[2]];
export function IndustryExplorer() {
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
          Design meets business
        </span>
        <span>One considered approach. Different possibilities.</span>
      </div>
      <div className="industry-visual">
        <Image
          src={industry.project.image}
          alt={`${industry.project.name} ${industry.title} interface concept`}
          fill
          sizes="(min-width: 1024px) 1000px, 100vw"
        />
        <div className="industry-label">
          <span className="eyebrow">{industry.title}</span>
          <p>{industry.description}</p>
        </div>
      </div>
      <div
        className="industry-controls"
        aria-label="Explore industries"
      >
        {industries.map((item, index) => (
          <button
            aria-pressed={selected === index}
            key={item.title}
            onClick={() => setSelected(index)}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
}
export function InteractiveShowcase() {
  const [selected, setSelected] = useState(0);
  const project = showcaseProjects[selected];
  return (
    <section className="interactive-showcase">
      <Image
        src={project.image}
        alt={`${project.name} digital experience`}
        fill
        sizes="100vw"
        className="showcase-background"
      />
      <div className="showcase-shade" />
      <div className="container showcase-content">
        <p className="eyebrow">A closer look</p>
        <h2>Explore Our Digital Experiences.</h2>
        <p>Different challenges. Distinct perspectives. One considered approach.</p>
        <div
          className="showcase-tabs"
          role="tablist"
          aria-label="Project categories"
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
              {label}
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
            <span className="eyebrow">Studio concept / {project.category}</span>
            <h3>
              {project.name} &mdash; {project.sector}
            </h3>
            <p>{project.description}</p>
          </div>
          <Link
            href={`/work/${project.slug}`}
            aria-label={`Explore ${project.name}`}
          >
            <ArrowUpRight size={28} />
          </Link>
        </div>
      </div>
    </section>
  );
}
export function Portfolio({ initialCategory = 'All Projects' }: { initialCategory?: string }) {
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const filtered = filterProjects(projects, category, query);
  const result = paginate(filtered, page, 6);
  return (
    <section className="section">
      <div className="container portfolio-layout">
        <aside className="project-sidebar">
          <label className="search-field">
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              value={query}
              placeholder="Search projects..."
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
            />
            <Search size={16} />
          </label>
          <div className="sidebar-heading">
            <h2>Project Categories</h2>
            <button
              onClick={() => {
                setCategory('All Projects');
                setQuery('');
                setPage(1);
              }}
            >
              View All
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
                  {item}
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
                        <span>{project.sector}</span>
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
            <span>{category}</span>
            <span>
              {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
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
              <h2>No projects found.</h2>
              <p>Try another term or explore all our work.</p>
              <button
                className="button button-outline"
                onClick={() => {
                  setQuery('');
                  setCategory('All Projects');
                  setPage(1);
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
          <nav
            className="pagination"
            aria-label="Portfolio pagination"
          >
            <button
              disabled={result.page === 1}
              aria-label="Previous page"
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
              aria-label="Next page"
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
              aria-label={`Enlarge ${project.name} image ${selected + 1}`}
            >
              <Image
                src={project.gallery[selected]}
                alt={`${project.name} interface view ${selected + 1}`}
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
              {project.name} / Interface study {selected + 1}
            </DialogTitle>
            <DialogDescription>Original KIVORA STUDIO concept.</DialogDescription>
            <div className="lightbox-image">
              <Image
                src={project.gallery[selected]}
                alt={`${project.name} enlarged interface view`}
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
                Previous
              </button>
              <span>
                {selected + 1} / {project.gallery.length}
              </span>
              <button
                className="button button-outline"
                onClick={() => move(1)}
              >
                Next
                <ArrowRight size={16} />
              </button>
            </div>
          </DialogContent>
        </Dialog>
        <button
          className="gallery-arrow left"
          onClick={() => move(-1)}
          aria-label="Previous image"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          className="gallery-arrow right"
          onClick={() => move(1)}
          aria-label="Next image"
        >
          <ArrowRight size={18} />
        </button>
      </div>
      <div className="gallery-thumbnails">
        {project.gallery.map((image, index) => (
          <button
            className={selected === index ? 'selected' : ''}
            aria-label={`Show image ${index + 1}`}
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
            key={image}
          >
            <Image
              src={image}
              alt={`${project.name} thumbnail ${index + 1}`}
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
          aria-label="Showcase categories"
        >
          {['All Work', 'Website Design', 'Web Applications'].map((item) => (
            <button
              key={item}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <p
          className="gallery-count"
          aria-live="polite"
        >
          {filtered.length} original studio explorations
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
              aria-label={`View ${project.name}`}
            >
              <Image
                src={project.image}
                alt={`${project.name}: ${project.description}`}
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              />
              <span className="tile-caption">
                <span>
                  {project.name}
                  <small>{project.category} / Studio concept</small>
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
              {selected?.name} / {selected?.category}
            </DialogTitle>
            <DialogDescription>{selected?.description}</DialogDescription>
            {selected && (
              <>
                <div className="lightbox-image">
                  <Image
                    src={selected.image}
                    alt={`${selected.name} original interface concept`}
                    fill
                    sizes="90vw"
                  />
                </div>
                <div className="lightbox-controls">
                  <button
                    className="icon-button"
                    aria-label="Previous project"
                    onClick={() => move(-1)}
                  >
                    <ArrowLeft />
                  </button>
                  <Link
                    className="button button-outline"
                    href={`/work/${selected.slug}`}
                  >
                    View Project
                    <ArrowUpRight size={15} />
                  </Link>
                  <button
                    className="icon-button"
                    aria-label="Next project"
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
  const [status, setStatus] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    for (const element of Array.from(form.elements)) {
      if (
        (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) &&
        element.required
      ) {
        element.setCustomValidity(element.value.trim() ? '' : 'Please complete this field.');
      }
    }
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const links = contactLinks({
      name: String(values.get('name')).trim(),
      email: String(values.get('email')).trim(),
      phone: String(values.get('phone')).trim(),
      type: String(values.get('type')),
      description: String(values.get('description')).trim(),
    });
    const channel =
      (event.nativeEvent as SubmitEvent).submitter?.getAttribute('value') || 'whatsapp';
    if (channel === 'email') {
      window.location.href = links.email;
      setStatus('Your email application opens with a prepared draft. Review and send it there.');
    } else {
      window.open(links.whatsapp, '_blank', 'noopener,noreferrer');
      setStatus('WhatsApp opens with your project details. Review the message and send it there.');
    }
  }
  return (
    <form
      className="contact-form"
      onSubmit={submit}
    >
      <h2>Tell Us About Your Project</h2>
      <p>A few details are all we need to begin a conversation.</p>
      <div className="form-row">
        <label>
          Full Name <span>*</span>
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={120}
            placeholder="Your full name"
            onInput={(event) => event.currentTarget.setCustomValidity('')}
          />
        </label>
        <label>
          Email Address <span>*</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="you@company.com"
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Phone / WhatsApp
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={25}
            pattern="[+0-9 \(\)\-]{7,25}"
            title="Use 7 to 25 characters: digits, spaces, +, parentheses, or hyphens."
            placeholder="+62 ..."
          />
        </label>
        <label>
          Project Type <span>*</span>
          <select
            name="type"
            required
            defaultValue={projectTypes.includes(initialType) ? initialType : ''}
          >
            <option
              value=""
              disabled
            >
              Select a project type
            </option>
            {projectTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Project Description <span>*</span>
        <textarea
          name="description"
          required
          maxLength={4000}
          rows={5}
          defaultValue={
            project ? `I'd like to discuss a project with a similar direction to ${project}.` : ''
          }
          placeholder="What would you like to build? Tell us about your goals, scope, and anything else we should know."
          onInput={(event) => event.currentTarget.setCustomValidity('')}
        />
      </label>
      <p className="form-note">
        Your details stay in your browser until you send them through WhatsApp or email.
      </p>
      <div className="form-actions">
        <button
          type="submit"
          name="channel"
          value="whatsapp"
          className="button button-accent"
        >
          <MessageCircle size={15} />
          Continue on WhatsApp
        </button>
        <button
          type="submit"
          name="channel"
          value="email"
          className="button button-outline"
        >
          <Mail size={15} />
          Open Email Draft
        </button>
      </div>
      <p
        role="status"
        className="form-status"
      >
        {status}
      </p>
    </form>
  );
}
