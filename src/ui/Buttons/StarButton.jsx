import styled from "styled-components";

const StyledStarButton = styled.button`
  background: transparent;
  border: none;
  font-size: ${(props) => props.size || "20px"};
  cursor: pointer;
  color: ${(props) =>
    props.$isActive
      ? "var(--background-surface-500)"
      : "var(--text-secondary-300)"};
  transition: color 0.1s ease;
  padding: 2px;
  outline: none;
  font-family: inherit;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }
`;

function StarButton({
  isActive,
  onClick,
  onMouseEnter,
  onMouseLeave,
  size = "20px",
}) {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };

  return (
    <StyledStarButton
      $isActive={isActive}
      size={size}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      ★
    </StyledStarButton>
  );
}

export default StarButton;
