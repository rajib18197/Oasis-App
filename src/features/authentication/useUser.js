import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const {
    data: user,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    user,
    isPending,
    isError,
    error,
    isAuthenticated: user?.role === "authenticated",
  };
}
