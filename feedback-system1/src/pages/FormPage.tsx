import React from "react";
import { useNavigate } from "react-router-dom";
import FeedbackForm from "../components/FeedbackForm";
import { useFeedback } from "../context/FeedbackContext";

const FormPage: React.FC = () => {
  const navigate = useNavigate();
  const { feedback } = useFeedback();

  const validateForm = (): boolean => {
    return (
      feedback.name.trim() !== "" &&
      feedback.email.trim() !== "" &&
      feedback.rating !== "" &&
      feedback.feedback.trim() !== ""
    );
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate("/summary");
    } else {
      alert("⚠ Please fill all fields before proceeding.");
    }
  };

  return (
    <div>
      <FeedbackForm />
      <button onClick={handleNext} style={{ marginTop: "10px" }}>
        Go to Summary
      </button>
    </div>
  );
};

export default FormPage;
