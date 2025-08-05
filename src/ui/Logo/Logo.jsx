import logoImg from "../../assets/logo/Logo.png";
import styled from "styled-components";

const StyledLogo = styled.img`
  width: 100%;
  max-width: 187px;
  height: auto;
  margin-top: 1rem;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  object-fit: contain;
  display: block;

  @media (max-width: 991px) {
    display: none;
  }
`;

function Logo() {
  return <StyledLogo src={logoImg} alt="Logo image" />;
}

export default Logo;
