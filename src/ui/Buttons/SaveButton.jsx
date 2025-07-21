import styled from "styled-components";

const sizes = {
  small: `
    padding: 0.6rem 1rem;
    font-size: 1.1rem;
  `,
  medium: `
    padding: 0.9rem 1.3rem;
    font-size: 1.4rem;
  `,

  large: `
    padding: 1rem 2rem;
    font-size: 1.4rem;
  `,
  full: `
    padding: 1rem 2rem;
    font-size: 1.4rem;
    width: 100%;`,
};

const StyledSaveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: var(--background-surface-500);
  color: var(--text-dark-500);
  border: 1px solid var(--border-primary-300);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);

  /* Apply size styles based on the size prop */
  ${(props) => sizes[props.size || "medium"]}

  &:hover {
    background-color: var(--background-surface-300);
    color: var(--text-dark-500);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
    border-color: var(--text-dark-500);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: var(--text-dark-500);
    color: var(--text-primary-300);
    box-shadow: none;
    border-color: var(--border-primary-300);
  }
`;

function SaveButton({ children, onClick, ...props }) {
  return (
    <StyledSaveButton onClick={onClick} {...props}>
      {children}
    </StyledSaveButton>
  );
}

export default SaveButton;
