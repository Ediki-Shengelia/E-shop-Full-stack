import React, { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { path } from "../routes/path";import "../App.css";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [validationErr, setValidationErr] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");
 function validation(values) {
  const error = { name: "", email: "", password: "" };

  // 1. Check Name
  if (values.name.length < 5) {
    error.name = "Min 5 characters";
  }

  // 2. Check Email
  if (!values.email.includes("@gmail.com")) {
    error.email = "Gmail is required";
  } else if (values.email.split("@")[0].length < 5) {
    error.email = "Email must have at least 5 characters before @";
  }

  // 3. Check Password
  if (values.password.length < 6) {
    error.password = "Min 6 characters";
  }

  return error;
}
  function handleChange(e) {
    const { name, value } = e.target;
    const nextForm = { ...form, [name]: value };
    setForm(nextForm);
    const errors = validation(nextForm);
    setValidationErr(errors);
    setErr(null);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await register(form);
      navigate(path.dashboard, { replace: true });
    } catch (error) {
      setErr(error?.response?.data?.message || "Register failed");
    }
  }
  return (
    <div className="auth-page">
  <div className="auth-card">
    <h1 className="auth-title">Register</h1>
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Full Name</label>
        <input 
          type="text" 
          name="name" 
          className={`auth-input ${validationErr.name ? 'input-error' : ''}`}
          required 
          onChange={handleChange} 
          placeholder="John Doe"
        />
        {validationErr.name && <span className="validation-msg">{validationErr.name}</span>}
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          className={`auth-input ${validationErr.email ? 'input-error' : ''}`}
          required
          onChange={handleChange}
          placeholder="example@gmail.com"
        />
        {validationErr.email && <span className="validation-msg">{validationErr.email}</span>}
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          className={`auth-input ${validationErr.password ? 'input-error' : ''}`}
          onChange={handleChange}
          required
          placeholder="Min 6 characters"
        />
        {validationErr.password && <span className="validation-msg">{validationErr.password}</span>}
      </div>

      {err && <p className="error-text">{err}</p>}
      
      <button className="btn-auth">Create Account</button>
      
      <p className="auth-footer">
        Already have an account? <span onClick={() => navigate('/login')}>Login</span>
      </p>
    </form>
  </div>
</div>
  );
};

export default Register;
