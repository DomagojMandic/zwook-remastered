import supabase from "./supabase";

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

export async function getSongById(songId) {}
