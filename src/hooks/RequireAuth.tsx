import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import React from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useAuth();

  if (auth.token === "") {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
