import { createSlice } from "@reduxjs/toolkit";

let nextId = 1;

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push({
        id: nextId++,
        text: action.payload,
        completed: false,
      });
    },
    removeTask: (state, action) => {
      return state.filter(task => task.id !== action.payload);
    },
    toggleTask: (state, action) => {
      const task = state.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});

export const { addTask, removeTask, toggleTask } = tasksSlice.actions;
export default tasksSlice.reducer;
