// ===================================================================
// 📁 MediaItemContent.jsx - UI COMPONENT THAT STARTS PLAYBACK
// ===================================================================
// This component shows song/album/artist details and has a Play button.
// When user clicks Play, this component figures out what to play
// and dispatches the right Redux actions to start playback.

import StyledMediaItemPage from "./StyledMediaItemPage";
import PlaylistTable from "../PlaylistDetails/PlaylistTable";
import StarRating from "../../ui/SimpleComponents/StarRating";
import FeaturedButton from "../../ui/Buttons/FeaturedButton";
import { FaPlay, FaPause } from "react-icons/fa";
import useMoveBack from "../../hooks/useMoveBack";
import { renderSongsTable } from "../../utils/renderSongsTable";
import { useDispatch, useSelector } from "react-redux";
import {
  loadTrack, // Action to load new song/playlist
  playTrack, // Action to resume playing
  pauseTrack, // Action to pause
} from "../../redux-slices/audioReducer";
import { useMemo } from "react";
import { formatTime } from "../../helpers/helpers";

// COMPONENT PROPS STRUCTURE:
// mediaData: {
//   currentItem: {id, title, description, cover_url, audio_url, ...},  // Song/Album/Artist details
//   songs: [...],                                                     // Songs in album/artist
//   type: "song" | "album" | "artist"                                 // What kind of item this is
// }
// userActions: {
//   userRating: number,                    // User's rating of this item
//   onRatingChange: function               // Callback when rating changes
// }
// loadingStates: {
//   isSongsLoading: boolean,               // Are songs still loading?
//   isSongsSuccess: boolean                // Did songs load successfully?
// }

function MediaItemContent({
  mediaData: { currentItem, songs, type },
  userActions: { userRating, onRatingChange },
  loadingStates: { isSongsLoading, isSongsSuccess },
}) {
  // NAVIGATION: Hook to go back to previous page
  const navigateBack = useMoveBack();

  // REDUX: Get dispatch function to send actions
  const dispatch = useDispatch();

  // REDUX: Get current audio state from store
  const audioState = useSelector((state) => state.audio);

  // LOGIC: Does this item have songs to play?
  // Albums and artists have song lists, individual songs don't
  const hasSongs = (type === "album" || type === "artist") && songs?.length > 0;

  // ===================================================================
  // MAIN PLAY HANDLER
  // ===================================================================
  function handlePlay() {
    // STEP 1: Get current state information
    const currentTrackId = audioState.currentTrack?.id; // What song is currently loaded?
    const isPlaying = audioState.isPlaying; // Is it currently playing?

    // ===================================================================
    // CASE A: ALBUM/ARTIST (Multiple songs - Playlist mode)
    // ===================================================================
    if ((type === "album" || type === "artist") && songs.length > 0) {
      const firstSongId = songs[0].id; // First song in the list

      // DECISION: Is the same album/artist already loaded?
      if (currentTrackId === firstSongId) {
        // YES - Same playlist is loaded, just toggle play/pause
        if (isPlaying) {
          dispatch(pauseTrack()); // PAUSE: Tell Redux to pause
          // This will trigger AudioPlayer to call audioRef.current.pause()
        } else {
          dispatch(playTrack()); // PLAY: Tell Redux to resume playing
          // This will trigger AudioPlayer to call audioRef.current.play()
        }
        return; // STOP HERE - don't load new playlist
      }

      // NO - Different album/artist, need to load new playlist

      // STEP 2: Transform songs data for audio player
      // The songs come with 'audio_url' but AudioPlayer expects 'src'
      const mappedPlaylist = songs.map((song) => {
        const { audio_url, ...restSong } = song; // Extract audio_url from song
        return { ...restSong, src: audio_url }; // Add it back as 'src'
      });
      // AudioPlayer uses 'src' to set audioRef.current.src
      // But the API returns 'audio_url' so we need to convert

      // STEP 3: Dispatch loadTrack action to start new playlist
      dispatch(
        loadTrack({
          song: mappedPlaylist[0], // First song becomes currentTrack
          playlist: mappedPlaylist, // Store entire playlist for auto-advance
          playingType: "playlist", // Tell AudioPlayer this is playlist mode
          autoPlay: true, // Start playing immediately after loading
        })
      );

      // WHAT HAPPENS NEXT:
      // 1. Redux state updates with new currentTrack
      // 2. AudioPlayer detects currentTrack change
      // 3. AudioPlayer loads first song and starts playing
      // 4. When first song ends, AudioPlayer auto-advances to next song
    }

    // ===================================================================
    // CASE B: SINGLE SONG
    // ===================================================================
    if (type === "song") {
      // DECISION: Is the same song already loaded?
      if (currentTrackId === currentItem.id) {
        // YES - Same song is loaded, just toggle play/pause
        if (isPlaying) {
          dispatch(pauseTrack()); // PAUSE: Tell Redux to pause
        } else {
          dispatch(playTrack()); // PLAY: Tell Redux to resume playing
        }
        return; // don't load same song again
      }

      //Different song, need to load it

      // STEP 2: Transform song data for audio player
      const { audio_url, ...restCurrentItem } = currentItem; // Extract audio_url

      // STEP 3: Dispatch loadTrack action to start new song
      dispatch(
        loadTrack({
          song: { ...restCurrentItem, src: audio_url }, // Song with 'src' property
          playingType: "single", // Tell AudioPlayer this is single mode
          autoPlay: true, // Start playing immediately
        })
      );

      // WHAT HAPPENS NEXT:
      // 1. Redux state updates with new currentTrack
      // 2. AudioPlayer detects currentTrack change
      // 3. AudioPlayer loads song and starts playing
      // 4. When song ends, AudioPlayer stops (no auto-advance in single mode)
    }
  }

  /* Memoizing the PlaylistTable.jsx so it doesn't re-render every second. */
  const memoizedPlaylistTable = useMemo(() => {
    if (!hasSongs && !isSongsSuccess) return null;

    return <PlaylistTable items={songs} render={renderSongsTable} />;
  }, [hasSongs, isSongsSuccess, songs]);

  // ===================================================================
  // RENDER:  UI
  // ===================================================================
  return (
    <StyledMediaItemPage>
      {/* BACK BUTTON */}
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

      {/* MAIN CONTENT AREA */}
      <StyledMediaItemPage.Container>
        {/* COVER IMAGE */}
        <StyledMediaItemPage.Image src={currentItem.cover_url} />

        <StyledMediaItemPage.DetailsWrapper>
          {/* TYPE INDICATOR - Shows "SONG" or "ALBUM" or "ARTIST" */}
          <StyledMediaItemPage.Type>{type}</StyledMediaItemPage.Type>

          {/* TITLE */}
          <StyledMediaItemPage.Title>
            {currentItem.title}
          </StyledMediaItemPage.Title>

          {/* DESCRIPTION */}
          <StyledMediaItemPage.Description>
            {currentItem.description}
          </StyledMediaItemPage.Description>

          {/* METADATA - Shows song count, duration, album name, etc. */}
          <StyledMediaItemPage.Metadata>
            {currentItem.songs && <span>{currentItem.songs.length} songs</span>}
            {currentItem.duration && (
              <span>{formatTime(currentItem.duration)}</span>
            )}
            {currentItem.album && <span>Album: {currentItem.album}</span>}
          </StyledMediaItemPage.Metadata>

          {/* RATING SECTION */}
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

          {/* ACTION BUTTONS */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            <FeaturedButton size="medium">Add to Playlist</FeaturedButton>
            <FeaturedButton size="medium">Favourite</FeaturedButton>

            {/* MAIN PLAY/PAUSE BUTTON */}
            <FeaturedButton size="medium" onClick={() => handlePlay()}>
              {/* BUTTON ICON LOGIC: Show pause if this item is currently playing, play otherwise */}
              {audioState.currentTrack?.id ===
                (type === "song" ? currentItem.id : songs?.[0]?.id) &&
              audioState.isPlaying ? (
                <FaPause /> // Show pause icon if this item is playing
              ) : (
                <FaPlay /> // Show play icon if this item is not playing
              )}
            </FeaturedButton>
          </div>
        </StyledMediaItemPage.DetailsWrapper>
      </StyledMediaItemPage.Container>

      {/* SONGS TABLE - Only show for albums/artists that have songs */}
      {memoizedPlaylistTable}
    </StyledMediaItemPage>
  );
}

export default MediaItemContent;
