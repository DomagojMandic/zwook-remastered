import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 0.85rem 1rem;
  padding-left: ${(props) => props.$paddingLeft || ""};

  border: 1px solid var(--border-primary-300);
  border-radius: 8px;
  background-color: var(--background-secondary-500);
  color: var(--text-primary-300);
  font-size: 1.4rem;
  font-family: var(--font-main);
  width: ${(props) => props.width || "32rem"};
  max-width: ${(props) => props.maxWidth || "35rem"};
  &:focus {
    border-color: var(--background-surface-500);
    outline: none;
  }
`;

export default StyledInput;
