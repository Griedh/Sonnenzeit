import { describe, expect, it } from "vitest";
import { formatSolarTime } from "./solarTime";

describe("Berlin solar time display (annual-calendar)", () => {
  it.each([
    ["2026-06-21T04:00:00Z", "06:00"],
    ["2026-12-21T07:00:00Z", "08:00"],
  ])("displays %s as %s in Europe/Berlin", (input, expected) => {
    expect(formatSolarTime(new Date(input))).toBe(expected);
  });

  it.each([
    // The clock skips from 01:59 to 03:00 when DST starts.
    ["2026-03-29T00:59:00Z", "01:59"],
    ["2026-03-29T01:00:00Z", "03:00"],
    // The clock repeats the hour from 02:00 to 02:59 when DST ends.
    ["2026-10-25T00:59:00Z", "02:59"],
    ["2026-10-25T01:00:00Z", "02:00"],
  ])("handles the 2026 DST transition %s -> %s", (input, expected) => {
    expect(formatSolarTime(new Date(input))).toBe(expected);
  });

  it.each([
    ["2026-06-21T22:05:00Z", "00:05"], // Local midnight, following calendar day.
    ["2026-12-21T07:08:00Z", "08:08"],
    ["2026-06-21T21:59:00Z", "23:59"],
  ])("formats a local time %s as the 24-hour HH:mm value %s", (input, expected) => {
    const displayed = formatSolarTime(new Date(input));
    expect(displayed).toBe(expected);
    expect(displayed).toMatch(/^\d{2}:\d{2}$/);
  });
});
