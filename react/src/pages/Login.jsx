import React, { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { path } from "../routes/path";import "../App.css";
const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErr("");
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(form);
      navigate(path.dashboard, { replace: true });
    } catch (error) {
      setErr(
        error?.response?.data?.message || error?.message || "Login failed",
      );
    }
  }
  return (
   <div className="auth-page">
  <div className="auth-card">
    <h1 className="auth-title">Login</h1>
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          className="auth-input"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="example@gmail.com"
        />
      </div>
      
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="auth-input"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="••••••••"
        />
      </div>

      {err && <p className="error-text">{err}</p>}
      
      <button className="btn-auth">Sign In</button>
      
      <p className="auth-footer">
        Don't have an account? <span onClick={() => navigate('/register')}>Register</span>
      </p>
    </form>
  </div>
</div>
  );
};

export default Login;
