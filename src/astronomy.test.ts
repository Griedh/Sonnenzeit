import { describe, expect, it, vi } from "vitest";
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

  it("calculates solar times offline without fetch or an API key", () => {
    // This guards against fetch-based networking, not all possible transports.
    const fetchMock = vi.fn(() => {
      throw new Error("Network access is forbidden during the offline calculation");
    });
    vi.stubGlobal("fetch", fetchMock);
    try {
      const day = getSunDay(new Date("2026-06-21T12:00:00Z"), 50.81, 6.77);

      expect(day.date.toISOString()).toBe("2026-06-21T00:00:00.000Z");
      expect(Number.isFinite(day.sunrise.getTime())).toBe(true);
      expect(Number.isFinite(day.sunset.getTime())).toBe(true);
      expect(day.sunset.getTime()).toBeGreaterThan(day.sunrise.getTime());
      expect(day.daylightMinutes).toBeGreaterThan(970);
      expect(day.daylightMinutes).toBeLessThan(1_000);
      expect(fetchMock).not.toHaveBeenCalled();
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it("does not depend on the time within the same UTC date", () => {
    const morning = getSunDay(new Date("2026-06-21T00:01:00Z"), 50.81, 6.77);
    const evening = getSunDay(new Date("2026-06-21T23:59:00Z"), 50.81, 6.77);
    expect(morning).toEqual(evening);
  });

  it("rejects empty daylight-comparison input with the existing error text", () => {
    expect(() => findClosestToTwelveHours([])).toThrow("Mindestens ein Tag wird benötigt.");
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
