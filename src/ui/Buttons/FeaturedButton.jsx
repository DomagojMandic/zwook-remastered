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
  transition: background-color 0.3s, color 0.3s;

  /* Apply size styles based on the size prop */
  ${(props) => sizes[props.size || "medium"]}

  &:hover,
  &:active {
    background-color: var(--text-primary-300);
    color: var(--text-dark-500);
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
