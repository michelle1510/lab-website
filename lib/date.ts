// "10/14/2026" -> { label: "Oct 14, 2026", iso: "2026-10-14" }.
// Parsed by hand so the day never shifts with the viewer's time zone.
export function formatDate(date: string) {
  const [month, day, year] = date.split('/').map(Number);
  if (!month || !day || !year) return { label: date, iso: undefined };
  const label = new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const pad = (n: number) => String(n).padStart(2, '0');
  return { label, iso: `${year}-${pad(month)}-${pad(day)}` };
}
