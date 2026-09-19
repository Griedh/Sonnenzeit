import { describe, expect, it } from "vitest";
import {
  findClosestToTwelveHours,
  formatDuration,
  getDaysOfYear,
  getSeasonEvents,
  getSunDay,
} from "./astronomy";

describe("astronomy", () => {
  it("calculates plausible summer values for Erftstadt", () => {
    const day = getSunDay(new Date("2026-06-21T12:00:00Z"), 50.81, 6.77);
    expect(day.daylightMinutes).toBeGreaterThan(970);
    expect(day.daylightMinutes).toBeLessThan(1_000);
  });

  it("generates leap years and finds a near-equal day", () => {
    const days = getDaysOfYear(2028, 50.81, 6.77);
    expect(days).toHaveLength(366);
    expect(Math.abs(findClosestToTwelveHours(days).daylightMinutes - 720)).toBeLessThan(2);
  });

  it("places the 2026 season markers in their expected months", () => {
    expect(getSeasonEvents(2026).map((event) => event.date.getUTCMonth())).toEqual([2, 5, 8, 11]);
  });

  it("formats daylight durations", () => expect(formatDuration(736)).toBe("12:16"));
});
