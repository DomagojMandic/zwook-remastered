import styled from "styled-components";
import { shimmer } from "../Animations/cardLoaderAnimation";

const SkeletonContentHeader = styled.div`
  margin: 3rem 3.5rem 2rem 3.5rem;
`;

SkeletonContentHeader.TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

SkeletonContentHeader.BackButton = styled.div`
  width: 5.2rem;
  height: 3rem;
  border-radius: 8px;
  background: linear-gradient(
    90deg,
    var(--background-secondary-300) 25%,
    var(--background-secondary-100) 50%,
    var(--background-secondary-300) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 2s infinite;
`;

SkeletonContentHeader.CreateButton = styled.div`
  width: 7.5rem;
  height: 3rem;
  border-radius: 8px;
  background: linear-gradient(
    90deg,
    var(--background-secondary-300) 25%,
    var(--background-secondary-100) 50%,
    var(--background-secondary-300) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 2s infinite;
`;

SkeletonContentHeader.Title = styled.div`
  width: 8rem;
  height: clamp(2rem, 4vw, 3rem);
  border-radius: 8px;
  background: linear-gradient(
    90deg,
    var(--background-secondary-300) 25%,
    var(--background-secondary-100) 50%,
    var(--background-secondary-300) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 2s infinite;
`;

function SkeletonContentHeaderComponent() {
  return (
    <SkeletonContentHeader>
      <SkeletonContentHeader.TopRow>
        <SkeletonContentHeader.BackButton />
        <SkeletonContentHeader.CreateButton />
      </SkeletonContentHeader.TopRow>
      <SkeletonContentHeader.Title />
    </SkeletonContentHeader>
  );
}

export default SkeletonContentHeaderComponent;
