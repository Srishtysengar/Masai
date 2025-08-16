import React from "react";
import PostList from "./components/PostList";

const App: React.FC = () => {
  return (
    <div style={{ margin: "20px" }}>
      <h1>TypeScript React API Demo</h1>
      <PostList />
    </div>
  );
};

export default App;
