import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import eventsReducer from "../features/events/eventsSlice";
import registrationsReducer from "../features/registrations/registrationsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
    registrations: registrationsReducer,
  },
});

// Save registrations whenever Redux state changes
store.subscribe(() => {
  const registrations = store.getState().registrations.registrations;

  localStorage.setItem(
    "registrations",
    JSON.stringify(registrations)
  );
});