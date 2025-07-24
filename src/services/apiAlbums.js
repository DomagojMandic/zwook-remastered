import supabase, { SUPABASE_URL } from "./supabase";

const ARTIST_BUCKET = "/storage/v1/object/public/images/covers/albums/";

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

export async function createAlbum(albumData) {
  /* Creating a full image URL. Replace all "/" so it doesn't create
     another nested folder */
  const imageName = albumData.coverName.replaceAll("/", "");
  const imageUrl = `${SUPABASE_URL + ARTIST_BUCKET + imageName}`;

  console.log("ImageURL: ", imageUrl, { ...albumData, coverUrl: imageUrl });

  /* const { data, error } = await supabase
    .from("albums")
    .insert([{ ...albumData, coverUrl: imageUrl }])
    .select(); */

  console.log("dođe li do ovdje?");
  if (error) {
    throw new Error(`Error while creating album. Please try again later.`);
  }

  return data;
}
