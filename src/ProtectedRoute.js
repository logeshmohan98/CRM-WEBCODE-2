import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const token = sessionStorage.getItem("token");
  return token ? (
    <div>
      {children}
    </div>
  ) : (
    <Navigate replace to="/admin/login" />
  );
}
