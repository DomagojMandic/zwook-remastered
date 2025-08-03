import styled from "styled-components";

const StyledError = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem;
    flex-direction: column;
    height: 85dvh;
  }
`;

StyledError.Message = styled.p`
  font-size: 1.5rem;
  color: var(--text-primary-500);
  text-align: center;
  margin: 1rem;
  padding: 1rem;
  background-color: var(--background-secondary-500);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export default StyledError;
