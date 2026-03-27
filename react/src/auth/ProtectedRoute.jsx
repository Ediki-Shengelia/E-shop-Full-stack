import React, { useContext } from "react";
import { path } from "../routes/path";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import {CircleLoader} from 'react-spinners'
const ProtectedRoute = ({ children }) => {
  const { user,loading } = useContext(AuthContext);
  if(loading)return <CircleLoader color="green"/>
  if (!user) return <Navigate to={path.login} replace />;
  return children;
};

export default ProtectedRoute;
