import { useParams } from "react-router-dom";
import podcastMockData from "../../data/podcastMockData";
import FeaturedButton from "../../ui/Buttons/FeaturedButton";
import useMoveBack from "../../hooks/useMoveBack";
import StyledMediaItemPage from "./StyledMediaItemPage";

/* The layout is dynamically based on the mediaItemType variable. It can be song, album or playlist */
function MediaItemPage() {
  const { type, mediaItemId } = useParams();
  console.log(useParams());
  const navigateBack = useMoveBack();
  const numId = Number(mediaItemId);
  const mediaItem = podcastMockData.find((item) => item.id === numId);

  return (
    <StyledMediaItemPage>
      <div>
        <FeaturedButton onClick={navigateBack} size="medium">
          Back
        </FeaturedButton>
      </div>

      <StyledMediaItemPage.Container>
        <StyledMediaItemPage.Image src={mediaItem.backgroundImage} />
        <StyledMediaItemPage.DetailsWrapper>
          <StyledMediaItemPage.Title>
            {mediaItem.title}
          </StyledMediaItemPage.Title>
          <StyledMediaItemPage.Description>
            {mediaItem.description}
          </StyledMediaItemPage.Description>
        </StyledMediaItemPage.DetailsWrapper>
      </StyledMediaItemPage.Container>
    </StyledMediaItemPage>
  );
}

export default MediaItemPage;
