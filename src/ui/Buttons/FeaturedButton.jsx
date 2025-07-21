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
};

const StyledFeaturedButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: var(--text-dark-500);
  color: var(--text-primary-300);
  border: 1px solid var(--border-primary-300);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);

  /* Apply size styles based on the size prop */
  ${(props) => sizes[props.size || "medium"]}

  &:hover {
    background-color: var(--text-primary-300);
    color: var(--text-dark-500);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-color: var(--text-primary-400);
  }

  &:active {
    background-color: var(--text-primary-300);
    color: var(--text-dark-500);
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: var(--text-dark-500);
    color: var(--text-primary-300);
  }
`;

const FeaturedButton = ({ children, onClick, ...props }) => (
  <StyledFeaturedButton onClick={onClick} {...props}>
    {children}
  </StyledFeaturedButton>
);

export default FeaturedButton;
