import supabase, { SUPABASE_URL } from "./supabase";

/* Not used for uploading!!! */
const ARTIST_BUCKET = "/storage/v1/object/public/images/covers/artists/";

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

export async function deleteArtist(id) {
  const { data, error } = await supabase
    .from("artists")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Error while deleting artist: ${error.message}`);
  }

  return data;
}

/**
 * Creates a new artist in the database and uploads cover image to Supabase storage.
 *
 * Creating a full image URL. Replace all "/" so it doesn't create
 * another nested folder in the storage bucket. We spread the data
 * from the artistData to upload without the coverName and the uploaded
 * file.
 *
 * @param {Object} artistData - Data for the new artist including the image file
 * @returns {Promise<Object>} Created artist object
 * @throws {Error} If database insert or image upload fails
 */

export async function createArtist(artistData) {
  const { file, coverName, ...rest } = artistData;

  // Remove slashes from file name to prevent nested folders
  const imageName = coverName.replaceAll("/", "");

  // Build public image URL for storage (used in DB only)
  const imageUrl = `${SUPABASE_URL}${ARTIST_BUCKET}${imageName}`;

  // Prepare artist data to insert as a row (without file)
  const uploadData = {
    ...rest,
    cover_url: imageUrl,
  };

  console.log(uploadData);

  // Insert artist data into the database
  const { data: artists, error: artistError } = await supabase
    .from("artists")
    .insert(uploadData)
    .select()
    .single();

  if (artistError) {
    throw new Error(`Error while creating artist: ${error.message}`);
  }

  // Upload image to Supabase storage under 'images/covers/albums/imageName'
  const { error: imageError } = await supabase.storage
    .from("images") // The bucket name
    .upload(`covers/artists/${imageName}`, file);

  /* If image upload fails, delete the album and throw an error */
  if (imageError) {
    deleteArtist(artists[0].id);
    throw new Error(`Image upload failed and the artist was not created`);
  }
}
