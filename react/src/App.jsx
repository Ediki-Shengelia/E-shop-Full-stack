import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Nav from "./navigation/Nav";
import { Route, Routes } from "react-router-dom";
import { path } from "./routes/path";
import ShowCard from "./pages/ShowCard";
import ProtectedRoute from "./auth/ProtectedRoute";
import GuestRoute from "./auth/GuestRoute";
function App() {
  return (
    <>
      <Routes>
        <Route element={<Nav />}>
          <Route
            element={
              <GuestRoute>
                <Home />
              </GuestRoute>
            }
            path={path.home}
          />
          <Route
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
            path={path.login}
          />
          <Route
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
            path={path.register}
          />
        </Route>
        <Route
          path={path.dashboard}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={path.show}
          element={
            <ProtectedRoute>
              <ShowCard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
