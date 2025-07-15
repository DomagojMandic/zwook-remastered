import { Link } from "react-router";
import styled from "styled-components";

const StyledFeaturedPodcasts = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
  align-items: center;
  gap: 1.5rem;
  margin-left: 2.5rem;
  margin-right: 2.5rem;
  padding: 1.5rem;
  border-radius: 8px;

  @media (max-width: 600px) {
    max-width: calc(100% - 2rem);
    margin: 0 auto;
  }
`;

StyledFeaturedPodcasts.TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

StyledFeaturedPodcasts.Title = styled.p`
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-primary-300);
  margin-bottom: 1rem;
  text-align: center;
`;

StyledFeaturedPodcasts.ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

StyledFeaturedPodcasts.ItemWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  gap: 2rem;
  overflow-x: auto;
  width: 100%;

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

StyledFeaturedPodcasts.Item = styled(Link)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 100%;
  height: 18rem;
  max-width: 30.8rem;
  max-height: 18rem;
  border-radius: 8px;
  color: var(--text-primary-300);
  text-decoration: none;
  position: relative;
  overflow: hidden;

  // Add background image as a pseudo-element
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: 8px;
    background: ${(props) =>
      props.$backgroundImage
        ? `url(${props.$backgroundImage}) no-repeat center center / cover`
        : "none"};
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
  }

  // Zoom background image on hover
  &:hover::before {
    transform: scale(1.07);
  }

  // Ensure content is above the background
  > * {
    position: relative;
    z-index: 1;
  }
`;

StyledFeaturedPodcasts.ItemTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-row: 4/ 5;
  grid-column: 1/ 4;
  width: 30.8rem;
  max-width: 30.8rem;
  background-color: rgba(15, 20, 32, 0.6);
  height: 100%;
`;

StyledFeaturedPodcasts.ItemTitle = styled.p`
  font-size: 1.4rem;
  font-weight: var(--font-weight-bold);
  margin-left: 1rem;
`;

StyledFeaturedPodcasts.OnlineWrapper = styled.div`
  width: auto;
  min-width: 4rem;
  grid-row: 1 / 2;
  grid-column: 3 / 4;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
  margin-right: 1rem;

  padding: 0.5rem 1rem;
  gap: 0.5rem;
  border-radius: 12px;
  background-color: var(--status-background);
`;

StyledFeaturedPodcasts.OnlineStatus = styled.span`
  font-size: 1.2rem;
  color: ${(props) =>
    props.$status ? `var(--status-online)` : `var(--status-offline)`};
`;

StyledFeaturedPodcasts.OnlineDot = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$status ? `var(--status-online)` : `var(--status-offline)`};
`;

StyledFeaturedPodcasts.Premium = styled.span`
  border-radius: 13px;
  font-size: 1.1rem;
  padding: 0.5rem;
  font-weight: var(--font-weight-bold);
  margin-right: 1rem;
  background-color: var(--text-brand-500);
  height: 2.8rem;
`;

export default StyledFeaturedPodcasts;
