import { Link } from "react-router-dom";
import StyledContentGallery from "../ui/Artists&Albums/StyledContentGallery";

/**
 * Function to render each gallery item card - render props pattern
 * @param {object} item - The media item (album/artist/song)
 * @param {string} type - The type of media ("album" | "artist" | "song")
 * @returns {JSX.Element} Gallery card element
 */
export function renderGalleryItem(item, type) {
  return (
    <StyledContentGallery.Card key={item.id} to={`/media/${type}/${item.id}`}>
      <StyledContentGallery.Image
        src={item.cover_url}
        alt={item.title || item.name}
      />
      <StyledContentGallery.Content>
        <StyledContentGallery.Title>
          {item.title || item.name}
        </StyledContentGallery.Title>
        <StyledContentGallery.Subtitle>
          {type === "album" && item.artist}
          {type === "artist" && `${item.albums?.length || 0} albums`}
          {type === "song" && item.artist}
        </StyledContentGallery.Subtitle>
        <StyledContentGallery.Metadata>
          {type === "album" && (
            <>
              <StyledContentGallery.MetadataItem>
                {item.songs?.length || 0} songs
              </StyledContentGallery.MetadataItem>
              <StyledContentGallery.MetadataItem>
                {item.year || ""}
              </StyledContentGallery.MetadataItem>
            </>
          )}
          {type === "artist" && (
            <>
              <StyledContentGallery.MetadataItem>
                {item.songs?.length || 0} songs
              </StyledContentGallery.MetadataItem>
              <StyledContentGallery.MetadataItem>
                Artist
              </StyledContentGallery.MetadataItem>
            </>
          )}
          {type === "song" && (
            <>
              <StyledContentGallery.MetadataItem>
                {item.songTime || item.duration}
              </StyledContentGallery.MetadataItem>
              <StyledContentGallery.MetadataItem>
                {item.album}
              </StyledContentGallery.MetadataItem>
            </>
          )}
        </StyledContentGallery.Metadata>
      </StyledContentGallery.Content>
    </StyledContentGallery.Card>
  );
}
