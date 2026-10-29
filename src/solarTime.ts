/** Display a UTC instant in Berlin local time, including DST. */
const berlinTimeFormatter = new Intl.DateTimeFormat("de-DE", {
  timeZone: "Europe/Berlin",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatSolarTime(instant: Date): string {
  return berlinTimeFormatter.format(instant);
}
