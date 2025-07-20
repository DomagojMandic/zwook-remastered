import supabase from "./supabase";

/**
 * Fetches all artists from the database.
 * Used for displaying artist listings and populating cache.
 *
 * @returns {Promise<Array>} Array of artist objects
 * @throws {Error} If database query fails
 */
export async function getArtists() {
  const { data: artists, error } = await supabase.from("artists").select("*");

  if (error) {
    console.error("Supabase error:", error);
    throw new Error("Error while fetching artists:", error.message);
  }

  return artists;
}

/**
 * Fetches a single artist by their ID.
 * Used for artist detail pages when data is not in cache.
 *
 * @param {number} id - The artist ID
 * @returns {Promise<Object>} Artist object with all properties
 * @throws {Error} If artist not found or database query fails
 */
export async function getArtistById(id) {
  const { data: artist, error } = await supabase
    .from("artists")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Error while fetching artist by ID: ${error.message}`);
  }

  return artist;
}
