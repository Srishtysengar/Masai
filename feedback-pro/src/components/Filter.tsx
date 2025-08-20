import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFilters, setFilters } from "../features/feedback/feedbackSlice";
import { selectFilters } from "../features/feedback/selectors";
import type { AppDispatch } from "../app/store";

const Filters: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector(selectFilters);

  return (
    <div className="card">
      <h3>Filters</h3>

      <label>Minimum Rating</label>
      <select
        value={filters.minRating ?? ""}
        onChange={(e) =>
          dispatch(setFilters({ minRating: e.target.value ? Number(e.target.value) : null }))
        }
      >
        <option value="">Any</option>
        <option value="1">≥ 1</option>
        <option value="2">≥ 2</option>
        <option value="3">≥ 3</option>
        <option value="4">≥ 4</option>
        <option value="5">= 5</option>
      </select>

      <label>Start Date</label>
      <input
        type="date"
        value={filters.startDate ?? ""}
        onChange={(e) => dispatch(setFilters({ startDate: e.target.value || null }))}
      />

      <label>End Date</label>
      <input
        type="date"
        value={filters.endDate ?? ""}
        onChange={(e) => dispatch(setFilters({ endDate: e.target.value || null }))}
      />

      <label>Search (name/email/text)</label>
      <input
        placeholder="type to search..."
        value={filters.search}
        onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
      />

      <button type="button" onClick={() => dispatch(clearFilters())}>
        Clear Filters
      </button>
    </div>
  );
};

export default Filters;
