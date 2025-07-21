import styled from "styled-components";
import { shimmer, pulse } from "../Animations/cardLoaderAnimation";
import SkeletonContentHeaderComponent from "../ContentHeader/SkeletonContentHeader";

const SkeletonContentGallery = styled.div`
  margin: 0 3.5rem 3rem 3.5rem;
`;

SkeletonContentGallery.Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(clamp(15rem, 20vw, 22rem), 1fr)
  );
  gap: clamp(1.5rem, 3vw, 3rem);
  width: 100%;
`;

SkeletonContentGallery.Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.8rem, 1.5vw, 1.2rem);
  border-radius: 12px;
  padding: clamp(0.8rem, 1.5vw, 1.2rem);
  background-color: var(--background-secondary-300);
`;

SkeletonContentGallery.Image = styled.div`
  width: 100%;
  aspect-ratio: 1;
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

SkeletonContentGallery.Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.4rem, 0.8vw, 0.6rem);
`;

SkeletonContentGallery.Title = styled.div`
  height: clamp(1.1rem, 1.8vw, 1.4rem);
  width: 80%;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    var(--background-secondary-300) 25%,
    var(--background-secondary-100) 50%,
    var(--background-secondary-300) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 2s infinite;
`;

SkeletonContentGallery.Subtitle = styled.div`
  height: clamp(0.9rem, 1.4vw, 1.1rem);
  width: 60%;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    var(--background-secondary-300) 25%,
    var(--background-secondary-100) 50%,
    var(--background-secondary-300) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 2s infinite;
`;

SkeletonContentGallery.Metadata = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 1vw, 0.8rem);
`;

SkeletonContentGallery.MetadataItem = styled.div`
  height: clamp(0.8rem, 1.2vw, 1rem);
  width: 3rem;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    var(--background-secondary-300) 25%,
    var(--background-secondary-100) 50%,
    var(--background-secondary-300) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 2s infinite;

  &:first-child {
    width: 4rem;
  }
`;

function SkeletonContentGalleryComponent({ count = 8 }) {
  return (
    <>
      <SkeletonContentHeaderComponent />
      <SkeletonContentGallery>
        <SkeletonContentGallery.Grid>
          {Array.from({ length: count }, (_, index) => (
            <SkeletonContentGallery.Card key={index}>
              <SkeletonContentGallery.Image />
              <SkeletonContentGallery.Content>
                <SkeletonContentGallery.Title />
                <SkeletonContentGallery.Subtitle />
                <SkeletonContentGallery.Metadata>
                  <SkeletonContentGallery.MetadataItem />
                  <SkeletonContentGallery.MetadataItem />
                </SkeletonContentGallery.Metadata>
              </SkeletonContentGallery.Content>
            </SkeletonContentGallery.Card>
          ))}
        </SkeletonContentGallery.Grid>
      </SkeletonContentGallery>
    </>
  );
}

export default SkeletonContentGalleryComponent;
