//displays data
import React, { useMemo, useState } from "react";
import { Feedback, RatingCategory, ratingCategories } from "../types/feedback";
import "../styles/FeedbackList.css";

interface FeedbackListProps {
  data: Feedback[];
}

type SortKey = "date_desc" | "date_asc" | "overall_desc" | "overall_asc";

const FeedbackList: React.FC<FeedbackListProps> = ({ data }) => {
  const [query, setQuery] = useState<string>("");
  const [minOverall, setMinOverall] = useState<number>(0);
  const [sort, setSort] = useState<SortKey>("date_desc");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const withOverall = data.map((f) => ({
      f,
      overall: f.ratings[RatingCategory.Overall] || 0,
    }));

    let res = withOverall.filter(({ f, overall }) => {
      const matchQ =
        !q ||
        f.name.toLowerCase().includes(q) ||
        f.email.toLowerCase().includes(q) ||
        f.comments.toLowerCase().includes(q);
      const matchMin = overall >= minOverall;
      return matchQ && matchMin;
    });

    res.sort((a, b) => {
      switch (sort) {
        case "date_asc":
          return a.f.date.localeCompare(b.f.date);
        case "overall_desc":
          return b.overall - a.overall;
        case "overall_asc":
          return a.overall - b.overall;
        default:
          // date_desc
          return b.f.date.localeCompare(a.f.date);
      }
    });

    return res.map((r) => r.f);
  }, [data, query, minOverall, sort]);

  return (
    <div className="list-wrap">
      <div className="controls card">
        <div className="control">
          <label>Search</label>
          <input
            placeholder="Name, email or comment…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="control">
          <label>Min Overall</label>
          <select
            value={minOverall}
            onChange={(e) => setMinOverall(Number(e.target.value))}
          >
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className="control">
          <label>Sort By</label>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
            <option value="date_desc">Newest First</option>
            <option value="date_asc">Oldest First</option>
            <option value="overall_desc">Overall Rating ↓</option>
            <option value="overall_asc">Overall Rating ↑</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="muted">No feedback matches your filters yet.</p>
      ) : (
        <div className="grid three">
          {filtered.map((fb) => (
            <article key={fb.id} className="card feedback-card">
              <header className="card-head">
                <h3 className="customer">{fb.name}</h3>
                <time className="date" dateTime={fb.date}>
                  {new Date(fb.date).toLocaleDateString()}
                </time>
              </header>

              <ul className="ratings-list">
                {ratingCategories.map((cat) => (
                  <li key={cat}>
                    <span className="tag">{cat}</span>
                    <strong>{fb.ratings[cat]}/5</strong>
                  </li>
                ))}
              </ul>

              {fb.comments && <p className="comments">“{fb.comments}”</p>}

              <footer className="card-foot">
                <a className="email" href={`mailto:${fb.email}`}>
                  {fb.email}
                </a>
                {fb.phone && <span className="phone"> • {fb.phone}</span>}
                {!fb.allowContact && (
                  <span className="no-contact" title="Customer prefers no contact">
                    • Do not contact
                  </span>
                )}
              </footer>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
