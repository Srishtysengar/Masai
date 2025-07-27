import React, { useState } from "react";

const blogs = [
  {
    title: "Mastering JavaScript",
    content: "JavaScript is a powerful language for web development.",
  },
  {
    title: "React in Indian Startups",
    content: "React is widely used in many Indian tech companies.",
  },
  {
    title: "Career in Web Development",
    content: "Explore job roles and growth in web development.",
  },
];

function BlogList() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Blog Titles</h1>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {blogs.map((blog, index) => (
          <li
            key={index}
            style={{
              cursor: "pointer",
              padding: "10px",
              margin: "5px",
              backgroundColor: "#f0f0f0",
              borderRadius: "5px",
              width: "300px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            onClick={() => setSelectedBlog(blog)}
          >
            {blog.title}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "30px" }}>
        {selectedBlog ? (
          <>
            <h2>{selectedBlog.title}</h2>
            <p>{selectedBlog.content}</p>
          </>
        ) : (
          <p style={{ fontSize: "18px", color: "#666" }}>
            Select a blog to read
          </p>
        )}
      </div>
    </div>
  );
}

export default BlogList;
