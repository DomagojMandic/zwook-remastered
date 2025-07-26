import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSong } from "../services/apiSongs";

import toast from "react-hot-toast";

function useCreateSongs() {
  const queryClient = useQueryClient();

  const {
    mutate: createASong,
    isLoading: isCreating,
    isSuccess,
  } = useMutation({
    mutationFn: createSong,
    onSuccess: () => {
      toast.success("Song created successfully!");
      queryClient.invalidateQueries({ queryKey: ["songs"] });
    },
    onError: (error) => {
      toast.error(`Something went wrong: ${error.message}`);
    },
  });

  return { createASong, isCreating };
}

export default useCreateSongs;
