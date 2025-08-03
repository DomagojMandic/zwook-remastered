// =========================
// 🎵 AUDIO EVENT HANDLERS
// =========================
// These functions respond to events from the HTML audio element
// They keep Redux state in sync with what's actually happening
// ===================================================================
// REDUX STORE FOR AUDIO STATE
// ===================================================================
// This file manages all audio-related state in the app.
// When components need to change audio state, they dispatch actions here.
// When components need to read audio state, they useSelector from here.

import { createSlice } from "@reduxjs/toolkit";

// INITIAL STATE: This is what the audio state looks like when app starts
const initialAudioState = {
  currentTrack: null, // Currently loaded song object {id, title, artist, src, cover_url, ...}
  isPlaying: false, // Is music currently playing? (true/false)
  isLoadingAudio: false, // Is audio file downloading from server? (true/false)
  currentTime: 0, // Current playback position in seconds (0 to duration)
  duration: 0, // Total song length in seconds (set when audio loads)
  volume: 1, // Volume level (0.0 = silent, 1.0 = full volume)
  isMuted: false, // Is sound muted? (true/false)
  isMinimized: false, // Is player UI collapsed? (true/false)
  playingType: null, // "single" = one song, "playlist" = multiple songs
  playlist: [], // Array of song objects for playlist mode
  error: null, // Error message string (or null if no error)
  autoPlay: false, // Should start playing immediately after loading? (true/false)
};

// REDUX SLICE: Creates actions and reducer automatically
const audioSlice = createSlice({
  name: "audio",
  initialState: initialAudioState,
  reducers: {
    // ===================================================================
    // TRACK MANAGEMENT ACTIONS
    // ===================================================================

    // LOAD NEW TRACK: This is the action that starts everything
    // Called from MediaItemContent when user clicks Play on a song/album/artist
    loadTrack: (state, action) => {
      // ACTION PAYLOAD STRUCTURE:
      // {
      //   song: {id, title, artist, src, cover_url, ...},     // The song to play
      //   playlist: [...songs],                               // Array of songs (optional)
      //   playingType: "single" | "playlist",                 // What type of playback
      //   autoPlay: true                                      // Should auto-start?
      // }

      state.currentTrack = action.payload.song; // Set the new current song
      state.playlist = action.payload?.playlist || []; // Set playlist (empty array if single song)
      state.playingType = action.payload.playingType; // Set playback type
      state.currentTime = 0; // Reset time to beginning
      state.autoPlay = action.payload.autoPlay ?? true; // Set autoPlay flag (default true)
      state.error = null; // Clear any previous errors

      // IMPORTANT: We don't set isPlaying here!
      // AudioPlayer component will handle actually starting playback
      // and will update isPlaying when the audio actually starts
    },

    // PLAY CURRENT TRACK: Sets isPlaying to true
    // Used when user clicks play/pause and we want to resume same song
    playTrack: (state) => {
      state.isPlaying = true; // Tell the app music should be playing
      // AudioPlayer will detect this change and call audioRef.current.play()
    },

    // PAUSE CURRENT TRACK: Sets isPlaying to false
    // Used when user clicks play/pause and we want to pause same song
    pauseTrack: (state) => {
      state.isPlaying = false; // Tell the app music should be paused
      // AudioPlayer will detect this change and call audioRef.current.pause()
    },

    // STOP CURRENT TRACK: Pause and reset to beginning
    stopTrack: (state) => {
      state.isPlaying = false; // Stop playing
      state.currentTime = 0; // Go back to start
    },

    // ===================================================================
    // PLAYBACK STATE ACTIONS (Usually called by AudioPlayer)
    // ===================================================================

    // SET PLAYING STATE: Direct control of play/pause state
    // Usually called by AudioPlayer when audio element events fire
    setPlaying: (state, action) => {
      state.isPlaying = action.payload; // true = playing, false = paused
    },

    // SET LOADING STATE: Show/hide loading spinner
    // Called by AudioPlayer during audio file download
    setLoading: (state, action) => {
      state.isLoadingAudio = action.payload; // true = loading, false = ready
    },

    // SET ERROR: Store error message
    // Called by AudioPlayer when audio fails to load/play
    setError: (state, action) => {
      state.error = action.payload; // String error message or null
    },

    // ===================================================================
    // TIME CONTROL ACTIONS
    // ===================================================================

    // SET CURRENT TIME: Update playback position
    // Called continuously by AudioPlayer during playback (~4 times per second)
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload; // Time in seconds (float)
    },

    // SET DURATION: Set total song length
    // Called by AudioPlayer when audio metadata loads
    setDuration: (state, action) => {
      state.duration = action.payload; // Duration in seconds (float)
    },

    // SEEK TO TIME: Jump to specific time in song
    // Could be used for seeking, currently same as setCurrentTime
    seekToTime: (state, action) => {
      state.currentTime = action.payload; // Jump to this time in seconds
    },

    // ===================================================================
    // VOLUME CONTROL ACTIONS
    // ===================================================================

    // SET VOLUME: Change volume level
    // Called when user moves volume slider
    setVolume: (state, action) => {
      state.volume = action.payload; // Volume from 0.0 to 1.0
    },

    // TOGGLE MUTE: Switch mute on/off
    // Called when user clicks mute button
    toggleMute: (state) => {
      state.isMuted = !state.isMuted; // Flip mute state
    },

    // ===================================================================
    // UI CONTROL ACTIONS
    // ===================================================================

    // TOGGLE MINIMIZE: Collapse/expand player UI
    toggleMinimize: (state) => {
      state.isMinimized = !state.isMinimized; // Flip minimize state
    },

    // ===================================================================
    // PLAYLIST ACTIONS
    // ===================================================================

    // SET PLAYLIST: Replace entire playlist
    // Could be used to change playlist without changing current song
    setPlaylist: (state, action) => {
      state.playlist = action.payload; // Array of song objects
    },

    // NEXT TRACK: Move to next song in playlist
    // Called when song ends or user clicks next button
    nextTrack: (state) => {
      // FIND: What position is current song in the playlist?
      const currentIndex = state.playlist.findIndex(
        (track) => track.id === state.currentTrack?.id
      );

      // CHECK: Is there a next song available?
      if (currentIndex >= 0 && currentIndex < state.playlist.length - 1) {
        // YES: Move to next song
        state.currentTrack = state.playlist[currentIndex + 1]; // Next song becomes current
        state.currentTime = 0; // Reset to beginning
        state.isPlaying = false; // Will be set to true when it starts playing

        // THIS TRIGGERS A NEW CYCLE:
        // 1. AudioPlayer detects currentTrack change
        // 2. Loads new audio file
        // 3. Auto-plays the new song
      }
      // NO: We're at the end of playlist, play the first song again
      if (currentIndex === state.playlist.length - 1) {
        state.currentTrack = state.playlist[0]; // First song becomes current
        state.currentTime = 0; // Reset to beginning
        state.isPlaying = false; // Will be set to true when it starts playing
      }
    },

    // PREVIOUS TRACK: Move to previous song in playlist
    // Called when user clicks previous button
    previousTrack: (state) => {
      // FIND: What position is current song in the playlist?
      const currentIndex = state.playlist.findIndex(
        (track) => track.id === state.currentTrack?.id
      );

      // CHECK: Is there a previous song available?
      if (currentIndex > 0) {
        // YES: Move to previous song
        state.currentTrack = state.playlist[currentIndex - 1]; // Previous song becomes current
        state.currentTime = 0; // Reset to beginning
        state.isPlaying = false; // Will be set to true when it starts playing
      }
      // NO: We're at the beginning of playlist so go to the last song

      if (currentIndex === 0 && state.playlist.length > 0) {
        // If we're at the first song, go to the last song in the playlist
        state.currentTrack = state.playlist[state.playlist.length - 1]; // Last song becomes current
        state.currentTime = 0; // Reset to beginning
        state.isPlaying = false; // Will be set to true when it starts playing
      }
    },
  },
});

// EXPORT: Make actions available to components
export const {
  loadTrack, // Load new song/playlist
  playTrack, // Start playing
  pauseTrack, // Pause playing
  stopTrack, // Stop and reset
  setPlaying, // Set play state directly
  setLoading, // Set loading state
  setError, // Set error message
  setCurrentTime, // Update current time
  setDuration, // Set song duration
  seekToTime, // Seek to time
  setVolume, // Set volume level
  toggleMute, // Toggle mute
  toggleMinimize, // Toggle UI size
  setPlaylist, // Set playlist
  nextTrack, // Next song
  previousTrack, // Previous song
} = audioSlice.actions;

// EXPORT: Make reducer available to store
export default audioSlice.reducer;
