import React, { useState, useEffect } from "react";

const styles = {
  form: { display: "flex", flexDirection: "column", gap: "8px" },
  row: { display: "flex", gap: "8px", flexWrap: "wrap" }
};

export default function BookForm({ onSubmit, initial = null, onCancel }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [read, setRead] = useState(false);

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setAuthor(initial.author || "");
      setGenre(initial.genre || "");
      setRead(Boolean(initial.read));
    }
  }, [initial]);

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return alert("Title and author are required");
    const book = {
      id: initial?.id || Date.now(),
      title: title.trim(),
      author: author.trim(),
      genre: genre.trim(),
      read: !!read
    };
    onSubmit(book);
    if (!initial) {
      setTitle("");
      setAuthor("");
      setGenre("");
      setRead(false);
    }
  };

  return (
    <form style={styles.form} onSubmit={submit}>
      <input
        placeholder="Title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
      <input
        placeholder="Author *"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        />
      <input
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        />
      <label>
        <input type="checkbox" checked={read} onChange={(e) => setRead(e.target.checked)} />
        {" "}Read
      </label>
      <div style={styles.row}>
        <button type="submit">{initial ? "Save" : "Add Book"}</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
