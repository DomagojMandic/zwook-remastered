import supabase, { SUPABASE_URL } from "./supabase";

/* Not used for uploading!!!! */
const ALBUM_BUCKET = "/storage/v1/object/public/images/covers/albums/";

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

export async function deleteAlbum(id) {
  const { error } = await supabase.from("albums").delete().eq("id", id);

  if (error) {
    throw new Error(`Error while deleting album: ${error.message}`);
  }
}

/**
 * Creates a new album in the database and uploads cover image to Supabase storage.
 *
 * Creating a full image URL. Replace all "/" so it doesn't create
 * another nested folder in the storage bucket. We spread the data
 * from the albumData to upload without the coverName and the uploaded
 * file.
 *
 * @param {Object} albumData - Data for the new album including the image file
 * @returns {Promise<Object>} Created album object
 * @throws {Error} If database insert or image upload fails
 */
export async function createAlbum(albumData) {
  const { file, coverName, ...rest } = albumData;

  // Remove slashes from file name to prevent nested folders
  const imageName = coverName.replaceAll("/", "");

  // Build public image URL for storage (used in DB only)
  const imageUrl = `${SUPABASE_URL}${ALBUM_BUCKET}${imageName}`;

  // Prepare album data to insert as a row (without file)
  const uploadData = {
    ...rest,
    cover_url: imageUrl,
  };

  // Insert album data into the database
  const { data: albums, error: albumError } = await supabase
    .from("albums")
    .insert([uploadData])
    .select();

  if (albumError) {
    throw new Error("Error while creating album. Please try again.");
  }

  // Upload image to Supabase storage under 'images/covers/albums/imageName'
  const { error: imageError } = await supabase.storage
    .from("images") // The bucket name
    .upload(`covers/albums/${imageName}`, file);

  /* If image upload fails, delete the album and throw an error */
  if (imageError) {
    deleteAlbum(albums[0].id);
    throw new Error(`Image upload failed and the album was not created`);
  }
}
