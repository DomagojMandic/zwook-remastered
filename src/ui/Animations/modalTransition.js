import { css, keyframes } from "styled-components";

export const modalIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const modalInAnimation = css`
  animation: ${modalIn} 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
`;
