export function dateToISO(date) {
  if (!date) return null;
  return date.toISOString().split("T")[0];
}
