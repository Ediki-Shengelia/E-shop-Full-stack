import { createContext, useEffect, useState } from "react";
import { api } from "../lib/api";

export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancalled = false;
    async function loadUser() {
      const token = localStorage.getItem("token");
      if (!token) {
        if (!cancalled) {
          setLoading(false);
          return;
        }
      }
      try {
        const res = await api.get("/api/user");
        if (!cancalled) setUser(res.data);
      } catch (error) {
        localStorage.removeItem("token");
        if (!cancalled) setUser(null);
      } finally {
        if (!cancalled) setLoading(false);
      }
    }
    loadUser();
  }, []);
async function register(payload) {
  setLoading(true);
  try {
    const res = await api.post("api/register", payload);
    
    // Save to local storage
    localStorage.setItem("token", res.data.token);
    
    // Update state
    setUser(res.data.user);
    
    // RETURN the fresh data from the response, not the state variable
    return res.data.user; 
    
  } catch (error) {
    // Re-throw the error so handleSubmit can catch it and setErr()
    throw error; 
  } finally {
    setLoading(false);
  }
}
  async function login(payload) {
    setLoading(true);
    try {
      const res = await api.post("api/login", payload);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      return user;
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  async function logout() {
    setLoading(true);
    try {
      await api.post("api/logout");
    } catch (error) {
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      setLoading(false);
    }
  }
  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
