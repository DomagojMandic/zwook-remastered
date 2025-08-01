import styled from "styled-components";

const StyledMain = styled.main`
  background-color: var(--text-dark-500);
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  padding-bottom: 9rem;

  @media (max-width: 991px) {
    padding-top: 5rem;
    padding-bottom: 8rem;
  }

  @media (max-width: 768px) {
    padding-top: 5rem;
    padding-bottom: 13rem;
  }
`;
export default StyledMain;
