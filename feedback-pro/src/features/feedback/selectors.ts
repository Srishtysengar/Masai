import { RootState } from "../../app/store";
import { isAfter, isBefore } from "date-fns";

export const selectAllEntries = (s: RootState) => s.feedback.entries;
export const selectFilters = (s: RootState) => s.feedback.filters;

export const selectFilteredEntries = (s: RootState) => {
  const entries = s.feedback.entries;
  const { minRating, startDate, endDate, search } = s.feedback.filters;

  return entries.filter(e => {
    if (minRating != null && e.rating < minRating) return false;

    const d = new Date(e.date);
    if (startDate && isBefore(new Date(startDate), new Date(0)) === false) {
      if (isBefore(d, new Date(startDate))) return false;
    }
    if (endDate) {
      if (isAfter(d, new Date(endDate))) return false;
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      const blob = `${e.name} ${e.email} ${e.feedback}`.toLowerCase();
      if (!blob.includes(q)) return false;
    }

    return true;
  });
};

export const selectRatingBuckets = (s: RootState) => {
  const list = selectFilteredEntries(s);
  // counts for ratings 1..5
  const buckets = [0, 0, 0, 0, 0];
  list.forEach(e => {
    if (e.rating >= 1 && e.rating <= 5) buckets[e.rating - 1] += 1;
  });
  return buckets;
};
