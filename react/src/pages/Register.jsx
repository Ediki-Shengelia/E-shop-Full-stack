import React, { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { path } from "../routes/path";
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
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" required onChange={handleChange} id="" />
        {validationErr.name ? <p>{validationErr.name}</p> : null}
        <br />
        <input
          type="email"
          name="email"
          required
          onChange={handleChange}
          id=""
        />
        {validationErr.email ? <p>{validationErr.email}</p> : null}
        <br />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          required
          id=""
        />
        {validationErr.password ? <p>{validationErr.password}</p> : null}
        <br />
        {err ? <p>{err}</p> : null}
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
