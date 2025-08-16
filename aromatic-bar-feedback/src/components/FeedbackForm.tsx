//handles form input
import React, { useMemo, useState } from "react";
import { Feedback, RatingCategory, ratingCategories } from "../types/feedback";
import "../styles/FeedbackForm.css";

interface FeedbackFormProps {
  onSubmit: (feedback: Feedback) => void;
}

type Errors = Partial<Record<keyof Feedback, string>> & {
  ratings?: string;
};

const initialRatings = () =>
  ratingCategories.reduce((acc, cat) => {
    acc[cat] = 0; 
    return acc;
  }, {} as Record<RatingCategory, number>);

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit }) => {
  const [form, setForm] = useState<Feedback>({
    id: Date.now(),
    name: "",
    email: "",
    phone: "",
    date: "",
    ratings: initialRatings(),
    comments: "",
    allowContact: true,
  });
  const [errors, setErrors] = useState<Errors>({});

  const allRatingsSelected = useMemo(
    () => ratingCategories.every((c) => form.ratings[c] >= 1),
    [form.ratings]
  );

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required.";
    if (!form.date) e.date = "Visit date is required.";
    if (!allRatingsSelected) e.ratings = "Please rate all categories (1–5).";
    if (form.phone && !/^[0-9+\-\s()]{7,}$/.test(form.phone))
      e.phone = "Phone looks invalid.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRatingChange = (cat: RatingCategory, val: number) => {
    setForm((prev) => ({
      ...prev,
      ratings: { ...prev.ratings, [cat]: val },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...form, id: Date.now() });
    setForm({
      id: Date.now(),
      name: "",
      email: "",
      phone: "",
      date: "",
      ratings: initialRatings(),
      comments: "",
      allowContact: true,
    });
    setErrors({});
  };

  return (
    <form className="card form-card" onSubmit={handleSubmit} noValidate>
      <h2 className="card-title">Share Your Experience</h2>

      <div className="grid two">
        <div className="field">
          <label>Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            aria-invalid={!!errors.name}
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>

        <div className="field">
          <label>Email *</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div className="field">
          <label>Phone (optional)</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <div className="error">{errors.phone}</div>}
        </div>

        <div className="field">
          <label>Date of Visit *</label>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            aria-invalid={!!errors.date}
          />
          {errors.date && <div className="error">{errors.date}</div>}
        </div>
      </div>

      <div className="ratings">
        <h3>Rate Your Experience *</h3>
        <div className="grid two">
          {ratingCategories.map((cat) => (
            <div key={cat} className="field">
              <label>{cat}</label>
              <select
                value={form.ratings[cat]}
                onChange={(e) => handleRatingChange(cat, Number(e.target.value))}
              >
                <option value={0}>Select (1–5)</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        {errors.ratings && <div className="error">{errors.ratings}</div>}
      </div>

      <div className="field">
        <label>Comments / Grievances</label>
        <textarea
          name="comments"
          value={form.comments}
          onChange={handleChange}
          placeholder="Tell us what went great or what we should improve…"
        />
      </div>

      <div className="field checkbox">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="allowContact"
            checked={form.allowContact}
            onChange={handleChange}
          />
          You may contact me about my feedback.
        </label>
      </div>

      <div className="actions">
        <button type="submit" className="primary">
          Submit Feedback
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
