import { useQuery } from "@tanstack/react-query";

import ContentGallery from "../../ui/Artists&Albums/ContentGallery";
import useAlbums from "../../hooks/useAlbums";
import SkeletonContentGalleryComponent from "../../ui/Artists&Albums/SkeletonContentGallery";
import { renderGalleryItem } from "../../utils/renderGalleryItem";

function Albums() {
  const { data: albums, error, isLoading, isSuccess } = useAlbums();
  const type = "album";

  if (isLoading) {
    return <SkeletonContentGalleryComponent />;
  }

  /* Type is always album here */
  return (
    <ContentGallery
      items={albums}
      type={type}
      render={renderGalleryItem}
      title="Albums"
    />
  );
}

export default Albums;
