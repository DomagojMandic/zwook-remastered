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
`;

export default StyledSidebar;
