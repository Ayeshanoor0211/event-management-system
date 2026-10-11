import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, clearError } from "../features/auth/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.auth.error);
  const users = useSelector((state) => state.auth.users);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    const userExists = users.some(
      (user) =>
        user.email.toLowerCase() === cleanEmail &&
        user.password === password
    );

    dispatch(clearError());
    dispatch(login({ email: cleanEmail, password }));

    if (userExists) {
      navigate("/events");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <p>Login to explore and register for events.</p>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;