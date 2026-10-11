import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register, clearError } from "../features/auth/authSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.auth.error);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const exists = users.some(
      (user) => user.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (exists) {
      alert("Email already registered");
      return;
    }

    dispatch(clearError());

    dispatch(
      register({
        name: name.trim(),
        email: email.trim(),
        password,
      })
    );

    alert("Registration successful! Please login.");
    navigate("/login");
  };

  return (
    <div>
      <h1>Create Account</h1>
      <p>Register to explore and manage events.</p>

      <form onSubmit={handleRegister}>
        <div>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
            placeholder="Enter password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;