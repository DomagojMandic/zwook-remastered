import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createArtist } from "../services/apiArtists";

import toast from "react-hot-toast";

function useCreateArtists() {
  const queryClient = useQueryClient();

  const {
    mutate: createAnArtist,
    isLoading: isCreating,
    isSuccess,
  } = useMutation({
    mutationFn: createArtist,
    onSuccess: () => {
      toast.success("Artist created successfully! Add songs to it now.");
      queryClient.invalidateQueries({ queryKey: ["artists"] });
    },
    onError: (error) => {
      toast.error(`Something went wrong: ${error.message}`);
    },
  });

  return { createAnArtist, isCreating };
}

export default useCreateArtists;
