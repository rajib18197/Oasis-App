import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const results = useMutation({
    mutationFn: createUpdateCabin,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },

    onError: (err) => {
      console.log(err);
    },
  });

  // console.log(results);

  const {
    mutate: createCabin,
    isPending: isCreating,
    isError,
    error,
  } = results;
  return { createCabin, isCreating, isError, error };
}
