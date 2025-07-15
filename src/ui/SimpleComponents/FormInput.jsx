import styled from "styled-components";

const StyledFormInput = styled.input`
  font-size: 1.4rem;
  width: 100%;
  background-color: var(--background-secondary-500);
  color: var(--text-primary-300);
  outline: none;
  border: 1px solid var(--border-primary-300);
  border-radius: 8px;
  padding: 1rem;
  transition: box-shadow 0.3s, border-color 0.3s;

  &:focus {
    border-color: var(--background-surface-500);
    box-shadow: 0 0 0 1px var(--background-surface-500);
  }
`;

function FormInput({ type = "text", placeholder = "", id }) {
  return <StyledFormInput type={type} placeholder={placeholder} id={id} />;
}

export default FormInput;
