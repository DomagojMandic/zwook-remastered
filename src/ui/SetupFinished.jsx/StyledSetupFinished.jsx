import { Link } from "react-router";
import styled from "styled-components";

const StyledSetupFinished = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem 0rem;
  background-color: var(--background-surface-500);
  color: var(--text-dark-500);
  position: relative;

  font-size: 1.6rem;
  font-weight: 500;

  @media (max-width: 991px) {
    display: none;
  }
`;

StyledSetupFinished.Path = styled(Link)`
  text-decoration: underline;
  padding: 0.2rem 0.4rem;
  border-radius: 0.4rem;
  background-color: var(--accent-primary-50);

  &:hover {
    background-color: var(--accent-primary-100);
    text-decoration: underline 2px solid;
  }
`;

export default StyledSetupFinished;
