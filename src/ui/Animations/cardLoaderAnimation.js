import { keyframes } from "styled-components";

// Shimmer animation - moves gradient from left to right for "loading" effect
export const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

// Pulse animation - gently "beats" opacity for breathing effect
export const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
`;
