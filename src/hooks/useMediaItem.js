import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSongsByTypeAndId } from "../services/apiSongs";
import { getMediaItem } from "../services/apiMediaItems";

/**
 * Custom hook for fetching and managing media item data (songs, albums, artists).
 * Attempts to get data from React Query cache first, then falls back to API fetching.
 * For albums and artists, also fetches their associated songs.
 *
 * @param {string} type - The type of media item ('song', 'album', 'artist')
 * @param {number} id - The ID of the media item to fetch
 * @returns {object} Object containing mediaItem, songs, loading states, and error
 */
function useMediaItem(type, id) {
  const queryClient = useQueryClient();
  let cachedItem = null; // Explicitly initialize

  switch (type) {
    case "song":
      // Attempt to get the song from cache
      cachedItem = queryClient
        .getQueryData(["songs"])
        ?.find((song) => song.id === id);
      break;
    case "album":
      // Attempt to get the album from cache
      cachedItem = queryClient
        .getQueryData(["albums"])
        ?.find((album) => album.id === id);
      break;
    case "artist":
      //Attempt to get the artist from cache
      cachedItem = queryClient
        .getQueryData(["artists"])
        ?.find((artist) => artist.id === id);
      break;
    default:
      throw new Error("Invalid type. Must be 'song', 'album', or 'artist'");
  }

  // Fetch media item if it's not in the cache
  const {
    data: fetchedMediaItem,
    isLoading: isMediaItemLoading,
    error: mediaItemError,
  } = useQuery({
    queryKey: [type, id],
    queryFn: () => getMediaItem(type, id),
    enabled: !cachedItem, // Fetch only if there's no cache
  });

  // Use cached item if available, otherwise use fetched item
  const currentItem = cachedItem || fetchedMediaItem;

  // If cached item is of type album or artist, fetching their songs will be enabled
  const {
    data: songs,
    isLoading: isSongsLoading,
    isSuccess: isSongsSuccess,
    error: songError,
  } = useQuery({
    queryKey: ["songs", type, id],
    queryFn: () => getSongsByTypeAndId(type, id),
    enabled: (type === "album" || type === "artist") && !!currentItem,
  });

  // If cached item is type song, return it directly

  return {
    currentItem, // Always exists, either from cache or fetched
    songs: songs || [],
    isCurrentItemLoading: isMediaItemLoading || false,
    isSongsLoading,
    isSongsSuccess,
    error: mediaItemError || songError || null,
  };
}

export default useMediaItem;
