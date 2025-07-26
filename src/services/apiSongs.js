import { editFileName } from "../helpers/helpers";
import supabase, { SUPABASE_URL } from "./supabase";

const SONG_BUCKET = "/storage/v1/object/public/audio/songs/";

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

export async function deleteSong(id) {
  const { data, error } = await supabase
    .from("songs")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Error while deleting song: ${error.message}`);
  }

  return data;
}

/**
 * Creates a new song in the database and uploads the audio file to Supabase storage.
 *
 * @param {Object} songData - Data for the new song including the audio file
 * @returns {Promise<Object>} Created song object
 * @throws {Error} If database insert or audio upload fails
 */
export async function createSong(songData) {
  const { file, fileName, ...rest } = songData;

  const clearFileName = editFileName(fileName);

  const audioURL = `${SUPABASE_URL}${SONG_BUCKET}${clearFileName}`;

  const uploadData = {
    ...rest,
    audio_url: audioURL,
  };

  console.log(uploadData);

  // Insert song data into the database
  const { data: songs, error: songError } = await supabase
    .from("songs")
    .insert([uploadData])
    .select();

  if (songError) {
    throw new Error("Error while creating song. Please try again.");
  }

  // Upload audio file to Supabase storage
  const { error: audioError } = await supabase.storage
    .from("songs")
    .upload(`/${clearFileName}`, file);

  if (audioError) {
    deleteSong(songs[0].id);
    throw new Error(`Audio upload failed and the song was not created`);
  }

  return songs[0];
}
