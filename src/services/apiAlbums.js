import supabase from "./supabase";

export async function getAlbums() {
  const { data: albums, error } = await supabase.from("albums").select("*");

  if (error) {
    console.log("Error while fetching albums:", error.message);
  }

  return albums;
}
