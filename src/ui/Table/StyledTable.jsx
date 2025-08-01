import styled from "styled-components";

const BasicRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 1.6rem;
  transition: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  align-items: center;

  /* Tablet adjustments */
  @media (max-width: 1024px) {
    column-gap: 1.2rem;
    padding: 0.875rem 1.5rem;
    font-size: 1.1rem;
  }

  /* Mobile - Stack some columns */
  @media (max-width: 768px) {
    grid-template-columns: ${(props) => props.$mobileColumns || "1fr"};
    column-gap: 1rem;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    row-gap: 0.5rem;
  }

  /* Small mobile */
  @media (max-width: 480px) {
    padding: 0.625rem 0.75rem;
    font-size: 0.9rem;
    column-gap: 0.75rem;
  }
`;

const StyledTable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem 3rem 3rem 3rem;
  gap: 0.5rem;
  transition: height 0.5s ease-in-out;
  overflow-x: auto;

  /* Add subtle scrollbar styling */
  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: var(--background-secondary-500);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--background-surface-300);
    border-radius: 3px;
  }

  /* Tablet */
  @media (max-width: 1024px) {
    padding: 1rem 2rem 2rem 2rem;
  }

  /* Mobile */
  @media (max-width: 768px) {
    padding: 0.75rem 1rem 1.5rem 1rem;
    gap: 0.375rem;
  }

  /* Small mobile */
  @media (max-width: 480px) {
    padding: 0.5rem 0.5rem 1rem 0.5rem;
    gap: 0.25rem;
  }
`;

StyledTable.Header = styled(BasicRow)`
  font-weight: var(--font-weight-bold);
  color: var(--text-secondary-300);
  border-bottom: 1px solid var(--border-primary-300);
  position: sticky;
  top: 0;
  background: var(--background-primary-500);
  z-index: 1;

  /* Hide less important columns on mobile */
  @media (max-width: 768px) {
    & > *:nth-child(n + 4) {
      display: ${(props) => (props.$showAllColumns ? "block" : "none")};
    }
  }

  @media (max-width: 480px) {
    & > *:nth-child(n + 3) {
      display: ${(props) => (props.$showAllColumns ? "block" : "none")};
    }
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

StyledTable.Row = styled(BasicRow)`
  font-size: 1.4rem;
  color: var(--text-primary-300);
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--background-secondary-500);
    cursor: pointer;
  }

  /* Active/pressed state for mobile */
  &:active {
    background-color: var(--background-secondary-400);
  }

  @media (max-width: 1024px) {
    font-size: 1.3rem;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    border-radius: 6px;

    /* Hide corresponding columns that are hidden in header */
    & > *:nth-child(n + 4) {
      display: ${(props) => (props.$showAllColumns ? "block" : "none")};
    }

    /* Make rows slightly taller for easier tapping */
    min-height: 48px;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;

    & > *:nth-child(n + 3) {
      display: ${(props) => (props.$showAllColumns ? "block" : "none")};
    }

    /* Even taller for small screens */
    min-height: 52px;

    /* Add subtle border for better separation on small screens */
    border: 1px solid transparent;

    &:hover {
      border-color: var(--border-primary-300);
    }
  }
`;

/* Optional: Add a mobile-specific wrapper for horizontal scroll */
StyledTable.ScrollWrapper = styled.div`
  @media (max-width: 768px) {
    overflow-x: auto;
    margin: 0 -1rem;
    padding: 0 1rem;

    /* Minimum width to prevent squashing */
    ${StyledTable} {
      min-width: 600px;
    }
  }

  @media (max-width: 480px) {
    margin: 0 -0.5rem;
    padding: 0 0.5rem;

    ${StyledTable} {
      min-width: 500px;
    }
  }
`;

/* Optional: Add a show more button for mobile */
StyledTable.ShowMoreButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: block;
    margin: 1rem auto;
    padding: 0.5rem 1rem;
    background: var(--background-surface-500);
    color: var(--text-primary-300);
    border: none;
    border-radius: 4px;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: var(--background-surface-400);
    }
  }
`;

export default StyledTable;
