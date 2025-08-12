import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";

import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import FilterBar from "./components/FilterBar";

import {
  addBook,
  deleteBook,
  editBook,
  toggleRead
} from "./actions/bookActions";

import {
  setAuthorFilter,
  setGenreFilter,
  setStatusFilter,
  clearFilters
} from "./actions/filterActions";

import "./styles.css";

function LibraryApp() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.booksState.books);
  const filters = useSelector((state) => state.filters);

  const handleAdd = (book) => dispatch(addBook(book));
  const handleToggle = (id) => dispatch(toggleRead(id));
  const handleEdit = (id, updates) => dispatch(editBook(id, updates));
  const handleDelete = (id) => dispatch(deleteBook(id));

  const setAuthor = (a) => dispatch(setAuthorFilter(a));
  const setGenre = (g) => dispatch(setGenreFilter(g));
  const setStatus = (s) => dispatch(setStatusFilter(s));
  const doClear = () => dispatch(clearFilters());

  const filtered = books.filter((b) => {
    const authorMatch = filters.author ? b.author.toLowerCase().includes(filters.author.toLowerCase()) : true;
    const genreMatch = filters.genre ? (b.genre || "").toLowerCase().includes(filters.genre.toLowerCase()) : true;
    const statusMatch =
      filters.status === "all" ? true : filters.status === "read" ? b.read : !b.read;
    return authorMatch && genreMatch && statusMatch;
  });

  return (
    <div className="container">
      <h1>Book Library</h1>

      <section className="panel">
        <h2>Add a book</h2>
        <BookForm onSubmit={handleAdd} />
      </section>

      <section className="panel">
        <h2>Filters</h2>
        <FilterBar
          author={filters.author}
          genre={filters.genre}
          status={filters.status}
          onSetAuthor={setAuthor}
          onSetGenre={setGenre}
          onSetStatus={setStatus}
          onClear={doClear}
        />
      </section>

      <section className="panel">
        <h2>Books</h2>
        <BookList books={filtered} onToggle={handleToggle} onEdit={handleEdit} onDelete={handleDelete} />
      </section>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <LibraryApp />
    </Provider>
  );
}
