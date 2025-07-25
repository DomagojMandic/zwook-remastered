import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAlbum } from "../services/apiAlbums";
import toast from "react-hot-toast";

function useCreateAlbums() {
  const queryClient = useQueryClient();

  const {
    mutate: createAnAlbum,
    isLoading: isCreating,
    isSuccess,
  } = useMutation({
    mutationFn: createAlbum,
    onSuccess: () => {
      toast.success("Album created successfully! Add songs to it now.");
      queryClient.invalidateQueries({ queryKey: ["albums"] });
    },
    onError: (error) => {
      toast.error(`Something went wrong: ${error.message}`);
    },
  });

  return { createAnAlbum, isCreating };
}

export default useCreateAlbums;
