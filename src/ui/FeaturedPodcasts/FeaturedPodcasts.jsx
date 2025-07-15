import StyledFeaturedPodcasts from "./StyledFeaturedPodcasts";
import FeaturedButton from "../Buttons/FeaturedButton";

import albertflores from "../../assets/mock-avatars/image=albertflores.png";
import useDragToScroll from "../../hooks/useDragToScroll";

function FeaturedPodcasts() {
  const ref = useDragToScroll();

  const premium = true;
  const online = true;
  return (
    <StyledFeaturedPodcasts>
      <StyledFeaturedPodcasts.TitleWrapper>
        <StyledFeaturedPodcasts.Title>Podcasts</StyledFeaturedPodcasts.Title>

        <StyledFeaturedPodcasts.ButtonWrapper>
          <FeaturedButton>View All</FeaturedButton>
        </StyledFeaturedPodcasts.ButtonWrapper>
      </StyledFeaturedPodcasts.TitleWrapper>
      <StyledFeaturedPodcasts.ItemWrapper ref={ref}>
        <StyledFeaturedPodcasts.Item to="/" $backgroundImage={albertflores}>
          <StyledFeaturedPodcasts.ItemTitleWrapper>
            <StyledFeaturedPodcasts.ItemTitle>
              Mystery Junction
            </StyledFeaturedPodcasts.ItemTitle>
            {premium && (
              <StyledFeaturedPodcasts.Premium>
                Premium
              </StyledFeaturedPodcasts.Premium>
            )}
          </StyledFeaturedPodcasts.ItemTitleWrapper>
          <StyledFeaturedPodcasts.OnlineWrapper>
            <StyledFeaturedPodcasts.OnlineDot $status={online} />
            <StyledFeaturedPodcasts.OnlineStatus $status={online}>
              {online ? "Online" : "Offline"}
            </StyledFeaturedPodcasts.OnlineStatus>
          </StyledFeaturedPodcasts.OnlineWrapper>
        </StyledFeaturedPodcasts.Item>
        <StyledFeaturedPodcasts.Item to="/" $backgroundImage={albertflores}>
          <StyledFeaturedPodcasts.ItemTitleWrapper>
            <StyledFeaturedPodcasts.ItemTitle>
              Mystery Junction
            </StyledFeaturedPodcasts.ItemTitle>
            {premium && (
              <StyledFeaturedPodcasts.Premium>
                Premium
              </StyledFeaturedPodcasts.Premium>
            )}
          </StyledFeaturedPodcasts.ItemTitleWrapper>
          <StyledFeaturedPodcasts.OnlineWrapper>
            <StyledFeaturedPodcasts.OnlineDot $status={online} />
            <StyledFeaturedPodcasts.OnlineStatus $status={online}>
              {online ? "Online" : "Offline"}
            </StyledFeaturedPodcasts.OnlineStatus>
          </StyledFeaturedPodcasts.OnlineWrapper>
        </StyledFeaturedPodcasts.Item>
        <StyledFeaturedPodcasts.Item to="/" $backgroundImage={albertflores}>
          <StyledFeaturedPodcasts.ItemTitleWrapper>
            <StyledFeaturedPodcasts.ItemTitle>
              Mystery Junction
            </StyledFeaturedPodcasts.ItemTitle>
            {premium && (
              <StyledFeaturedPodcasts.Premium>
                Premium
              </StyledFeaturedPodcasts.Premium>
            )}
          </StyledFeaturedPodcasts.ItemTitleWrapper>
          <StyledFeaturedPodcasts.OnlineWrapper>
            <StyledFeaturedPodcasts.OnlineDot $status={online} />
            <StyledFeaturedPodcasts.OnlineStatus $status={online}>
              {online ? "Online" : "Offline"}
            </StyledFeaturedPodcasts.OnlineStatus>
          </StyledFeaturedPodcasts.OnlineWrapper>
        </StyledFeaturedPodcasts.Item>
        <StyledFeaturedPodcasts.Item to="/" $backgroundImage={albertflores}>
          <StyledFeaturedPodcasts.ItemTitleWrapper>
            <StyledFeaturedPodcasts.ItemTitle>
              Mystery Junction
            </StyledFeaturedPodcasts.ItemTitle>
            {premium && (
              <StyledFeaturedPodcasts.Premium>
                Premium
              </StyledFeaturedPodcasts.Premium>
            )}
          </StyledFeaturedPodcasts.ItemTitleWrapper>
          <StyledFeaturedPodcasts.OnlineWrapper>
            <StyledFeaturedPodcasts.OnlineDot $status={online} />
            <StyledFeaturedPodcasts.OnlineStatus $status={online}>
              {online ? "Online" : "Offline"}
            </StyledFeaturedPodcasts.OnlineStatus>
          </StyledFeaturedPodcasts.OnlineWrapper>
        </StyledFeaturedPodcasts.Item>
        <StyledFeaturedPodcasts.Item to="/" $backgroundImage={albertflores}>
          <StyledFeaturedPodcasts.ItemTitleWrapper>
            <StyledFeaturedPodcasts.ItemTitle>
              Mystery Junction
            </StyledFeaturedPodcasts.ItemTitle>
            {premium && (
              <StyledFeaturedPodcasts.Premium>
                Premium
              </StyledFeaturedPodcasts.Premium>
            )}
          </StyledFeaturedPodcasts.ItemTitleWrapper>
          <StyledFeaturedPodcasts.OnlineWrapper>
            <StyledFeaturedPodcasts.OnlineDot $status={online} />
            <StyledFeaturedPodcasts.OnlineStatus $status={online}>
              {online ? "Online" : "Offline"}
            </StyledFeaturedPodcasts.OnlineStatus>
          </StyledFeaturedPodcasts.OnlineWrapper>
        </StyledFeaturedPodcasts.Item>
        <StyledFeaturedPodcasts.Item to="/" $backgroundImage={albertflores}>
          <StyledFeaturedPodcasts.ItemTitleWrapper>
            <StyledFeaturedPodcasts.ItemTitle>
              Mystery Junction
            </StyledFeaturedPodcasts.ItemTitle>
            {premium && (
              <StyledFeaturedPodcasts.Premium>
                Premium
              </StyledFeaturedPodcasts.Premium>
            )}
          </StyledFeaturedPodcasts.ItemTitleWrapper>
          <StyledFeaturedPodcasts.OnlineWrapper>
            <StyledFeaturedPodcasts.OnlineDot $status={online} />
            <StyledFeaturedPodcasts.OnlineStatus $status={online}>
              {online ? "Online" : "Offline"}
            </StyledFeaturedPodcasts.OnlineStatus>
          </StyledFeaturedPodcasts.OnlineWrapper>
        </StyledFeaturedPodcasts.Item>
        <StyledFeaturedPodcasts.Item to="/" $backgroundImage={albertflores}>
          <StyledFeaturedPodcasts.ItemTitleWrapper>
            <StyledFeaturedPodcasts.ItemTitle>
              Mystery Junction
            </StyledFeaturedPodcasts.ItemTitle>
            {premium && (
              <StyledFeaturedPodcasts.Premium>
                Premium
              </StyledFeaturedPodcasts.Premium>
            )}
          </StyledFeaturedPodcasts.ItemTitleWrapper>
          <StyledFeaturedPodcasts.OnlineWrapper>
            <StyledFeaturedPodcasts.OnlineDot $status={online} />
            <StyledFeaturedPodcasts.OnlineStatus $status={online}>
              {online ? "Online" : "Offline"}
            </StyledFeaturedPodcasts.OnlineStatus>
          </StyledFeaturedPodcasts.OnlineWrapper>
        </StyledFeaturedPodcasts.Item>
      </StyledFeaturedPodcasts.ItemWrapper>
    </StyledFeaturedPodcasts>
  );
}

export default FeaturedPodcasts;
