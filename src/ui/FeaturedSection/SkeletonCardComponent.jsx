import styled, { keyframes } from "styled-components";
import { shimmer, pulse } from "../Animations/cardLoaderAnimation";

/* https://freefrontend.com/css-skeleton-loadings/ */

// Main skeleton card - copies styles from StyledFeaturedSection.Item
const SkeletonCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 100%;
  max-width: 17.5rem;
  height: 19.8rem; /* Fixed height to match real cards */
  padding: 1.2rem;
  padding-bottom: 0.6rem;
  border-radius: 8px;
  background: var(--background-secondary-300);
  position: relative;
  overflow: hidden;
  animation: ${pulse} 2s ease-in-out infinite;
  contain: layout style;
`;

// Skeleton for image - replaces StyledFeaturedSection.Image
SkeletonCard.Image = styled.div`
  width: 100%;
  aspect-ratio: 1; /* Square aspect ratio like album covers */
  flex-shrink: 0; /* Prevent image from shrinking */
  background: linear-gradient(
    90deg,
    var(--background-secondary-300) 25%,
    var(--background-secondary-100) 50%,
    var(--background-secondary-300) 75%
  );
  background-size: 200% 100%; /* Enables shimmer effect */
  animation: ${shimmer} 1.5s infinite; /* Shimmer animation */
  border-radius: 8px;
`;

// Skeleton for text - replaces StyledFeaturedSection.ItemTitle
SkeletonCard.Text = styled.div`
  width: 80%;
  height: 1.4rem;
  background: linear-gradient(
    90deg,
    var(--background-secondary-300) 25%,
    var(--background-secondary-100) 50%,
    var(--background-secondary-300) 75%
  );
  background-size: 200% 100%;
  border-radius: 4px;
  margin-top: 0.8rem;
  animation: ${shimmer} 1.5s infinite;
`;

// Component that renders skeleton card in the FeaturedSection
function SkeletonCardComponent() {
  return (
    <SkeletonCard>
      <SkeletonCard.Image />
      <SkeletonCard.Text />
    </SkeletonCard>
  );
}

export default SkeletonCardComponent;
