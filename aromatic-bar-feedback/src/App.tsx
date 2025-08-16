//main entry point
//manages global state for feedback
import React, { useEffect, useMemo, useState } from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import ThankYou from "./components/ThankYou";
import { Feedback, RatingCategory } from "./types/feedback";
import { getFeedbackList, saveFeedback, clearAll } from "./services/storage";
import "./App.css";

type View = "form" | "list" | "thanks";

const App: React.FC = () => {
  const [view, setView] = useState<View>("form");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(() => getFeedbackList());
  const [justSubmittedName, setJustSubmittedName] = useState<string>("");

  useEffect(() => {
  }, [feedbacks]);

  const handleSubmit = (fb: Feedback) => {
    saveFeedback(fb);
    setFeedbacks((prev) => [...prev, fb]);
    setJustSubmittedName(fb.name);
    setView("thanks");
    setTimeout(() => setView("list"), 1500);
  };

  const stats = useMemo(() => {
    const total = feedbacks.length;
    const avg = (cat: RatingCategory) =>
      total === 0
        ? 0
        : (
            feedbacks.reduce((sum, f) => sum + (f.ratings[cat] ?? 0), 0) / total
          ).toFixed(1);
    return {
      total,
      food: avg(RatingCategory.Food),
      service: avg(RatingCategory.Service),
      ambience: avg(RatingCategory.Ambience),
      overall: avg(RatingCategory.Overall),
    };
  }, [feedbacks]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Aromatic Bar • Feedback & Grievances</h1>
        <nav className="tabs">
          <button
            className={`tab ${view === "form" ? "active" : ""}`}
            onClick={() => setView("form")}
            aria-pressed={view === "form"}
          >
            Give Feedback
          </button>
          <button
            className={`tab ${view === "list" ? "active" : ""}`}
            onClick={() => setView("list")}
            aria-pressed={view === "list"}
          >
            View Submissions
          </button>
        </nav>
      </header>

      <section className="content">
        {view === "form" && <FeedbackForm onSubmit={handleSubmit} />}

        {view === "thanks" && <ThankYou name={justSubmittedName} />}

        {view === "list" && (
          <>
            <div className="stats">
              <div className="stat">
                <div className="stat-label">Total</div>
                <div className="stat-value">{stats.total}</div>
              </div>
              <div className="stat">
                <div className="stat-label">Food</div>
                <div className="stat-value">{stats.food}</div>
              </div>
              <div className="stat">
                <div className="stat-label">Service</div>
                <div className="stat-value">{stats.service}</div>
              </div>
              <div className="stat">
                <div className="stat-label">Ambience</div>
                <div className="stat-value">{stats.ambience}</div>
              </div>
              <div className="stat">
                <div className="stat-label">Overall</div>
                <div className="stat-value">{stats.overall}</div>
              </div>
            </div>
            <FeedbackList data={feedbacks} />
            <div className="danger-zone">
              <button
                className="clear-button"
                onClick={() => {
                  if (window.confirm("Clear all saved feedback?")) {
                    clearAll();
                    setFeedbacks([]);
                  }
                }}
              >
                Clear All Saved Feedback
              </button>
            </div>
          </>
        )}
      </section>

      <footer className="app-footer">
        <small>© {new Date().getFullYear()} Srishty Sengar</small>
      </footer>
    </div>
  );
};

export default App;
