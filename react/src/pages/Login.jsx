import React, { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { path } from "../routes/path";
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
    <div>
      <h1>Login</h1>
     <form action="" onSubmit={handleSubmit}>
       <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        id=""
        required
      />
      <br />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        id=""
        required
      />
      <br />
      {err ? <p style={{ color: "red" }}>{err}</p> : null}
      <button>Login</button>
     </form>
    </div>
  );
};

export default Login;
