import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData(["user"], data?.user);
      navigate("/cabins");
    },

    onError: (err) => {
      console.log(err);
    },
  });

  return { login, isPending, isError, error };
}
