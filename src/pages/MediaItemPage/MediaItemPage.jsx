import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import FeaturedButton from "../../ui/Buttons/FeaturedButton";
import StyledTable from "../../ui/Table/StyledTable";
import StarRating from "../../ui/SimpleComponents/StarRating";

import StyledMediaItemPage from "./StyledMediaItemPage";
import SkeletonMediaItemPage from "./SkeletonMediaItemPage";
import PlaylistTable from "../PlaylistDetails/PlaylistTable";
import PlaylistRowItem from "../PlaylistDetails/PlaylistIRowItem";

import useMediaItem from "../../hooks/useMediaItem";
import MediaItemContent from "./MediaItemContent";
import ErrorPage from "../Errors/Error";

function MediaTestPage() {
  // Will be 0 or the already rated value later on
  const [userRating, setUserRating] = useState(0);

  // Will be used to fetch the media item based on type and ID
  const { type, mediaItemId } = useParams();
  const numberId = Number(mediaItemId); // Will be used in getting cached data;

  /* Receive data from the current album/song/artist and its
  corresponding songs then group them into objects for prop grouping */
  const {
    currentItem,
    songs,
    isCurrentItemLoading,
    isSongsLoading,
    isSongsSuccess,
    error,
  } = useMediaItem(type, numberId);

  /* Used for forwarding information to the child */
  const mediaData = {
    currentItem,
    type,
    songs,
    error,
  };

  const userActions = {
    userRating,
    onRatingChange: setUserRating,
  };

  const loadingStates = {
    isCurrentItemLoading,
    isSongsLoading,
    isSongsSuccess,
  };

  // Reset rating when mediaItemId changes when fetching a new item -
  // later on it will be stored in user obj
  useEffect(() => {
    setUserRating(0);
  }, [type, numberId]);

  // Show skeleton only if currentItem is loading
  if (isCurrentItemLoading) {
    return <SkeletonMediaItemPage type={type} />;
  }

  // Show content as soon as currentItem is available
  // Songs loading will be handled separately in MediaItemContent
  if (currentItem) {
    return (
      <MediaItemContent
        mediaData={mediaData}
        userActions={userActions}
        loadingStates={loadingStates}
      />
    );
  }

  // Error/fallback state
  return (
    <ErrorPage message="Media not found. Please check the URL or go back." />
  );
}

export default MediaTestPage;
