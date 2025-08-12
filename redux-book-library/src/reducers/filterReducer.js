import {
  SET_AUTHOR_FILTER,
  SET_GENRE_FILTER,
  SET_STATUS_FILTER,
  CLEAR_FILTERS
} from "../actions/filterActions";

const initialState = {
  author: "",
  genre: "",
  status: "all"
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHOR_FILTER:
      return { ...state, author: action.payload };

    case SET_GENRE_FILTER:
      return { ...state, genre: action.payload };

    case SET_STATUS_FILTER:
      return { ...state, status: action.payload };

    case CLEAR_FILTERS:
      return initialState;

    default:
      return state;
  }
};
