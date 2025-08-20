import React from "react";
import { useFeedback } from "../context/FeedbackContext";
import { useNavigate } from "react-router-dom";

const SummaryPage: React.FC = () => {
  const { feedback } = useFeedback();
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Feedback Summary</h2>
      <p><strong>Name:</strong> {feedback.name}</p>
      <p><strong>Email:</strong> {feedback.email}</p>
      <p><strong>Rating:</strong> {feedback.rating}</p>
      <p><strong>Feedback:</strong> {feedback.feedback}</p>

      <button onClick={() => navigate("/form")}>Edit Feedback</button>
    </div>
  );
};

export default SummaryPage;
