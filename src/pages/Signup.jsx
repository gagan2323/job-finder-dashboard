import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError("Please fill all fields");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Fake signup for now (replace with API call later)
    const userData = { name: form.name, email: form.email };
    login(userData);
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>🚀 Create Account</h2>
        <p className="auth-subtitle">Join Job Finder today</p>

        {error && <p className="auth-error">{error}</p>}

        <div className="auth-form">
          <input
            className="auth-input"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Password (min 6 chars)"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button className="auth-btn" onClick={handleSubmit}>
            Sign Up 🎉
          </button>
        </div>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;