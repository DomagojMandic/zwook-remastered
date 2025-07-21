import styled from "styled-components";

import Banner from "../../ui/Banner/Banner";
import FeaturedButton from "../../ui/Buttons/FeaturedButton";
import FeaturedSection from "../../ui/FeaturedSection/FeaturedSection";
import FeaturedPodcasts from "../../ui/FeaturedPodcasts/FeaturedPodcasts";

import { FeaturedSectionProvider } from "../../contexts/FeaturedSectionContext";
import { renderFeaturedItem } from "../../utils/renderFeaturedItem";

import useSongs from "../../hooks/useSongs";
import useAlbums from "../../hooks/useAlbums";

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

/* We provide a Context for each FeaturedSection with defined customHook, children, 
title and an array of button Components to Render */
function Dashboard() {
  return (
    <>
      <StyledBannerContainer>
        <Banner />
        <Banner />
      </StyledBannerContainer>
      <FeaturedPodcasts />
      <FeaturedSectionProvider
        customHook={useSongs}
        title="Songs"
        buttons={featuredButtons}
        renderItem={renderFeaturedItem}
      >
        <FeaturedSection />
      </FeaturedSectionProvider>
      <FeaturedSectionProvider
        customHook={useAlbums}
        title="Albums"
        buttons={categoriesButtons}
        renderItem={renderFeaturedItem}
      >
        <FeaturedSection />
      </FeaturedSectionProvider>
    </>
  );
}

export default Dashboard;
