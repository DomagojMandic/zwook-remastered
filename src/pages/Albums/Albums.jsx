import { useQuery } from "@tanstack/react-query";

import ContentGallery from "../../ui/Artists&Albums/ContentGallery";
import useAlbums from "../../hooks/useAlbums";
import SkeletonContentGalleryComponent from "../../ui/Artists&Albums/SkeletonContentGallery";
import { renderGalleryItem } from "../../utils/renderGalleryItem";

function Albums() {
  const { data: albums, error, isLoading, isSuccess } = useAlbums();

  const handleCreateAlbum = () => {
    // TODO: Implement create album functionality
    console.log("Create album clicked");
  };

  if (isLoading) {
    return <SkeletonContentGalleryComponent />;
  }

  /* Type is always album here */
  return (
    <ContentGallery
      items={albums}
      type="album"
      render={renderGalleryItem}
      title="Albums"
      createButtonText="Create Album"
      onCreateClick={handleCreateAlbum}
    />
  );
}

export default Albums;
