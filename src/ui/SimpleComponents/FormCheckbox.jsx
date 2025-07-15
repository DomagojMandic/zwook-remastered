import styled from "styled-components";

const StyledFormCheckbox = styled.input`
  width: 1.4rem;
  height: 1.4rem;
  appearance: none;
  -webkit-appearance: none;
  background-color: var(--background-secondary-500);
  border: 1px solid var(--border-primary-300);
  border-radius: 0.2rem;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
`;

function FormCheckbox(props) {
  return <StyledFormCheckbox type="checkbox" {...props} />;
}

export default FormCheckbox;
