import { createStore, combineReducers } from "redux";
import { booksReducer } from "./reducers/booksReducer";
import { filterReducer } from "./reducers/filterReducer";

const rootReducer = combineReducers({
  booksState: booksReducer,
  filters: filterReducer
});


const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
