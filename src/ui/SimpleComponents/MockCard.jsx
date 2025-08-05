import styled from "styled-components";

const MockCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 17.5rem;
  max-width: 17.5rem;
  max-height: 19.8rem;
  padding: 1.2rem 1.5rem 1rem 1.5rem;
  border-radius: 8px;
  background: var(--background-secondary-300);
  color: var(--text-primary-300);
  overflow: hidden;
`;

MockCard.Figure = styled.figure`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  flex: 1;
  margin: 0;
  min-height: 0;
`;

MockCard.ItemTitle = styled.figcaption`
  font-size: 1.4rem;
  margin: 0;
  color: var(--text-primary-300);
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
  position: relative;
  padding-top: 0.8rem;
  width: 100%;
  pointer-events: none;
  opacity: 1;
  background: transparent;
  border-radius: 8px;
  white-space: nowrap;
`;

MockCard.Image = styled.img`
  width: 100%;
  height: 90%;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.5s ease-in-out;
  transform-origin: bottom;
`;

export default MockCard;
