import styled from "styled-components";

const StyledFormCheckboxLabel = styled.label`
  font-size: 1.4rem;
  color: var(--text-primary-300);
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  user-select: none;

  input[type="checkbox"] {
    display: none;
  }

  span {
    position: relative;
    padding-left: 28px;
    transition: color 0.3s ease, opacity 0.3s ease;
    color: var(--text-primary-300);
    opacity: 0.7;
  }

  // Square
  span::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    border: 1px solid var(--text-primary-300);
    background-color: var(--background-secondary-500);
    border-radius: 4px;
    transition: all 0.3s ease;
  }

  // Checkmark
  input[type="checkbox"]:checked + span::after {
    content: "";
    position: absolute;
    left: 7px;
    top: 3px;
    width: 6px;
    height: 12px;
    border: solid var(--background-surface-500);
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    transition: all 0.3s ease;
    opacity: 1;
  }

  input[type="checkbox"] + span::after {
    content: "";
    position: absolute;
    left: 7px;
    top: 3px;
    width: 6px;
    height: 12px;
    border: solid var(--background-surface-500);
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    transition: all 0.3s ease;
    opacity: 0;
  }

  // Children color transition
  input[type="checkbox"]:checked + span {
    color: var(--background-surface-500);
    opacity: 1;
  }
`;

function FormCheckboxLabel({ children, htmlFor }) {
  return (
    <StyledFormCheckboxLabel htmlFor={htmlFor}>
      {children}
    </StyledFormCheckboxLabel>
  );
}

export default FormCheckboxLabel;
