import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1) load the user data
  const { user, isPending, isError, error, isAuthenticated } = useUser();
  console.log(user);

  // 3) if not authenticated, then redirect to login
  useEffect(
    function () {
      if (!isPending && !isAuthenticated) {
        navigate("/login");
      }
    },
    [isPending, isAuthenticated, navigate]
  );
  // 2) render spinner, if loading,
  if (isPending) return <Spinner />;

  // 4) If user data available then render the desired page
  if (isAuthenticated) return children;
}
