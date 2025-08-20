import React from "react";
import FeedbackForm from "../components/FeedbackForm";
import { Link } from "react-router-dom";

const FormPage: React.FC = () => {
  return (
    <div className="container">
      <FeedbackForm />
      <div className="card" style={{ marginTop: 12 }}>
        <p>Want to see analytics?</p>
        <Link to="/dashboard"><button>Go to Dashboard</button></Link>
      </div>
    </div>
  );
};

export default FormPage;
