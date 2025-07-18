import { Link } from "react-router-dom";
import styled from "styled-components";

import scrollTextAnimation from "../Animations/scrollTextAnimation";

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
  contain: layout style;

  &:hover {
    padding-left: 0;
    padding-right: 0;
  }

  &:hover img {
    transform: scale3d(1.08, 1.08, 1); // GPU-optimized transform
  }

  &:hover figcaption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.8rem 1.2rem;
    background: rgba(0, 0, 0, 0.8);
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    color: white;
    z-index: 3;
    opacity: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover ${() => StyledFeaturedSection.AnimationSpan}[data-overflow="true"] {
    animation: ${scrollTextAnimation} 2s ease-in-out;
    animation-delay: 0.3s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
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
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
  position: relative;
  padding-top: 0.8rem;
  padding-left: 1px;
  padding-right: 1px;
  width: 100%;
  z-index: 2;
  pointer-events: none;
  transition: all 0.3s ease;
  opacity: 1;
  background: transparent;
  border-radius: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/* Should be used within the figcaption element if we want the scrollAnimation to work */
StyledFeaturedSection.AnimationSpan = styled.span`
  white-space: nowrap;
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: transform 0.3s ease;

  ${StyledFeaturedSection.Item}:hover & {
    width: auto;
    min-width: 100%;
    overflow: visible;
    text-overflow: initial;
  }
`;

StyledFeaturedSection.Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.5s ease-in-out;
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
  color: var(--text-primary-100);
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
