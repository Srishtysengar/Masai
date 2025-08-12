export const ADD_BOOK = "ADD_BOOK";
export const EDIT_BOOK = "EDIT_BOOK";
export const DELETE_BOOK = "DELETE_BOOK";
export const TOGGLE_READ = "TOGGLE_READ";

export const addBook = (book) => ({
  type: ADD_BOOK,
  payload: book
});

export const editBook = (id, updates) => ({
  type: EDIT_BOOK,
  payload: { id, updates }
});

export const deleteBook = (id) => ({
  type: DELETE_BOOK,
  payload: id
});

export const toggleRead = (id) => ({
  type: TOGGLE_READ,
  payload: id
});
