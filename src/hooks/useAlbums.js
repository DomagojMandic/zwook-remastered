import { useQuery } from "@tanstack/react-query";
import { getAlbums } from "../services/apiAlbums";

function useAlbums() {
  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ["albums"],
    queryFn: getAlbums,
    staleTime: 5 * 60 * 1000, // Stops the refetch on page load for 5 minutes
    cacheTime: 10 * 60 * 1000, // Stops the refetch on page load for 10 minutes
  });

  return { data, error, isLoading, isSuccess };
}

export default useAlbums;
