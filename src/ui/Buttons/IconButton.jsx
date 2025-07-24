import styled from "styled-components";

const StyledIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: 50%;
  padding: 0.4rem;
  font-size: clamp(1rem, 3vw - 0.5rem, 3rem);
  cursor: pointer;
  transition: background 0.2s;
  color: inherit;
  &:hover {
    background: rgba(0, 0, 0, 0.07);
  }
`;

const IconButton = ({ children, ...props }) => (
  <StyledIconButton {...props}>{children}</StyledIconButton>
);

export default IconButton;
