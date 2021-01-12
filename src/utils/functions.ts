export function formatDate(date: string) {
  const DATE_OPTIONS = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-us', DATE_OPTIONS);
}