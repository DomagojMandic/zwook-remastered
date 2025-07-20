import supabase from "./supabase";

/**
 * Fetches all albums from the database.
 * Used for displaying album listings and populating cache.
 *
 * @returns {Promise<Array>} Array of album objects
 * @throws {Error} If database query fails
 */
export async function getAlbums() {
  const { data: albums, error } = await supabase.from("albums").select("*");

  if (error) {
    console.log("Error while fetching albums:", error.message);
  }

  return albums;
}

/**
 * Fetches a single album by its ID.
 * Used for album detail pages when data is not in cache.
 *
 * @param {number} id - The album ID
 * @returns {Promise<Object>} Album object with all properties
 * @throws {Error} If album not found or database query fails
 */
export async function getAlbumById(id) {
  const { data: album, error } = await supabase
    .from("albums")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Error while fetching album by ID: ${error.message}`);
  }

  return album;
}
