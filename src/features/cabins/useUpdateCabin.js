import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCabin } from "../../services/apiCabins";

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const {
    mutate: updateCabin,
    isPending: isUpdating,
    isError,
    error,
  } = useMutation({
    // mutationFn: ({ id, newCabin }) => createUpdateCabin({ id, newCabin }),
    mutationFn: createUpdateCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },

    onError: (err) => {
      console.error(err);
    },
  });

  return { updateCabin, isUpdating, isError, error };
}
