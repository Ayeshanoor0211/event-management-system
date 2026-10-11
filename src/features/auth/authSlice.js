import { createSlice } from "@reduxjs/toolkit";

// Read saved users from localStorage
const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");

// Read currently logged-in user
const savedUser = JSON.parse(localStorage.getItem("currentUser") || "null");

const initialState = {
  users: savedUsers,
  currentUser: savedUser,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    register: (state, action) => {
      const { name, email, password } = action.payload;

      const userExists = state.users.some(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      );

      if (userExists) {
        state.error = "Email already registered";
        return;
      }

      const newUser = {
        id: crypto.randomUUID(),
        name,
        email,
        password,
      };

      state.users.push(newUser);
      state.error = null;

      localStorage.setItem("users", JSON.stringify(state.users));
    },

    login: (state, action) => {
      const { email, password } = action.payload;

      const user = state.users.find(
        (user) =>
          user.email.toLowerCase() === email.toLowerCase() &&
          user.password === password
      );

      if (user) {
        state.currentUser = {
          id: user.id,
          name: user.name,
          email: user.email,
        };

        state.error = null;

        localStorage.setItem(
          "currentUser",
          JSON.stringify(state.currentUser)
        );
      } else {
        state.error = "Invalid email or password";
      }
    },

    logout: (state) => {
      state.currentUser = null;
      state.error = null;
      localStorage.removeItem("currentUser");
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { register, login, logout, clearError } = authSlice.actions;

export default authSlice.reducer;