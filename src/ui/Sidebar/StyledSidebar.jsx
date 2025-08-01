import styled from "styled-components";

const StyledSidebar = styled.aside`
  background-color: var(--background-secondary-500);
  border-right: 1px solid var(--border-primary-300);
  max-width: 300px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 2rem 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 991px) {
    position: relative;
    top: 20%;
    transform: none;
    width: 70px;
    min-width: 70px;
    max-width: 70px;
    height: fit-content;
    max-height: 80vh;
    padding: 1rem 0.5rem;
    border-radius: 12px;
    border: 1px solid var(--border-primary-300);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 2000;
    gap: 0.5rem;
    flex-shrink: 0;
    overflow: visible;
    align-self: flex-start;
    margin: 1rem 0;
  }
`;

export default StyledSidebar;
