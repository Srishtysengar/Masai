import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { subDays } from "date-fns";
import { nanoid } from "@reduxjs/toolkit";

export interface FeedbackEntry {
  id: string;
  name: string;
  email: string;
  rating: number;    
  feedback: string;
  date: string;       
}

export interface Filters {
  minRating: number | null;     
  startDate: string | null;    
  endDate: string | null;    
  search: string;              
}

interface FeedbackState {
  entries: FeedbackEntry[];
  filters: Filters;
}

const initialState: FeedbackState = {
  entries: [
    // seed data for demo; you can remove
    {
      id: nanoid(),
      name: "Aarav",
      email: "aarav@example.com",
      rating: 5,
      feedback: "Loved the experience!",
      date: subDays(new Date(), 2).toISOString(),
    },
    {
      id: nanoid(),
      name: "Meera",
      email: "meera@example.com",
      rating: 3,
      feedback: "It was okay, room for improvement.",
      date: subDays(new Date(), 6).toISOString(),
    },
  ],
  filters: {
    minRating: null,
    startDate: null,
    endDate: null,
    search: "",
  },
};

type AddEntryPayload = Omit<FeedbackEntry, "id" | "date"> & { date?: string };

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    addEntry: {
      reducer(state, action: PayloadAction<FeedbackEntry>) {
        state.entries.unshift(action.payload);
      },
      prepare(payload: AddEntryPayload) {
        return {
          payload: {
            id: nanoid(),
            name: payload.name,
            email: payload.email,
            rating: payload.rating,
            feedback: payload.feedback,
            date: payload.date ?? new Date().toISOString(),
          } as FeedbackEntry,
        };
      },
    },
    deleteEntry(state, action: PayloadAction<string>) {
      state.entries = state.entries.filter(e => e.id !== action.payload);
    },
    setFilters(state, action: PayloadAction<Partial<Filters>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters(state) {
      state.filters = initialState.filters;
    },
  },
});

export const { addEntry, deleteEntry, setFilters, clearFilters } = feedbackSlice.actions;
export default feedbackSlice.reducer;
