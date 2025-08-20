import React, { useState } from "react";

interface FeedbackData {
  name: string;
  email: string;
  rating: number | "";
  feedback: string;
}

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState<FeedbackData>({
    name: "",
    email: "",
    rating: "",
    feedback: "",
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) || "" : value,
    }));
  };

  const validateForm = (): boolean => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.rating !== "" &&
      formData.feedback.trim() !== ""
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      rating: "",
      feedback: "",
    });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <h2>Feedback Form</h2>

          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            Rating (1-5):
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              value={formData.rating}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            Feedback:
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <h3>✅ Thank you for your feedback!</h3>
          <p>Your response has been recorded.</p>
          <button onClick={() => setSubmitted(false)}>Submit Another</button>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
