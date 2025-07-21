import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledContentGallery = styled.div`
  margin: 0 3.5rem 3rem 3.5rem;
`;

StyledContentGallery.Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(clamp(15rem, 20vw, 22rem), 1fr)
  );
  gap: clamp(1.5rem, 3vw, 3rem);
  width: 100%;
`;

StyledContentGallery.Card = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: clamp(0.8rem, 1.5vw, 1.2rem);
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-radius: 12px;
  padding: clamp(0.8rem, 1.5vw, 1.2rem);
  background-color: var(--background-secondary-300);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

StyledContentGallery.Image = styled.img`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid var(--border-primary-300);
  transition: border-color 0.2s ease;

  ${StyledContentGallery.Card}:hover & {
    border-color: var(--background-surface-500);
  }
`;

StyledContentGallery.Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.4rem, 0.8vw, 0.6rem);
`;

StyledContentGallery.Title = styled.h3`
  font-size: clamp(1.1rem, 1.8vw, 1.4rem);
  font-weight: 600;
  color: var(--text-primary-500);
  margin: 0;
  line-height: 1.3;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

StyledContentGallery.Subtitle = styled.p`
  font-size: clamp(0.9rem, 1.4vw, 1.1rem);
  color: var(--text-secondary-300);
  margin: 0;
  line-height: 1.4;
  overflow: hidden;
  display: -webkit-box;
`;

StyledContentGallery.Metadata = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(0.7rem, 1.1vw, 1rem);
  font-size: clamp(0.8rem, 1.2vw, 1rem);
  color: var(--text-secondary-400);
`;

StyledContentGallery.MetadataItem = styled.span`
  &:not(:last-child)::after {
    content: "•";
    margin-left: clamp(0.5rem, 1vw, 0.8rem);
    opacity: 0.6;
  }
`;

export default StyledContentGallery;
