import styled from "styled-components";

const StyledContentHeader = styled.div`
  margin: 3rem 3.5rem 2rem 3.5rem;
`;

StyledContentHeader.TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

StyledContentHeader.Title = styled.h1`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--text-primary-500);
  margin: 2.5rem 0 1rem 0;
  line-height: 1.2;
`;

export default StyledContentHeader;
