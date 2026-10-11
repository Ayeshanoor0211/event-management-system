import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Register from "./pages/Register";
import Login from "./pages/Login";
import { logout } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  const currentUser = useSelector(
    (state) => state.auth.currentUser
  );

  return (
    <div>
      <nav>
        <h2>Event Management System</h2>

        {currentUser && (
          <div>
            <span>Welcome, {currentUser.name} </span>
            <button onClick={() => dispatch(logout())}>
              Logout
            </button>
          </div>
        )}
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

        <Route
          path="/events"
          element={
            currentUser ? (
              <div>
                <h1>Events Page</h1>
                <p>Welcome, {currentUser.name}!</p>
                <p>Events from Ticketmaster will appear here soon.</p>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="*"
          element={<h2>Page not found</h2>}
        />
      </Routes>
    </div>
  );
}

export default App;