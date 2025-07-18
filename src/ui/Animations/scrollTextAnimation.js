import styled, { keyframes } from "styled-components";

/* This animations scrolls text to the left when it cannot fit into a single row.
Should be used with:

a defined width
overflow: hidden, 
white-space: nowrap
text-overflow: ellipsis; */

const scrollTextAnimation = keyframes`
  0% {
    transform: translateX(0%);
  }
  25% {
    transform: translateX(0%);
  }
  75% {
    transform: translateX(calc(-100% + 16rem));
  }
  100% {
    transform: translateX(calc(-100% + 16rem));
  }
`;

export default scrollTextAnimation;
