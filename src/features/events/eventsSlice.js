import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,

  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    setEvents: (state, action) => {
      state.events = action.payload;
      state.loading = false;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setEvents, setError } = eventsSlice.actions;

export default eventsSlice.reducer;