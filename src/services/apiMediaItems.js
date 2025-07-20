import { useParams } from "react-router";
import { getAlbumById } from "./apiAlbums";
import { getArtistById } from "./apiArtists";
import { getSongById } from "./apiSongs";

/**
 * Fetches a media item (album or artist) by type and ID.
 * Used specifically for MediaItemPage to get detailed data based on URL params.
 * We cannot use hooks like useParams here, so we pass type and id as parameters.
 *
 * @param {string} type - The media type ('album' or 'artist')
 * @param {number} id - The media item ID
 * @returns {Promise<Object>} Media item object with all properties
 * @throws {Error} If media item not found or invalid type provided
 */
export async function getMediaItem(type, id) {
  switch (type) {
    case "album":
      return await getAlbumById(id);

    case "artist":
      return await getArtistById(id);
    case "song":
      return await getSongById(id);

    default:
      throw new Error(
        `Invalid media type: ${type}. Expected 'album' or 'artist'.`
      );
  }
}
