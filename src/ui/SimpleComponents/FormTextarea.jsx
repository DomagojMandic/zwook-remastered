import styled from "styled-components";
import { forwardRef } from "react";

const StyledFormTextarea = styled.textarea`
  font-size: clamp(1.2rem, 2.5vw, 1.4rem);
  width: 100%;
  background-color: var(--background-secondary-500);
  color: var(--text-primary-300);
  outline: none;
  border: 1px solid var(--border-primary-300);
  border-radius: 8px;
  padding: clamp(0.8rem, 2vw, 1rem);
  transition: box-shadow 0.3s, border-color 0.3s;
  resize: none;
  height: clamp(10rem, 15vw, 12.5rem);

  &:focus {
    border-color: var(--background-surface-500);
    box-shadow: 0 0 0 1px var(--background-surface-500);
  }
`;

const FormTextarea = forwardRef(({ placeholder = "", id, ...props }, ref) => (
  <StyledFormTextarea ref={ref} placeholder={placeholder} id={id} {...props} />
));

export default FormTextarea;
