import { useQuery } from "@tanstack/react-query";
import { getAlbums } from "../services/apiAlbums";

function useAlbums() {
  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ["albums"],
    queryFn: getAlbums,
  });

  return { data, error, isLoading, isSuccess };
}

export default useAlbums;
