import React, { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../context/ChatContext";
import MessageBubble from "./MessageBubble";
import "../App.css";

export default function ChatWindow() {
  const { messages } = useContext(ChatContext);
  const endRef = useRef();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-window">
      {messages.map((msg, idx) => (
        <MessageBubble key={idx} role={msg.role} text={msg.text} />
      ))}
      <div ref={endRef}></div>
    </div>
  );
}
