import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";


export default function ProtectedRoute({ children }) {
  const { isAuthed } = useAuth();
  if (!isAuthed) return <Navigate to="/auth" replace />;
  return children;
}
