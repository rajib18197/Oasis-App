import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteCabin,
    isPending: isDeleting,
    isError,
    error,
  } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },

    onError: (err) => {
      console.error(err);
    },
  });

  return { deleteCabin, isDeleting, isError, error };
}
