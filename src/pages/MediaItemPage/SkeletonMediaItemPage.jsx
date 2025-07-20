import styled from "styled-components";
import { shimmer, pulse } from "../../ui/Animations/cardLoaderAnimation";

const SkeletonMediaItemPage = styled.div`
  width: 100%;
  display: flex;
  margin: 2rem 0rem 2rem 0rem;
  flex-direction: column;
  gap: 3rem;
`;

// Back button skeleton
SkeletonMediaItemPage.BackButton = styled.div`
  width: 80px;
  height: 40px;
  background: linear-gradient(
    90deg,
    var(--background-secondary-300) 25%,
    var(--background-secondary-100) 50%,
    var(--background-secondary-300) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: 8px;
  margin-left: clamp(1rem, 2.5vw, 4rem);
  margin-right: clamp(1rem, 2.5vw, 4rem);
`;

// Main content container
SkeletonMediaItemPage.Container = styled.div`
  display: flex;
  gap: 2rem;
  margin-left: clamp(1rem, 2.5vw, 4rem);
  margin-right: clamp(1rem, 2.5vw, 4rem);
`;

// Image skeleton - matches exact dimensions
SkeletonMediaItemPage.Image = styled.div`
  width: clamp(20%, 20vw, 40%);
  aspect-ratio: 1;
  flex: 0 0 auto;
  background: linear-gradient(
    90deg,
    var(--background-secondary-300) 25%,
    var(--background-secondary-100) 50%,
    var(--background-secondary-300) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: 8px;
`;

// Details wrapper
SkeletonMediaItemPage.DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 1;
  min-width: 0;
  gap: 1rem;
`;

// Type skeleton (ALBUM/ARTIST/SONG)
SkeletonMediaItemPage.Type = styled.div`
  width: 80px;
  height: 16px;
  background: linear-gradient(
    90deg,
    var(--background-secondary-300) 25%,
    var(--background-secondary-100) 50%,
    var(--background-secondary-300) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: 4px;
  margin-bottom: 8px;
`;

// Title skeleton - large text
SkeletonMediaItemPage.Title = styled.div`
  width: 70%;
  height: clamp(2rem, 3.5vw, 6rem);
  background: linear-gradient(
    90deg,
    var(--background-secondary-300) 25%,
    var(--background-secondary-100) 50%,
    var(--background-secondary-300) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: 6px;
  margin-bottom: 0.5rem;
`;

// Description skeleton - multiple lines
SkeletonMediaItemPage.Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-right: 2.1rem;
`;

SkeletonMediaItemPage.DescriptionLine = styled.div`
  height: clamp(1.2rem, 1.7vw, 1.6rem);
  background: linear-gradient(
    90deg,
    var(--background-secondary-300) 25%,
    var(--background-secondary-100) 50%,
    var(--background-secondary-300) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: 4px;

  &:nth-child(1) {
    width: 100%;
  }

  &:nth-child(2) {
    width: 85%;
  }

  &:nth-child(3) {
    width: 60%;
  }
`;

// Metadata skeleton
SkeletonMediaItemPage.Metadata = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-top: 1rem;
`;

SkeletonMediaItemPage.MetadataItem = styled.div`
  width: 120px;
  height: 1.4rem;
  background: linear-gradient(
    90deg,
    var(--background-secondary-300) 25%,
    var(--background-secondary-100) 50%,
    var(--background-secondary-300) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: 4px;
`;

// Rating section skeleton
SkeletonMediaItemPage.RatingSection = styled.div`
  margin-top: 16px;
`;

SkeletonMediaItemPage.RatingLabel = styled.div`
  width: 140px;
  height: 1.4rem;
  background: linear-gradient(
    90deg,
    var(--background-secondary-300) 25%,
    var(--background-secondary-100) 50%,
    var(--background-secondary-300) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: 4px;
  margin-bottom: 0.8rem;
`;

SkeletonMediaItemPage.Stars = styled.div`
  display: flex;
  gap: 4px;
`;

SkeletonMediaItemPage.Star = styled.div`
  width: 24px;
  height: 24px;
  background: linear-gradient(
    90deg,
    var(--background-secondary-300) 25%,
    var(--background-secondary-100) 50%,
    var(--background-secondary-300) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: 50%;
`;

// Action buttons skeleton
SkeletonMediaItemPage.ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

SkeletonMediaItemPage.ActionButton = styled.div`
  width: 140px;
  height: 40px;
  background: linear-gradient(
    90deg,
    var(--background-secondary-300) 25%,
    var(--background-secondary-100) 50%,
    var(--background-secondary-300) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: 8px;
`;

// Table skeleton (for albums/artists with songs)
SkeletonMediaItemPage.Table = styled.div`
  margin-left: clamp(1rem, 2.5vw, 4rem);
  margin-right: clamp(1rem, 2.5vw, 4rem);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

SkeletonMediaItemPage.TableRow = styled.div`
  display: grid;
  grid-template-columns: 3rem repeat(4, 1fr);
  gap: 1rem;
  padding: 0.8rem;
  background: var(--background-secondary-300);
  border-radius: 4px;
  animation: ${pulse} 2s infinite;
`;

SkeletonMediaItemPage.TableCell = styled.div`
  height: 1.2rem;
  background: linear-gradient(
    90deg,
    var(--background-secondary-500) 25%,
    var(--background-secondary-300) 50%,
    var(--background-secondary-500) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: 3px;

  &:first-child {
    width: 20px;
  }
`;

function SkeletonMediaItemComponent({ type }) {
  return (
    <SkeletonMediaItemPage>
      <SkeletonMediaItemPage.BackButton />

      <SkeletonMediaItemPage.Container>
        <SkeletonMediaItemPage.Image />

        <SkeletonMediaItemPage.DetailsWrapper>
          <SkeletonMediaItemPage.Type />
          <SkeletonMediaItemPage.Title />

          <SkeletonMediaItemPage.Description>
            <SkeletonMediaItemPage.DescriptionLine />
            <SkeletonMediaItemPage.DescriptionLine />
            <SkeletonMediaItemPage.DescriptionLine />
          </SkeletonMediaItemPage.Description>

          <SkeletonMediaItemPage.Metadata>
            <SkeletonMediaItemPage.MetadataItem />
            <SkeletonMediaItemPage.MetadataItem />
            <SkeletonMediaItemPage.MetadataItem />
          </SkeletonMediaItemPage.Metadata>

          <SkeletonMediaItemPage.RatingSection>
            <SkeletonMediaItemPage.RatingLabel />
            <SkeletonMediaItemPage.Stars>
              {[...Array(5)].map((_, index) => (
                <SkeletonMediaItemPage.Star key={index} />
              ))}
            </SkeletonMediaItemPage.Stars>
          </SkeletonMediaItemPage.RatingSection>

          <SkeletonMediaItemPage.ActionButtons>
            <SkeletonMediaItemPage.ActionButton />
            <SkeletonMediaItemPage.ActionButton />
          </SkeletonMediaItemPage.ActionButtons>
        </SkeletonMediaItemPage.DetailsWrapper>
      </SkeletonMediaItemPage.Container>

      {(type === "artist" || type === "album") && (
        <SkeletonMediaItemPage.Table>
          {[...Array(5)].map((_, index) => (
            <SkeletonMediaItemPage.TableRow key={index}>
              <SkeletonMediaItemPage.TableCell />
              <SkeletonMediaItemPage.TableCell />
              <SkeletonMediaItemPage.TableCell />
              <SkeletonMediaItemPage.TableCell />
              <SkeletonMediaItemPage.TableCell />
            </SkeletonMediaItemPage.TableRow>
          ))}
        </SkeletonMediaItemPage.Table>
      )}
    </SkeletonMediaItemPage>
  );
}

export default SkeletonMediaItemComponent;
