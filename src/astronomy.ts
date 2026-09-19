export type SunDay = {
  date: Date;
  sunrise: Date;
  sunset: Date;
  daylightMinutes: number;
};

export type SeasonEvent = {
  kind: "equinox" | "solstice";
  season: "Frühling" | "Sommer" | "Herbst" | "Winter";
  date: Date;
};

const radians = (degrees: number) => (degrees * Math.PI) / 180;
/** NOAA-style sunrise equation, accurate to around a minute at mid latitudes. */
export function getSunDay(date: Date, latitude: number, longitude: number): SunDay {
  const midnight = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
  );
  const startOfYear = Date.UTC(date.getUTCFullYear(), 0, 0);
  const dayOfYear = (midnight - startOfYear) / 86_400_000;
  const fractionalYear = (2 * Math.PI / 365) * (dayOfYear - 1);
  const equationOfTime = 229.18 *
    (0.000075 + 0.001868 * Math.cos(fractionalYear) - 0.032077 * Math.sin(fractionalYear) -
      0.014615 * Math.cos(2 * fractionalYear) - 0.040849 * Math.sin(2 * fractionalYear));
  const declination =
    0.006918 - 0.399912 * Math.cos(fractionalYear) + 0.070257 * Math.sin(fractionalYear) -
    0.006758 * Math.cos(2 * fractionalYear) + 0.000907 * Math.sin(2 * fractionalYear) -
    0.002697 * Math.cos(3 * fractionalYear) + 0.00148 * Math.sin(3 * fractionalYear);
  const hourAngle = Math.acos(
    (Math.sin(radians(-0.833)) - Math.sin(radians(latitude)) * Math.sin(declination)) /
      (Math.cos(radians(latitude)) * Math.cos(declination)),
  );
  const halfDayMinutes = (hourAngle * 4 * 180) / Math.PI;
  const solarNoonMinutes = 720 - 4 * longitude - equationOfTime;
  const sunrise = new Date(midnight + (solarNoonMinutes - halfDayMinutes) * 60_000);
  const sunset = new Date(midnight + (solarNoonMinutes + halfDayMinutes) * 60_000);

  return {
    date: new Date(midnight),
    sunrise,
    sunset,
    daylightMinutes: (sunset.getTime() - sunrise.getTime()) / 60_000,
  };
}

export function getDaysOfYear(year: number, latitude: number, longitude: number) {
  const days: SunDay[] = [];
  for (let date = new Date(Date.UTC(year, 0, 1)); date.getUTCFullYear() === year; ) {
    days.push(getSunDay(date, latitude, longitude));
    date = new Date(date.getTime() + 86_400_000);
  }
  return days;
}

// Meeus polynomial estimates (JDE0), more than sufficient for calendar markers.
export function getSeasonEvents(year: number): SeasonEvent[] {
  const t = (year - 2000) / 1000;
  const jde = [
    2451623.80984 + 365242.37404 * t + 0.05169 * t ** 2 - 0.00411 * t ** 3 - 0.00057 * t ** 4,
    2451716.56767 + 365241.62603 * t + 0.00325 * t ** 2 + 0.00888 * t ** 3 - 0.0003 * t ** 4,
    2451810.21715 + 365242.01767 * t - 0.11575 * t ** 2 + 0.00337 * t ** 3 + 0.00078 * t ** 4,
    2451900.05952 + 365242.74049 * t - 0.06223 * t ** 2 - 0.00823 * t ** 3 + 0.00032 * t ** 4,
  ];
  const descriptors = [
    ["equinox", "Frühling"],
    ["solstice", "Sommer"],
    ["equinox", "Herbst"],
    ["solstice", "Winter"],
  ] as const;
  return jde.map((day, index) => ({
    kind: descriptors[index]![0],
    season: descriptors[index]![1],
    date: new Date((day - 2440587.5) * 86_400_000),
  }));
}

export function findClosestToTwelveHours(days: SunDay[]) {
  if (!days.length) throw new Error("Mindestens ein Tag wird benötigt.");
  return days.reduce((best, day) =>
    Math.abs(day.daylightMinutes - 720) < Math.abs(best.daylightMinutes - 720) ? day : best,
  );
}

export function formatDuration(minutes: number) {
  const rounded = Math.round(minutes);
  return `${Math.floor(rounded / 60)}:${String(rounded % 60).padStart(2, "0")}`;
}
