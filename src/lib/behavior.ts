import { getTranslator, type Locale } from './i18n.ts';

type SearchableProject = { name: string; category: string; description: string };
export function filterProjects<T extends SearchableProject>(
  projects: T[],
  category: string,
  query: string,
  locale: Locale = 'en',
): T[] {
  const t = getTranslator(locale);
  const selected = category.trim().toLowerCase();
  const search = query.trim().toLowerCase();
  return projects.filter(
    (project) =>
      (selected === 'all projects' || project.category.toLowerCase() === selected) &&
      `${project.name} ${t(project.description)} ${t(project.category)}`
        .toLowerCase()
        .includes(search),
  );
}
export function paginate<T>(items: T[], requestedPage: number, pageSize: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const page = Math.min(
    totalPages,
    Math.max(1, Number.isFinite(requestedPage) ? Math.floor(requestedPage) : 1),
  );
  return { items: items.slice((page - 1) * pageSize, page * pageSize), page, totalPages };
}
export type ContactValues = {
  name: string;
  email: string;
  phone: string;
  type: string;
  description: string;
};
export function contactLinks(values: ContactValues, locale: Locale = 'en') {
  const t = getTranslator(locale);
  const subject = t('Project inquiry: {0}', t(values.type));
  const body = `${t('Hello KIVORA STUDIO,')}\n\n${values.description}\n\n${t('Name')}: ${values.name}\n${t('Email')}: ${values.email}\n${t('Phone / WhatsApp')}: ${values.phone || t('Not provided')}\n${t('Project type')}: ${t(values.type)}`;
  return {
    whatsapp: `https://wa.me/6285151994724?text=${encodeURIComponent(body)}`,
    email: `mailto:mail@agency.site?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  };
}
