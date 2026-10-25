type SearchableProject = { name: string; category: string; description: string };
export function filterProjects<T extends SearchableProject>(
  projects: T[],
  category: string,
  query: string,
): T[] {
  const selected = category.trim().toLowerCase();
  const search = query.trim().toLowerCase();
  return projects.filter(
    (project) =>
      (selected === 'all projects' || project.category.toLowerCase() === selected) &&
      `${project.name} ${project.description} ${project.category}`.toLowerCase().includes(search),
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
export function contactLinks(values: ContactValues) {
  const subject = `Project inquiry: ${values.type}`;
  const body = `Hello KIVORA STUDIO,\n\n${values.description}\n\nName: ${values.name}\nEmail: ${values.email}\nPhone / WhatsApp: ${values.phone || 'Not provided'}\nProject type: ${values.type}`;
  return {
    whatsapp: `https://wa.me/6285151994724?text=${encodeURIComponent(body)}`,
    email: `mailto:mail@agency.site?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  };
}
