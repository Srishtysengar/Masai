import React from "react";
import useFetch from "../hooks/useFetch";

export default function PostsList() {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {data.slice(0, 5).map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
