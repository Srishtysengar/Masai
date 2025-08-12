import React from "react";
import BookItem from "./BookItem";

export default function BookList({ books, onToggle, onEdit, onDelete }) {
  if (!books.length) {
    return <p>No books found.</p>;
  }

  return (
    <div className="book-list">
      {books.map((b) => (
        <BookItem key={b.id} book={b} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
