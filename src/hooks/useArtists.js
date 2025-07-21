import { useQuery } from "@tanstack/react-query";
import { getArtists } from "../services/apiArtists";

function useArtists() {
  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ["artists"],
    queryFn: getArtists,
  });

  return { data, error, isLoading, isSuccess };
}

export default useArtists;
