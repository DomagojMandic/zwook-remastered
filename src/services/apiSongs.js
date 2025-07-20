import supabase from "./supabase";

/**
 * Fetches all songs from the database with album cover URLs.
 * Joins with albums table to get cover_url and flattens the result.
 *
 * @returns {Promise<Array>} Array of song objects with cover_url property
 * @throws {Error} If database query fails
 */
export async function getSongs() {
  const { data: songs, error } = await supabase.from("songs").select(`
      *,
      albums(cover_url)
    `);

  if (error) {
    console.error("Supabase error:", error);
    throw new Error("Error while fetching songs:", error.message);
  }

  // Flattens the object and adds cover_url directly to the song
  const flattenedSongs = songs.map((song) => {
    const { albums, ...songData } = song;
    return {
      ...songData,
      cover_url: albums?.cover_url || null,
    };
  });

  return flattenedSongs;
}

/**
 * Fetches a single song by its ID.
 * Used for fetching songs when data is not in cache.
 *
 * @param {number} id - The album ID
 * @returns {Promise<Object>} Song object with all properties
 * @throws {Error} If song not found or database query fails
 */

export async function getSongById(id) {
  const { data: song, error } = await supabase
    .from("songs")
    .select(
      `*,
      albums(cover_url)
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Error while fetching song by ID: ${error.message}`);
  }

  // Flatten the object and add cover_url directly to the song
  const { albums, ...songData } = song;
  const flattenedSong = {
    ...songData,
    cover_url: albums?.cover_url || null,
  };

  return flattenedSong;
}

/**
 * Fetches songs belonging to a specific album or artist.
 * Used for displaying tracklists on media item detail pages.
 *
 * @param {string} type - The media type: 'album' or 'artist'
 * @param {number} id - The ID of the album or artist
 * @returns {Promise<Array>} Array of songs for the specified media item
 * @throws {Error} If type is invalid or database query fails
 */
export async function getSongsByTypeAndId(type, id) {
  let query = supabase.from("songs").select("*, albums(cover_url)");

  switch (type) {
    case "album":
      query = query.eq("album_id", id);
      break;
    case "artist":
      query = query.eq("artist_id", id);
      break;
    default:
      throw new Error("Invalid type. Must be 'album' or 'artist'");
  }

  const { data: songs, error } = await query;

  if (error) {
    throw new Error(
      `Error while fetching songs by ${type} ID: ${error.message}`
    );
  }

  // Flatten the objects and add cover_url directly to each song
  const flattenedSongs = songs.map((song) => {
    const { albums, ...songData } = song;
    return {
      ...songData,
      cover_url: albums?.cover_url || null,
    };
  });

  return flattenedSongs;
}
