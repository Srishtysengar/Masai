import React, { useState } from "react";
import BookForm from "./BookForm";

export default function BookItem({ book, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);

  const handleEdit = (updatedBook) => {
    onEdit(book.id, {
      title: updatedBook.title,
      author: updatedBook.author,
      genre: updatedBook.genre,
      read: updatedBook.read
    });
    setEditing(false);
  };

  return (
    <div className="book-item">
      {editing ? (
        <BookForm initial={book} onSubmit={handleEdit} onCancel={() => setEditing(false)} />
      ) : (
        <>
          <div className="book-main" onClick={() => onToggle(book.id)} role="button" tabIndex={0}>
            <h3 className={book.read ? "read" : ""}>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre || "—"}</p>
            <p><strong>Status:</strong> {book.read ? "Read" : "Unread"}</p>
          </div>
          <div className="book-actions">
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => onDelete(book.id)} className="danger">Delete</button>
          </div>
        </>
      )}
    </div>
  );
}
