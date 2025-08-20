import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FormPage from "./pages/FormPage";
import DashboardPage from "./pages/DashBoardPage";
import "./App.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
