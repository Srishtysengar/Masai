import React, { useState, useEffect, useCallback } from "react";
import Post from "./components/Post";

export default function App() {
  const [timer, setTimer] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getRandomColor = () => `hsl(${Math.random() * 360}, 60%, 60%)`;

  const addPost = () => {
    if (!title.trim() || !body.trim()) return;
    setPosts((prev) => [
      ...prev,
      { 
        id: Date.now(), 
        title, 
        body, 
        verifyPost: false, 
        color: getRandomColor()
      }
    ]);
    setTitle("");
    setBody("");
  };

  const toggleVerify = useCallback((id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? { ...post, verifyPost: !post.verifyPost, color: getRandomColor() }
          : post
      )
    );
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <p>Timer: {timer}</p>
      <input
        placeholder="Enter post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Enter post body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button onClick={addPost}>Add Post</button>

      <h3>Posts</h3>
      {posts.map((post) => (
        <Post key={post.id} {...post} toggleVerify={toggleVerify} />
      ))}
    </div>
  );
}
