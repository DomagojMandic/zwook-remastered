// AudioPlayer.jsx - THE MAIN AUDIO PLAYER COMPONENT
// ===================================================================
// This is the center of the audio system. It:
// 1. Listens for Redux state changes
// 2. Controls the HTML <audio> element
// 3. Handles all audio events and syncs them back to Redux
// 4. Manages play/pause, volume, seeking, etc.
// 5. Prevents infinite loops between Redux and audio events

import React, { useEffect, useRef, useCallback } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import { GiPreviousButton, GiNextButton } from "react-icons/gi";
import StyledAudioPlayer from "./StyledAudioPlayer";
import {
  loadTrack, // Action to load track (not used here, but imported)
  setPlaying, // Action to update play state
  setLoading, // Action to update loading state
  setError, // Action to set error message
  setCurrentTime, // Action to update current time
  setDuration, // Action to set song duration
  setVolume, // Action to set volume
  toggleMute, // Action to toggle mute
  toggleMinimize, // Action to toggle minimize
  nextTrack, // Action to go to next song
  previousTrack, // Action to go to next song
} from "../../redux-slices/audioReducer";
import { useSelector, useDispatch } from "react-redux";
import { formatTime } from "../../helpers/helpers";

const AudioPlayer = () => {
  // REDUX: Get current audio state from store
  const audioState = useSelector((state) => state.audio);

  // REDUX: Get dispatch function to send actions
  const dispatch = useDispatch();

  // AUDIO REF: Direct reference to HTML <audio> element
  const audioRef = useRef(null);

  // VERY IMPORTANT REF: Prevents infinite loops between Redux and audio events
  // When we change audio state (play/pause), we set this to true
  // This tells event handlers to not update Redux because we caused this change
  const isChangingPlayStateRef = useRef(false);

  // DESTRUCTURE: Extract all state values for easier access
  const {
    currentTrack, // Current song object
    currentTime, // Current playback position
    duration, // Total song length
    error, // Error message
    isLoadingAudio, // Is audio loading?
    isMinimized, // Is UI minimized?
    isMuted, // Is audio muted?
    isPlaying, // Is currently playing?
    playingType, // "single" or "playlist"
    playlist, // Array of songs
    volume, // Volume level (0-1)
    autoPlay, // Should auto-start?
  } = audioState;

  // ===================================================================
  // UTILITY FUNCTIONS
  // ===================================================================

  // CALCULATE: Progress percentage for progress bar (0-100)
  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  // ===================================================================
  // CONTROL HANDLERS
  // ===================================================================

  /**
   * PLAY/PAUSE HANDLER: Toggles between play and pause
   * This is called when user clicks play/pause button in AudioPlayer UI
   */
  const handlePlayPause = useCallback(() => {
    if (!audioRef.current || !currentTrack) return; // No audio element or track

    if (isPlaying) {
      // CURRENTLY PLAYING → PAUSE
      audioRef.current.pause(); // Pause the audio element
      dispatch(setPlaying(false)); // Tell Redux we're paused
    } else {
      // CURRENTLY PAUSED → PLAY
      dispatch(setLoading(true)); // Show loading spinner
      audioRef.current
        .play() // Start playing audio element
        .then(() => {
          dispatch(setPlaying(true)); // SUCCESS: Tell Redux we're playing
          dispatch(setLoading(false)); // Hide loading spinner
        })
        .catch((error) => {
          console.error("Playback error:", error);
          dispatch(setError(error.message)); // Tell Redux about error
          dispatch(setLoading(false)); // Hide loading spinner
          dispatch(setPlaying(false)); // Make sure we're not "playing" if failed
        });
    }
  }, [isPlaying, currentTrack, dispatch]);

  /**
   * VOLUME CHANGE HANDLER: Updates volume when user moves slider
   * @param {Event} e - Input change event from volume slider
   */
  const handleVolumeChange = useCallback(
    (e) => {
      const newVolume = parseFloat(e.target.value); // Get slider value (0.0 to 1.0)
      dispatch(setVolume(newVolume)); // Update Redux state

      if (audioRef.current) {
        audioRef.current.volume = newVolume; // Update audio element volume immediately
      }
    },
    [dispatch]
  );

  /**
   * MUTE TOGGLE HANDLER: Switches mute on/off
   * Preserves volume level when unmuting
   */
  const handleMuteToggle = useCallback(() => {
    dispatch(toggleMute()); // Toggle mute state in Redux

    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted; // Toggle audio element mute immediately
    }
  }, [dispatch]);

  /**
   * PROGRESS BAR CLICK HANDLER: Seeks to clicked position
   * @param {MouseEvent} e - Click event on progress bar
   */
  const handleProgressClick = useCallback(
    (e) => {
      if (!audioRef.current || !duration) return; // No audio or duration not loaded yet

      // CALCULATE: Where did user click
      const rect = e.currentTarget.getBoundingClientRect(); // Get progress bar dimensions
      const clickX = e.clientX - rect.left; // Click position from left edge
      const newTime = (clickX / rect.width) * duration; // Convert to time in seconds

      // SEEK: Jump to the clicked time
      audioRef.current.currentTime = newTime; // Set audio element time
      dispatch(setCurrentTime(newTime)); // Update Redux immediately for UI responsiveness

      // Note: This will also trigger 'timeupdate' event
    },
    [duration, dispatch]
  );

  /**
   * SKIP TIME HANDLER: Jumps forward/backward by specified seconds
   * @param {number} seconds - Number of seconds to skip (negative for backward)
   */
  const handleSkipTime = useCallback(
    (seconds) => {
      if (!audioRef.current) return; // No audio element

      // CALCULATE: New time, clamped to valid range
      const newTime = Math.max(
        0, // Don't go before start
        Math.min(duration, audioRef.current.currentTime + seconds) // Don't go past end
      );

      audioRef.current.currentTime = newTime; // Set new time
      dispatch(setCurrentTime(newTime)); // Update Redux
    },
    [duration, dispatch]
  );

  // ===================================================================
  // AUDIO EVENT HANDLERS
  // ===================================================================
  // These functions respond to events from the HTML <audio> element
  // They keep Redux state in sync with what's actually happening

  /**
   * LOADED METADATA HANDLER: Called when audio file info is loaded
   * This is when we get the duration, sample rate, etc.
   */
  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current?.duration) {
      dispatch(setDuration(audioRef.current.duration)); // Tell Redux the song length
    }
  }, [dispatch]);

  /**
   * TIME UPDATE HANDLER: Called continuously while playing (~4 times per second)
   * Updates current playback position for progress bar and time display
   */
  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      dispatch(setCurrentTime(audioRef.current.currentTime)); // Update Redux with current time
    }
  }, [dispatch]);

  /**
   * PLAY EVENT HANDLER: Called when audio element starts playing
   * CRITICAL: Only updates Redux if WE didn't cause this event
   */
  const handlePlay = useCallback(() => {
    // CHECK: Did we programmatically start playing?
    if (!isChangingPlayStateRef.current) {
      // NO - Something else caused play (user clicked audio controls, autoplay, etc.)
      dispatch(setPlaying(true)); // Tell Redux we're playing
    }
    // YES - We caused it, don't update Redux (prevents infinite loop)

    dispatch(setLoading(false)); // Not loading anymore
  }, [dispatch]);

  /**
   * PAUSE EVENT HANDLER: Called when audio element pauses
   * CRITICAL: Only updates Redux if WE didn't cause this event
   */
  const handlePause = useCallback(() => {
    // CHECK: Did we programmatically pause?
    if (!isChangingPlayStateRef.current) {
      // NO - Something else caused pause (user clicked audio controls, etc.)
      dispatch(setPlaying(false)); // Tell Redux we're paused
    }
    // YES - We caused it, don't update Redux (prevents infinite loop)
  }, [dispatch]);

  /**
   * ENDED EVENT HANDLER: Called when song finishes playing
   * Handles auto-advance to next track in playlist mode
   */
  const handleEnded = useCallback(() => {
    dispatch(setPlaying(false)); // Not playing anymore
    dispatch(setCurrentTime(0)); // Reset to beginning

    // AUTO-ADVANCE LOGIC: Should we play next song?
    if (playingType === "playlist" && playlist.length > 0) {
      // FIND: What's the current song's position in playlist?
      const currentIndex = playlist.findIndex(
        (track) => track.id === currentTrack?.id
      );

      // CHECK: Is there a next song?
      if (currentIndex >= 0 && currentIndex < playlist.length - 1) {
        dispatch(nextTrack()); // Go to next song!

        // WHAT HAPPENS:
        // 1. nextTrack updates currentTrack in Redux
        // 2. useEffect below detects currentTrack change
        // 3. New audio loads and auto-plays
      }
      // If it's the last song, just stop
    }
    // If it's single mode, just stop
  }, [playingType, playlist, currentTrack, dispatch]);

  /**
   * LOAD START HANDLER: Called when audio starts loading
   */
  const handleLoadStart = useCallback(() => {
    dispatch(setLoading(true)); // Show loading spinner
  }, [dispatch]);

  /**
   * CAN PLAY HANDLER: Called when enough audio has loaded to start playing
   */
  const handleCanPlay = useCallback(() => {
    dispatch(setLoading(false)); // Hide loading spinner
  }, [dispatch]);

  /**
   * ERROR HANDLER: Called when audio loading/playing fails
   */
  const handleError = useCallback(
    (e) => {
      console.error("Audio error:", e); // Log for debugging
      dispatch(setError("Audio playback error")); // Tell Redux about error
      dispatch(setLoading(false)); // Stop loading spinner
      dispatch(setPlaying(false)); // Make sure we're not "playing"
    },
    [dispatch]
  );

  // ===================================================================
  // AUDIO EVENT LISTENERS SETUP
  // ===================================================================
  /**
   * Set up all audio element event listeners
   * This useEffect runs once and cleans up properly
   */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return; // No audio element yet

    // ADD ALL EVENT LISTENERS
    audio.addEventListener("loadedmetadata", handleLoadedMetadata); // Duration loaded
    audio.addEventListener("timeupdate", handleTimeUpdate); // Time changed
    audio.addEventListener("play", handlePlay); // Started playing
    audio.addEventListener("pause", handlePause); // Paused
    audio.addEventListener("ended", handleEnded); // Song finished
    audio.addEventListener("loadstart", handleLoadStart); // Loading started
    audio.addEventListener("canplay", handleCanPlay); // Ready to play
    audio.addEventListener("error", handleError); // Error occurred

    // CLEANUP FUNCTION: Remove listeners when component unmounts
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("error", handleError);
    };
  }, [
    // DEPENDENCIES: If any of these change, re-setup listeners
    handleLoadedMetadata,
    handleTimeUpdate,
    handlePlay,
    handlePause,
    handleEnded,
    handleLoadStart,
    handleCanPlay,
    handleError,
  ]);

  // ===================================================================
  // KEYBOARD SHORTCUTS
  // ===================================================================
  /**
   * Global keyboard shortcuts for audio control
   * Space: Play/Pause | Left/Right: Skip 10s | M: Mute
   */
  useEffect(() => {
    const handleKeyPress = (e) => {
      // IGNORE: Don't interfere when user is typing in input fields
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
        return;

      switch (e.code) {
        case "Space": // SPACEBAR: Play/Pause
          e.preventDefault(); // Prevent page scroll
          handlePlayPause();
          break;
        case "ArrowLeft": // LEFT ARROW: Skip backward 10s
          e.preventDefault();
          handleSkipTime(-10);
          break;
        case "ArrowRight": // RIGHT ARROW: Skip forward 10s
          e.preventDefault();
          handleSkipTime(10);
          break;
        case "KeyM": // M KEY: Toggle mute
          e.preventDefault();
          handleMuteToggle();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress); // Listen globally
    return () => document.removeEventListener("keydown", handleKeyPress); // Cleanup
  }, [handlePlayPause, handleSkipTime, handleMuteToggle]);

  // ===================================================================
  // TRACK LOADING EFFECT - THE CENTRE OF THE SYSTEM
  // ===================================================================
  /**
   * MOST IMPORTANT EFFECT: Handles loading new audio when track changes
   * This is triggered when MediaItemContent dispatches loadTrack()
   *
   * KEY INSIGHT: Only depends on currentTrack.src and autoPlay
   * This prevents reloading when volume/mute changes
   */
  useEffect(() => {
    if (audioRef.current && currentTrack?.src) {
      // CRITICAL CHECK: Is this actually a NEW song?
      // We don't want to reload the same song when volume changes
      if (audioRef.current.src !== currentTrack.src) {
        // LOAD NEW AUDIO FILE
        audioRef.current.src = currentTrack.src; // Set new audio URL
        audioRef.current.load(); // Start downloading audio file

        // THIS TRIGGERS THESE EVENTS IN ORDER:
        // 1. loadstart → handleLoadStart → setLoading(true)
        // 2. loadedmetadata → handleLoadedMetadata → setDuration(...)
        // 3. canplay → handleCanPlay → setLoading(false)

        // AUTO-PLAY LOGIC: Should we start playing immediately?
        if (autoPlay) {
          isChangingPlayStateRef.current = true; // Flag: "We're about to change play state"

          audioRef.current
            .play() // Start playing
            .then(() => {
              dispatch(setPlaying(true)); // SUCCESS: Tell Redux we're playing
              isChangingPlayStateRef.current = false; // Clear flag
            })
            .catch((error) => {
              console.error("Auto-play failed:", error);
              dispatch(setError(error.message)); // ERROR: Tell Redux
              isChangingPlayStateRef.current = false; // Clear flag
            });
        }
      }
    }
  }, [currentTrack?.src, autoPlay, dispatch]);
  // CRITICAL: Only depends on src and autoPlay, NOT on volume/mute
  // This prevents audio reload when user changes volume

  // ===================================================================
  // VOLUME EFFECT - SEPARATE FROM TRACK LOADING
  // ===================================================================
  /**
   * Handle volume changes WITHOUT reloading audio
   * This runs separately from track loading to prevent unnecessary reloads
   */
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.volume = volume; // Just change volume, don't reload audio
    }
  }, [volume, currentTrack]);
  // Separate effect prevents audio reload when volume changes

  // ===================================================================
  // MUTE EFFECT - SEPARATE FROM TRACK LOADING
  // ===================================================================
  /**
   * Handle mute changes WITHOUT reloading audio
   * This runs separately from track loading to prevent unnecessary reloads
   */
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.muted = isMuted; // Just change mute, don't reload audio
    }
  }, [isMuted, currentTrack]);
  // Separate effect prevents audio reload when mute changes

  // ===================================================================
  // PLAY/PAUSE SYNC EFFECT - THE TRICKY PART
  // ===================================================================
  /**
   * VERY IMPORTANT  EFFECT: Syncs Redux isPlaying state with audio element
   * This handles play/pause commands from MediaItemContent
   *
   * BUG:
   * - Redux says isPlaying: true
   * - But audio element might be paused
   * - We need to sync them without creating infinite loops
   *
   * THE SOLUTION: isChangingPlayStateRef prevents loops
   */
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      isChangingPlayStateRef.current = true; // We're about to change audio state

      // CASE 1: Redux says "play" but audio is paused
      if (isPlaying && audioRef.current.paused) {
        audioRef.current
          .play() // Start playing audio
          .then(() => {
            isChangingPlayStateRef.current = false; // "Done changing"
          })
          .catch((error) => {
            console.error("Play failed:", error);
            dispatch(setError(error.message)); // Tell Redux about error
            dispatch(setPlaying(false)); // Update Redux: not playing
            isChangingPlayStateRef.current = false; // Clear flag
          });
      }
      // CASE 2: Redux says "pause" but audio is playing
      else if (!isPlaying && !audioRef.current.paused) {
        audioRef.current.pause(); // Pause the audio
        isChangingPlayStateRef.current = false; // Clear flag
      }
      // CASE 3: They're already in sync
      else {
        isChangingPlayStateRef.current = false; // Clear flag
      }
    }
  }, [isPlaying, currentTrack, dispatch]);
  // Runs whenever isPlaying changes (from MediaItemContent play/pause buttons)

  // ===================================================================
  // EARLY RETURN: Don't render if no track loaded
  // ===================================================================
  if (!currentTrack) {
    return (
      <StyledAudioPlayer $isMinimized={false}>
        <StyledAudioPlayer.PlayerContent>
          <div style={{ textAlign: "center", padding: "1rem", color: "#666" }}>
            No track loaded. Play a song.
          </div>
        </StyledAudioPlayer.PlayerContent>
      </StyledAudioPlayer>
    );
  }

  // ===================================================================
  // RENDER: The Audio Player UI
  // ===================================================================
  return (
    <StyledAudioPlayer $isMinimized={isMinimized}>
      {/* HIDDEN AUDIO ELEMENT - This does the actual audio playback */}
      <audio ref={audioRef} />
      {/* This <audio> element is invisible but contains all the audio functionality */}
      {/* Everything else is just UI that controls this element */}

      {/* MINIMIZE/MAXIMIZE BUTTON */}
      <StyledAudioPlayer.MinimizeButton
        onClick={() => dispatch(toggleMinimize())}
      >
        {isMinimized ? <FaChevronUp /> : <FaChevronDown />}
      </StyledAudioPlayer.MinimizeButton>

      <StyledAudioPlayer.PlayerContent>
        {/* TRACK INFO SECTION */}
        <StyledAudioPlayer.TrackInfo>
          {/* ALBUM COVER */}
          <StyledAudioPlayer.TrackCover>
            {currentTrack.cover_url ? (
              <img
                src={currentTrack.cover_url}
                alt={currentTrack.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "inherit",
                }}
              />
            ) : (
              "🎵" // Fallback if no cover image
            )}
          </StyledAudioPlayer.TrackCover>

          {/* TRACK DETAILS */}
          <StyledAudioPlayer.TrackDetails>
            <StyledAudioPlayer.TrackTitle>
              {currentTrack.title || "Unknown Track"}
            </StyledAudioPlayer.TrackTitle>
            <StyledAudioPlayer.TrackArtist>
              {currentTrack.artist_title || "Unknown Artist"}
            </StyledAudioPlayer.TrackArtist>
          </StyledAudioPlayer.TrackDetails>
        </StyledAudioPlayer.TrackInfo>

        {/* PLAYER CONTROLS SECTION */}
        <StyledAudioPlayer.PlayerControls>
          {/* PLAY/PAUSE BUTTON WITH PREVIOUS/NEXT TRACK */}
          <StyledAudioPlayer.ControlButtons>
            {playlist.length > 1 && (
              <StyledAudioPlayer.PlayButton
                onClick={() => dispatch(previousTrack())}
                disabled={isLoadingAudio} // Disable while loading
              >
                <GiPreviousButton />
              </StyledAudioPlayer.PlayButton>
            )}
            <StyledAudioPlayer.PlayButton
              onClick={handlePlayPause}
              disabled={isLoadingAudio} // Disable while loading
            >
              {isLoadingAudio ? (
                <StyledAudioPlayer.LoadingSpinner /> // Show spinner while loading
              ) : isPlaying ? (
                <FaPause /> // Show pause if playing
              ) : (
                <FaPlay /> // Show play if paused
              )}
            </StyledAudioPlayer.PlayButton>
            {playlist.length > 1 && (
              <StyledAudioPlayer.PlayButton
                onClick={() => dispatch(nextTrack())}
                disabled={isLoadingAudio} // Disable while loading
              >
                <GiNextButton />
              </StyledAudioPlayer.PlayButton>
            )}
          </StyledAudioPlayer.ControlButtons>

          {/* PROGRESS BAR SECTION */}
          <StyledAudioPlayer.ProgressContainer>
            {/* CURRENT TIME DISPLAY */}
            <StyledAudioPlayer.TimeDisplay>
              {formatTime(currentTime)}
            </StyledAudioPlayer.TimeDisplay>

            {/* CLICKABLE PROGRESS BAR */}
            <StyledAudioPlayer.ProgressBar onClick={handleProgressClick}>
              <StyledAudioPlayer.ProgressFill $progress={progressPercentage} />
            </StyledAudioPlayer.ProgressBar>

            {/* TOTAL TIME DISPLAY */}
            <StyledAudioPlayer.TimeDisplay>
              {formatTime(duration)}
            </StyledAudioPlayer.TimeDisplay>
          </StyledAudioPlayer.ProgressContainer>
        </StyledAudioPlayer.PlayerControls>

        {/* VOLUME CONTROL SECTION */}
        <StyledAudioPlayer.VolumeSection>
          {/* MUTE/UNMUTE BUTTON */}
          <StyledAudioPlayer.VolumeButton onClick={handleMuteToggle}>
            {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
          </StyledAudioPlayer.VolumeButton>

          {/* VOLUME SLIDER */}
          <StyledAudioPlayer.VolumeSlider
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume} // Show 0 if muted, actual volume if not
            onChange={handleVolumeChange}
          />
        </StyledAudioPlayer.VolumeSection>
      </StyledAudioPlayer.PlayerContent>
    </StyledAudioPlayer>
  );
};

export default AudioPlayer;
