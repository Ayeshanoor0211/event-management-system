import { createSlice } from "@reduxjs/toolkit";

// Load saved registrations
const savedRegistrations = JSON.parse(
  localStorage.getItem("registrations") || "[]"
);

const initialState = {
  registrations: savedRegistrations,
};

const registrationsSlice = createSlice({
  name: "registrations",
  initialState,

  reducers: {
    registerEvent: (state, action) => {
      const { userId, event } = action.payload;

      // Check if user already registered
      const alreadyRegistered = state.registrations.some(
        (registration) =>
          registration.userId === userId &&
          registration.event.id === event.id
      );

      if (!alreadyRegistered) {
        state.registrations.push({
          userId: userId,
          event: event,
        });
      }
    },

    cancelRegistration: (state, action) => {
      const { userId, eventId } = action.payload;

      state.registrations = state.registrations.filter(
        (registration) =>
          !(
            registration.userId === userId &&
            registration.event.id === eventId
          )
      );
    },
  },
});

export const {
  registerEvent,
  cancelRegistration
} = registrationsSlice.actions;

export default registrationsSlice.reducer;