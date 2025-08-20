import React from "react";
import { useFeedback } from "../context/FeedbackContext";

const FeedbackForm: React.FC = () => {
  const { feedback, setFeedback } = useFeedback();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) || "" : value,
    }));
  };

  return (
    <form style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Feedback Form</h2>

      <label>
        Name:
        <input
          type="text"
          name="name"
          value={feedback.name}
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
          value={feedback.email}
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
          value={feedback.rating}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Feedback:
        <textarea
          name="feedback"
          value={feedback.feedback}
          onChange={handleChange}
          required
        />
      </label>
      <br />
    </form>
  );
};

export default FeedbackForm;
