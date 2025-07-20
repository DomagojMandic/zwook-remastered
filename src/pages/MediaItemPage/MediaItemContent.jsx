import StyledMediaItemPage from "./StyledMediaItemPage";

import PlaylistTable from "../PlaylistDetails/PlaylistTable";

import StarRating from "../../ui/SimpleComponents/StarRating";
import FeaturedButton from "../../ui/Buttons/FeaturedButton";
import useMoveBack from "../../hooks/useMoveBack";
import { renderSongsTable } from "../../utils/renderSongsTable";

function MediaItemContent({
  mediaData: { currentItem, songs, type },
  userActions: { userRating, onRatingChange },
  loadingStates: { isSongsLoading, isSongsSuccess },
}) {
  const navigateBack = useMoveBack();
  const hasSongs = (type === "album" || type === "artist") && songs?.length > 0;

  return (
    <StyledMediaItemPage>
      <div
        style={{
          marginLeft: "clamp(1rem, 2.5vw, 4rem)",
          marginRight: "clamp(1rem, 2.5vw, 4rem)",
        }}
      >
        <FeaturedButton onClick={navigateBack} size="medium">
          Back
        </FeaturedButton>
      </div>

      <StyledMediaItemPage.Container>
        <StyledMediaItemPage.Image src={currentItem.cover_url} />
        <StyledMediaItemPage.DetailsWrapper>
          {/* Type indicator - SONG/ALBUM/ARTIST*/}
          <StyledMediaItemPage.Type>{type}</StyledMediaItemPage.Type>

          <StyledMediaItemPage.Title>
            {currentItem.title}
          </StyledMediaItemPage.Title>

          {/* Description section */}
          <StyledMediaItemPage.Description>
            {currentItem.description}
          </StyledMediaItemPage.Description>

          {/* Metadata section - SONG/ALBUM/ARTIST */}
          <StyledMediaItemPage.Metadata>
            {currentItem.songs && <span>{currentItem.songs.length} songs</span>}
            {currentItem.duration && <span>{currentItem.duration}</span>}
            {currentItem.album && <span>Album: {currentItem.album}</span>}
          </StyledMediaItemPage.Metadata>
          <div style={{ marginTop: "16px" }}>
            <div
              style={{
                marginBottom: "0.8rem",
                fontSize: "1.4rem",
                fontWeight: "600",
              }}
            >
              Rate the {type}:
            </div>
            <StarRating
              rating={userRating}
              onRatingChange={onRatingChange}
              type={type}
            />
          </div>

          {/* Action buttons */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            <FeaturedButton size="medium">Add to Playlist</FeaturedButton>
            <FeaturedButton size="medium">Favourite</FeaturedButton>
          </div>
        </StyledMediaItemPage.DetailsWrapper>
      </StyledMediaItemPage.Container>

      {/* Table for type = albums/artists, type = song will not have it  */}

      {hasSongs && isSongsSuccess && (
        <PlaylistTable items={songs} render={renderSongsTable} />
      )}
    </StyledMediaItemPage>
  );
}

export default MediaItemContent;
