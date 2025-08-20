import React, { useState, useContext } from "react";
import { ChatContext } from "../context/ChatContext";

export default function ChatInput() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { addMessage } = useContext(ChatContext);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const sendMessage = async (text) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text }],
              },
            ],
          }),
        }
      );

      const data = await response.json();

      const aiText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ No response from Gemini.";

      addMessage({ role: "assistant", text: aiText });
    } catch (err) {
      console.error(err);
      addMessage({ role: "assistant", text: "⚠️ Error fetching response." });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    addMessage({ role: "user", text: input });
    setLoading(true);
    await sendMessage(input);
    setLoading(false);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? "..." : "Send"}
      </button>
    </form>
  );
}
