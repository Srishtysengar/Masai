import React from "react";
import "../App.css";

export default function MessageBubble({ role, text }) {
  return (
    <div className={`message-bubble ${role}`}>
      <p>{text}</p>
    </div>
  );
}
