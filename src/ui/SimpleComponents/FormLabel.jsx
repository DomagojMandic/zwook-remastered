import styled from "styled-components";

const StyledFormLabel = styled.label`
  font-size: 1.4rem;
  color: var(--text-primary-300);
  display: inline-block;
  transition: transform 0.3s ease, color 0.3s ease;
  transform-origin: left center;
  position: relative;
  cursor: pointer;

  &:has(+ input:focus),
  &:has(+ textarea:focus) {
    color: var(--background-surface-500);
    transform: scale(1.2) translateY(-2px);
  }
`;

function FormLabel({ children, htmlFor }) {
  return <StyledFormLabel htmlFor={htmlFor}>{children}</StyledFormLabel>;
}

export default FormLabel;
