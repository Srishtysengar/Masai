//displays the thankyou page
import React from "react";
import "../styles/ThankYou.css";

interface ThankYouProps {
  name: string;
}

const ThankYou: React.FC<ThankYouProps> = ({ name }) => {
  return (
    <div className="thankyou card">
      <h2>Thank you{name ? `, ${name}` : ""}! 🎉</h2>
      <p>Your feedback helps us make Aromatic Bar even better.</p>
    </div>
  );
};

export default ThankYou;
