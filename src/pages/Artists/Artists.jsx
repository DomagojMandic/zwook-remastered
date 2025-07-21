import ContentGallery from "../../ui/Artists&Albums/ContentGallery";
import useArtists from "../../hooks/useArtists";
import SkeletonContentGalleryComponent from "../../ui/Artists&Albums/SkeletonContentGallery";
import { renderGalleryItem } from "../../utils/renderGalleryItem";

function Artists() {
  const { data: artists, error, isLoading, isSuccess } = useArtists();

  const handleCreateArtist = () => {
    // TODO: Implement create artist functionality
    console.log("Create artist clicked");
  };

  if (isLoading) {
    return <SkeletonContentGalleryComponent />;
  }

  /* Type is always artist here */
  return (
    <ContentGallery
      items={artists}
      type="artist"
      render={renderGalleryItem}
      title="Artists"
      createButtonText="Create Artist"
      onCreateClick={handleCreateArtist}
    />
  );
}

export default Artists;
