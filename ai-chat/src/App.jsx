import React from "react";
import { ChatProvider } from "./context/ChatContext";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import "./App.css";

function App() {
  return (
    <ChatProvider>
      <div className="app">
        <h1>🤖 Gemini Chat</h1>
        <ChatWindow />
        <ChatInput />
      </div>
    </ChatProvider>
  );
}

export default App;
