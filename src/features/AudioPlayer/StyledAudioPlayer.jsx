import styled, { keyframes } from "styled-components";
import { spin, fadeIn } from "../../ui/Animations/audioAnimations";

// Main container
const StyledAudioPlayer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(var(--background-secondary-500-rgb, 30, 30, 35), 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--border-primary-300);
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(
    ${(props) => (props.$isMinimized ? "calc(100% - 56px)" : "0")}
  );
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: 768px) {
    transform: translateY(
      ${(props) => (props.$isMinimized ? "calc(100% - 48px)" : "0")}
    );
  }
`;

// Content wrapper
StyledAudioPlayer.PlayerContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  height: 80px;
  max-width: 1400px;
  margin: 0 auto;
  gap: 2rem;

  @media (max-width: 1024px) {
    gap: 1.5rem;
    padding: 1rem 1.5rem;
  }

  @media (max-width: 768px) {
    height: auto;
    min-height: 72px;
    padding: 0.75rem 1rem;
    gap: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
      "controls"
      "info";
  }

  @media (max-width: 480px) {
    padding: 0.625rem;
    gap: 0.75rem;
  }
`;

// Track information section
StyledAudioPlayer.TrackInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;
  flex: 0 1 280px;

  @media (max-width: 768px) {
    grid-area: info;
    justify-content: center;
    flex: 1;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

// Album cover
StyledAudioPlayer.TrackCover = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(
    135deg,
    var(--background-surface-500),
    var(--background-surface-300)
  );
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: var(--text-secondary-300);
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    width: 42px;
    height: 42px;
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    width: 38px;
    height: 38px;
    font-size: 1rem;
  }
`;

// Track details container
StyledAudioPlayer.TrackDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 0;
  flex: 1;
`;

// Track title
StyledAudioPlayer.TrackTitle = styled.h4`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary-300);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -0.01em;

  @media (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

// Track artist
StyledAudioPlayer.TrackArtist = styled.p`
  margin: 0;
  font-size: 1.1rem;
  color: var(--text-secondary-300);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0.8;

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

// Player controls container
StyledAudioPlayer.PlayerControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex: 1 1 auto;
  max-width: 600px;
  width: 100%;

  @media (max-width: 768px) {
    grid-area: controls;
    max-width: 100%;
    gap: 0.625rem;
  }
`;

// Control buttons container
StyledAudioPlayer.ControlButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

// Play/Pause button
StyledAudioPlayer.PlayButton = styled.button`
  background: var(--background-surface-500);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary-300);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;

  &:hover:not(:disabled) {
    background: var(--background-surface-400);
    transform: scale(1.08);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: 0.9rem;
  }
`;

// Progress container
StyledAudioPlayer.ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

// Time display
StyledAudioPlayer.TimeDisplay = styled.span`
  font-size: 1.2rem;
  color: var(--text-secondary-300);
  min-width: 38px;
  text-align: center;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;

  @media (max-width: 480px) {
    font-size: 0.6875rem;
    min-width: 32px;
  }
`;

// Progress bar
StyledAudioPlayer.ProgressBar = styled.div`
  flex: 1;
  height: 4px;
  background: rgba(var(--background-surface-300-rgb, 60, 60, 65), 0.3);
  border-radius: 2px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: height 0.2s ease;

  &:hover {
    height: 6px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.05);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: translateX(0);
  }

  @media (max-width: 480px) {
    height: 3px;

    &:hover {
      height: 5px;
    }
  }
`;

// Progress fill - FIXED with attrs
StyledAudioPlayer.ProgressFill = styled.div.attrs((props) => ({
  style: {
    width: `${props.$progress || 0}%`,
  },
}))`
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--background-surface-500),
    var(--background-surface-400)
  );
  border-radius: 2px;
  transition: width 0.1s linear;
  position: relative;
  box-shadow: 0 0 4px
    rgba(var(--background-surface-500-rgb, 100, 100, 110), 0.4);

  &::after {
    content: "";
    position: absolute;
    right: -8px;
    top: 50%;
    transform: translateY(-50%) scale(0);
    width: 16px;
    height: 16px;
    background: var(--background-surface-500);
    border: 2px solid var(--background-secondary-500);
    border-radius: 50%;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  ${StyledAudioPlayer.ProgressBar}:hover &::after {
    transform: translateY(-50%) scale(1);
  }

  @media (max-width: 480px) {
    &::after {
      width: 12px;
      height: 12px;
      right: -6px;
      border-width: 1.5px;
    }
  }
`;

// Volume section
StyledAudioPlayer.VolumeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  flex: 0 0 auto;

  @media (max-width: 768px) {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    display: none; // Hide volume on very small screens
  }
`;

// Volume button
StyledAudioPlayer.VolumeButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary-300);
  cursor: pointer;
  font-size: 0.9375rem;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--text-primary-300);
    background: rgba(var(--background-surface-300-rgb, 60, 60, 65), 0.3);
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 0.375rem;
  }
`;

// Volume slider
StyledAudioPlayer.VolumeSlider = styled.input`
  width: 72px;
  height: 3px;
  background: rgba(var(--background-surface-300-rgb, 60, 60, 65), 0.3);
  border-radius: 1.5px;
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    background: var(--background-surface-500);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: var(--background-surface-500);
    border-radius: 50%;
    cursor: pointer;
    border: none;
    transition: all 0.2s ease;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  }

  &:hover::-webkit-slider-thumb {
    width: 14px;
    height: 14px;
  }

  &:hover::-moz-range-thumb {
    width: 14px;
    height: 14px;
  }

  @media (max-width: 768px) {
    width: 60px;
  }
`;

// Minimize button
StyledAudioPlayer.MinimizeButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary-300);
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0.5rem;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  &:hover {
    color: var(--text-primary-300);
    background: rgba(var(--background-surface-300-rgb, 60, 60, 65), 0.3);
  }

  @media (max-width: 768px) {
    font-size: 0.8125rem;
    padding: 0.375rem;
  }
`;

// Loading spinner
StyledAudioPlayer.LoadingSpinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(var(--background-surface-300-rgb, 60, 60, 65), 0.3);
  border-top-color: var(--text-primary-300);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;

  @media (max-width: 480px) {
    width: 16px;
    height: 16px;
  }
`;

export default StyledAudioPlayer;
