import { getSongs } from "../services/apiSongs";
import { useQuery } from "@tanstack/react-query";

function useSongs() {
  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ["songs"],
    queryFn: getSongs,
  });

  return { data, error, isLoading, isSuccess };
}

export default useSongs;
