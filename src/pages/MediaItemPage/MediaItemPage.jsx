import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import FeaturedButton from "../../ui/Buttons/FeaturedButton";
import StyledTable from "../../ui/Table/StyledTable";
import StyledMediaItemPage from "./StyledMediaItemPage";
import PlaylistTable from "../PlaylistDetails/PlaylistTable";
import PlaylistRowItem from "../PlaylistDetails/PlaylistIRowItem";

import useMoveBack from "../../hooks/useMoveBack";

import podcastMockData from "../../data/podcastMockData";

import StarRating from "../../ui/SimpleComponents/StarRating";

// Function to render each song row in the table - render props

/**
 *
 * @param {object} song
 * @param {number} index
 * @returns HTML element for the song row
 */
function renderSongsTable(song, index) {
  return (
    <StyledTable.Row
      as={Link}
      to={`/media/${song.type}/${song.id}`}
      key={song.id}
      columns="3rem repeat(4, 1fr)"
    >
      <PlaylistRowItem item={song} index={index} key={index} />
    </StyledTable.Row>
  );
}

function MediaTestPage() {
  // Will be 0 or the already rated value later on
  const [userRating, setUserRating] = useState(0);

  const { type, mediaItemId } = useParams();
  const navigateBack = useMoveBack();
  const numId = Number(mediaItemId); // Will be used in React Query later on

  // Reset rating when mediaItemId changes when fetching a new item
  useEffect(() => {
    setUserRating(0);
  }, [numId]);

  // Delete after React Query is implemented
  let mediaItem = podcastMockData.find((item) => item.id === numId);

  // If not found and type is "song", search in nested songs arrays
  if (!mediaItem && type === "song") {
    for (const item of podcastMockData) {
      if (item.songs) {
        const foundSong = item.songs.find((song) => song.id === numId);
        if (foundSong) {
          mediaItem = foundSong;
          break;
        }
      }
    }
  }

  if (!mediaItem) {
    return (
      <StyledMediaItemPage>
        <div>
          <FeaturedButton onClick={navigateBack} size="medium">
            Back
          </FeaturedButton>
        </div>
        <p>Media item not found</p>
      </StyledMediaItemPage>
    );
  }

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
        <StyledMediaItemPage.Image src={mediaItem.backgroundImage} />
        <StyledMediaItemPage.DetailsWrapper>
          {/* Type indicator - SONG/ALBUM/ARTIST*/}
          <StyledMediaItemPage.Type>{type}</StyledMediaItemPage.Type>

          <StyledMediaItemPage.Title>
            {mediaItem.title}
          </StyledMediaItemPage.Title>

          {/* Description section */}
          <StyledMediaItemPage.Description>
            {mediaItem.description}
          </StyledMediaItemPage.Description>

          {/* Metadata section - SONG/ALBUM/ARTIST */}
          <StyledMediaItemPage.Metadata>
            {mediaItem.songs && <span>{mediaItem.songs.length} songs</span>}
            {mediaItem.duration && <span>{mediaItem.songTime}</span>}
            {mediaItem.album && <span>Album: {mediaItem.album}</span>}
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
              onRatingChange={setUserRating}
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
      {type === "album" || type === "artist" ? (
        <PlaylistTable items={mediaItem.songs} render={renderSongsTable} />
      ) : null}
    </StyledMediaItemPage>
  );
}

export default MediaTestPage;
