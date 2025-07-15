import styled from "styled-components";
import Banner from "../../ui/Banner/Banner";
import FeaturedButton from "../../ui/Buttons/FeaturedButton";
import FeaturedSection from "../../ui/FeaturedSection/FeaturedSection";
import FeaturedPodcasts from "../../ui/FeaturedPodcasts/FeaturedPodcasts";

import podcastMockData from "../../data/podcastMockData";

const StyledBannerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  width: 100%;
  padding-left: clamp(1rem, 2.5vw, 4rem);
  padding-right: clamp(1rem, 2.5vw, 4rem);
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

const featuredButtons = [
  <FeaturedButton key="all">All</FeaturedButton>,
  <FeaturedButton key="premium">Premium</FeaturedButton>,
  <FeaturedButton key="disabled">Disabled</FeaturedButton>,
];

const categoriesButtons = [
  <FeaturedButton key="view all">View All</FeaturedButton>,
];

function Dashboard() {
  return (
    <>
      <StyledBannerContainer>
        <Banner />
        <Banner />
      </StyledBannerContainer>
      <FeaturedPodcasts />
      <FeaturedSection
        title="Categories"
        buttons={featuredButtons}
        items={podcastMockData}
      />
      <FeaturedSection buttons={categoriesButtons} items={podcastMockData} />
    </>
  );
}

export default Dashboard;
