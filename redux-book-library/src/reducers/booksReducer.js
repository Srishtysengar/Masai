import { ADD_BOOK, EDIT_BOOK, DELETE_BOOK, TOGGLE_READ } from "../actions/bookActions";

const initialState = {
  books: [
  ]
};

export const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return { ...state, books: [...state.books, action.payload] };

    case EDIT_BOOK:
      return {
        ...state,
        books: state.books.map((b) =>
          b.id === action.payload.id ? { ...b, ...action.payload.updates } : b
        )
      };

    case DELETE_BOOK:
      return { ...state, books: state.books.filter((b) => b.id !== action.payload) };

    case TOGGLE_READ:
      return {
        ...state,
        books: state.books.map((b) =>
          b.id === action.payload ? { ...b, read: !b.read } : b
        )
      };

    default:
      return state;
  }
};
