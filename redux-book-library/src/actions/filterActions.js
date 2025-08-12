export const SET_AUTHOR_FILTER = "SET_AUTHOR_FILTER";
export const SET_GENRE_FILTER = "SET_GENRE_FILTER";
export const SET_STATUS_FILTER = "SET_STATUS_FILTER";
export const CLEAR_FILTERS = "CLEAR_FILTERS";

export const setAuthorFilter = (author) => ({
  type: SET_AUTHOR_FILTER,
  payload: author
});

export const setGenreFilter = (genre) => ({
  type: SET_GENRE_FILTER,
  payload: genre
});

export const setStatusFilter = (status) => ({
  type: SET_STATUS_FILTER,
  payload: status 
});

export const clearFilters = () => ({ type: CLEAR_FILTERS });
