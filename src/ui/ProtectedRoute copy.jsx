import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  // 1) load the authenticated user
  const { authData } = useAuth();
  console.log(!authData.user);

  // 3) If Not authenticated, navigate to login page
  if (!authData?.user) return <Navigate to={"/login"} />;
  // 4) if authenticated, render children
  if (authData.user) return <Outlet />;
}
