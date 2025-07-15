import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledFeaturedSection = styled.section`
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

StyledFeaturedSection.ItemWrapper = styled.div`
  display: flex;
  flex-wrap: ${(props) => (props.wrap ? "wrap" : "nowrap")};
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

StyledFeaturedSection.Item = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 100%;
  max-width: 17.5rem;
  max-height: 19.8rem;
  padding: 1.2rem;
  padding-bottom: 0.6rem;
  border-radius: 8px;
  background: var(--background-secondary-300);
  color: var(--text-primary-300);
  text-decoration: none;
  position: relative;
  overflow: hidden;

  &:hover {
    padding-left: 0;
    padding-right: 0;
  }

  &:hover img {
    transform: scale(1.2); // Zoom effect from the center
  }

  &:hover figcaption {
    position: absolute;
    bottom: 0;
    left: 2px;
    right: 0;
    padding: 0.6rem 1rem;
    background: rgba(255 255 255 / 0.15);
    backdrop-filter: saturate(180%) blur(10px);
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    color: var(--text-primary-300);
    z-index: 1;
  }
`;

StyledFeaturedSection.Figure = styled.figure`
  display: flex;
  justify-content: center;

  flex-direction: column;
  width: 100%;
  height: 100%;
`;

StyledFeaturedSection.ItemTitle = styled.figcaption`
  font-size: 1.4rem;
  margin: 0;
  color: var(--text-primary-300);
  position: relative;
  padding-top: 0.8rem;
  width: 100%;
  z-index: 2;
  pointer-events: none;
  transition: background-color 0.3s ease;
`;

StyledFeaturedSection.Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.5s ease-in-out;
  will-change: transform;
  transform-origin: bottom;
`;

StyledFeaturedSection.TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

StyledFeaturedSection.Title = styled.h3`
  font-size: ${(props) => (props.size ? props.size : "2rem")};
  font-weight: 600;
  color: var(--text-primary-300);
  margin-bottom: 1rem;
  text-align: center;
`;

StyledFeaturedSection.ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export default StyledFeaturedSection;
