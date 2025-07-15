import styled from "styled-components";

const BasicRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 1.6rem;
  transition: none;
  padding: 1rem 2rem 1rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  align-items: center;
`;

const StyledTable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem 3rem 3rem 3rem;
  gap: 0.5rem;
  transition: height 0.5s ease-in-out;
`;

StyledTable.Header = styled(BasicRow)`
  font-weight: var(--font-weight-bold);
  color: var(--text-secondary-300);
  border-bottom: 1px solid var(--border-primary-300);
`;

StyledTable.Row = styled(BasicRow)`
  font-size: 1.4rem;
  color: var(--text-primary-300);
  border-radius: 8px;

  &:hover {
    background-color: var(--background-secondary-500);
    cursor: pointer;
  }
`;

export default StyledTable;
