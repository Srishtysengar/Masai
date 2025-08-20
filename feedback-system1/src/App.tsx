import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { FeedbackProvider } from "./context/FeedbackContext";
import FormPage from "./pages/FormPage";
import SummaryPage from "./pages/SummaryPage";

const App: React.FC = () => {
  return (
    <FeedbackProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/form" />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </Router>
    </FeedbackProvider>
  );
};

export default App;
