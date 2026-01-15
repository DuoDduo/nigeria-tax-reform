import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { accessToken, loading } = useAuth();

  if (loading) return <p className="p-6 text-center text-gray-700">Loading…</p>;
  if (!accessToken) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
