export const SLOT_INTERVAL_MINUTES = 30;
export const OFFICE_START_HOUR = 9;
export const OFFICE_END_HOUR = 16;
export const WORKING_DAYS = new Set([0, 1, 2, 3, 4]); // Sun-Thu

export function parseDuration(value) {
  if (value === undefined) return null;
  const duration = Number(value);
  if (!Number.isInteger(duration) || ![30, 60].includes(duration)) {
    return null;
  }
  return duration;
}

export function buildDateTime(dateString, hour, minute = 0) {
  const date = new Date(`${dateString}T00:00:00`);
  date.setHours(hour, minute, 0, 0);
  return date;
}

export function isWorkingDay(date) {
  return WORKING_DAYS.has(date.getDay());
}

export function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

export function overlaps(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && bStart < aEnd;
}

export function buildCandidateSlots(startOfDay, endOfDay) {
  const candidates = [];
  for (
    let cursor = new Date(startOfDay);
    cursor < endOfDay;
    cursor = addMinutes(cursor, SLOT_INTERVAL_MINUTES)
  ) {
    candidates.push({
      start: new Date(cursor),
      end: new Date(endOfDay),
    });
  }
  return candidates;
}

export function toSlots(candidates, duration, busyWindows) {
  return candidates
    .filter(({ start, end }) => {
      const desiredEnd = addMinutes(start, duration);
      if (desiredEnd > end) return false;
      return !busyWindows.some(({ start: busyStart, end: busyEnd }) =>
        overlaps(start, desiredEnd, busyStart, busyEnd)
      );
    })
    .map(({ start }) => {
      const end = addMinutes(start, duration);
      return {
        time: `${String(start.getHours()).padStart(2, "0")}:${String(start.getMinutes()).padStart(2, "0")}`,
        start: start.toISOString(),
        end: end.toISOString(),
      };
    });
}

export function isWithinOfficeHours(date, duration) {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const startsWithin =
    hour > OFFICE_START_HOUR ||
    (hour === OFFICE_START_HOUR && minute >= 0);
  if (!startsWithin) return false;

  const endsAt = addMinutes(date, duration);
  const endHour = endsAt.getHours();
  const endMinute = endsAt.getMinutes();
  return (
    endHour < OFFICE_END_HOUR ||
    (endHour === OFFICE_END_HOUR && endMinute === 0)
  );
}
