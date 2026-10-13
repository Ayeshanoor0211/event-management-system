
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import MyEvents from "./pages/MyEvents";

import { logout } from "./features/auth/authSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  const currentUser = useSelector(
    (state) => state.auth.currentUser
  );

  return (
    <div>
      <nav className="navbar">
        <h2>Event Management System</h2>

        <div className="nav-links">
          <Link to="/events">Explore Events</Link>

          {currentUser ? (
            <>
              <Link to="/my-events">My Events</Link>
              <span>Welcome, {currentUser.name}</span>
              <button onClick={() => dispatch(logout())}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={currentUser ? "/events" : "/login"}
              replace
            />
          }
        />

        <Route
          path="/register"
          element={
            currentUser
              ? <Navigate to="/events" replace />
              : <Register />
          }
        />

        <Route
          path="/login"
          element={
            currentUser
              ? <Navigate to="/events" replace />
              : <Login />
          }
        />

        <Route path="/events" element={<Events />} />

        <Route
          path="/events/:id"
          element={
            currentUser
              ? <EventDetails />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/my-events"
          element={
            currentUser
              ? <MyEvents />
              : <Navigate to="/login" replace />
          }
        />

        <Route path="*" element={<h2>Page not found</h2>} />
      </Routes>
    </div>
  );
}

export default App;
