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
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* Apply size styles based on the size prop */
  ${(props) => sizes[props.size || "medium"]}

  &:hover,
    &:active {
    background-color: var(--background-surface-300);
    color: var(--text-dark-500);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border-color: var(--text-dark-500);
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

function SaveButton({ children, onClick, preventDefault, ...props }) {
  return (
    <StyledSaveButton onClick={onClick} {...props}>
      {children}
    </StyledSaveButton>
  );
}

export default SaveButton;
