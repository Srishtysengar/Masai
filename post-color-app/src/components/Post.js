import React from "react";

function Post({ id, title, body, verifyPost, color, toggleVerify }) {
  return (
    <div
      style={{
        background: color,
        padding: "10px",
        marginBottom: "10px",
        color: "#fff",
      }}
    >
      <p>ID: {id}</p>
      <h4>{title}</h4>
      <p>{body}</p>
      <button onClick={() => toggleVerify(id)}>
        {verifyPost ? "Verified" : "Verify"}
      </button>
    </div>
  );
}

export default React.memo(Post);
