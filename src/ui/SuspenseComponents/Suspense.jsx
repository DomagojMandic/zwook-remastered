import styled from "styled-components";
import { bounce } from "../Animations/bounce";

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  width: 100%;
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  background-color: var(--background-surface-500);
  border-radius: 50%;
  animation: ${bounce} 1.4s infinite ease-in-out both;

  &:nth-child(1) {
    animation-delay: -0.32s;
  }

  &:nth-child(2) {
    animation-delay: -0.16s;
  }

  &:nth-child(3) {
    animation-delay: 0s;
  }
`;

function LoadingSuspense() {
  return (
    <LoadingContainer>
      <LoadingDots>
        <Dot />
        <Dot />
        <Dot />
      </LoadingDots>
    </LoadingContainer>
  );
}

export default LoadingSuspense;
