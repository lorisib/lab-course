import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roles }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/" replace />;
  }

  const userRole = user?.roles?.[0];

  
  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}