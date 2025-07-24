import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: clamp(0.7rem, 1.8vw, 0.85rem) clamp(0.8rem, 2vw, 1rem);
  padding-left: ${(props) => props.$paddingLeft || ""};

  border: 1px solid var(--border-primary-300);
  border-radius: 8px;
  background-color: var(--background-secondary-500);
  color: var(--text-primary-300);
  font-size: clamp(1.2rem, 2.5vw, 1.4rem);
  font-family: var(--font-main);
  width: ${(props) => props.width || "clamp(25rem, 40vw, 32rem)"};
  max-width: ${(props) => props.maxWidth || "35rem"};

  &:focus {
    border-color: var(--background-surface-500);
    outline: none;
  }
`;
export default StyledInput;
