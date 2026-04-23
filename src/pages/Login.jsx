import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill all fields");
      return;
    }

    // Fake login for now (replace with API call later)
    const userData = { name: form.email.split("@")[0], email: form.email };
    login(userData);
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>💼 Welcome Back</h2>
        <p className="auth-subtitle">Login to your Job Finder account</p>

        {error && <p className="auth-error">{error}</p>}

        <div className="auth-form">
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
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button className="auth-btn" onClick={handleSubmit}>
            Login 🚀
          </button>
        </div>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;