import React from "react";
import SignupForm from "./components/SignupForm";
import PostsList from "./components/PostsList";

function App() {
  return (
    <div>
      <h1>Custom Hooks Demo</h1>
      <SignupForm />
      <hr />
      <PostsList />
    </div>
  );
}

export default App;
