import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEntry } from "../features/feedback/feedbackSlice";
import type { AppDispatch } from "../app/store";

interface FormState {
  name: string;
  email: string;
  rating: number | "";
  feedback: string;
}

const FeedbackForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    rating: "",
    feedback: "",
  });
  const [errors, setErrors] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "rating" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.feedback.trim() || form.rating === "") {
      setErrors("Please fill all fields.");
      return false;
    }
    if (typeof form.rating === "number" && (form.rating < 1 || form.rating > 5)) {
      setErrors("Rating must be between 1 and 5.");
      return false;
    }
    setErrors("");
    return true;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(addEntry({
      name: form.name.trim(),
      email: form.email.trim(),
      rating: Number(form.rating),
      feedback: form.feedback.trim(),
    }));

    setForm({ name: "", email: "", rating: "", feedback: "" });
    alert("✅ Feedback submitted!");
  };

  return (
    <form className="card" onSubmit={submit}>
      <h2>Submit Feedback</h2>

      {errors && <div className="alert">{errors}</div>}

      <label>Name</label>
      <input name="name" value={form.name} onChange={handleChange} />

      <label>Email</label>
      <input type="email" name="email" value={form.email} onChange={handleChange} />

      <label>Rating (1–5)</label>
      <input type="number" name="rating" min={1} max={5} value={form.rating} onChange={handleChange} />

      <label>Feedback</label>
      <textarea name="feedback" value={form.feedback} onChange={handleChange} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default FeedbackForm;
