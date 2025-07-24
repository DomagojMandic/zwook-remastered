import ContentGallery from "../../ui/Artists&Albums/ContentGallery";
import useArtists from "../../hooks/useArtists";
import SkeletonContentGalleryComponent from "../../ui/Artists&Albums/SkeletonContentGallery";
import { renderGalleryItem } from "../../utils/renderGalleryItem";

function Artists() {
  const { data: artists, error, isLoading, isSuccess } = useArtists();
  const type = "artist";

  if (isLoading) {
    return <SkeletonContentGalleryComponent />;
  }

  /* Type is always artist here */
  return (
    <ContentGallery
      items={artists}
      render={renderGalleryItem}
      title="Artists"
      type={type}
    />
  );
}

export default Artists;
