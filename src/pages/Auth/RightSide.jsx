import styled from "styled-components";

import ozzyOsbourne from "../../assets/register-login/ozzy-osbourne.jpg";
import threeDaysGrace from "../../assets/register-login/three-days-grace.jpg";
import frame from "../../assets/register-login/Frame.png";
import login from "../../assets/register-login/login.jpg";

import StyledLogin from "./StyledLogin";
import MockCard from "../../ui/SimpleComponents/MockCard";

const FloatingWrapper = styled.div`
  position: ${(props) => props.$position || "relative"};
  top: ${(props) => props.$top || "0"};
  left: ${(props) => props.$left || "0"};
  right: ${(props) => props.$right || "auto"};
  bottom: ${(props) => props.$bottom || "auto"};
  transform: ${(props) => props.$rotate || "none"};
  z-index: ${(props) => props.$zIndex || "auto"};

  margin: 0;
  padding: 0;
`;

function RightSide() {
  return (
    <StyledLogin.Right>
      <FloatingWrapper
        $zIndex="1000"
        $position="absolute"
        $top="35vh"
        $left="auto"
        $bottom="auto"
        $right="9.4vw"
      >
        <MockCard>
          <MockCard.Figure>
            <MockCard.Image src={ozzyOsbourne} alt="Ozzy Osbourne" />
            <MockCard.ItemTitle>Ozzy Osbourne</MockCard.ItemTitle>
          </MockCard.Figure>
        </MockCard>
      </FloatingWrapper>

      <FloatingWrapper
        $position="absolute"
        $zIndex="1000"
        $top="auto"
        $left="8vw"
        $bottom="20vh"
        $right="auto"
      >
        <MockCard>
          <MockCard.Figure>
            <MockCard.Image src={threeDaysGrace} alt="Three Days Grace" />
            <MockCard.ItemTitle>Three Days Grace</MockCard.ItemTitle>
          </MockCard.Figure>
        </MockCard>
      </FloatingWrapper>

      <FloatingWrapper
        $position="absolute"
        $top="-3.4vw"
        $left="0"
        $bottom="auto"
        $right="auto"
      >
        <img src={frame} alt="Frame" />
      </FloatingWrapper>

      <FloatingWrapper
        $position="absolute"
        $top="16vw"
        $left="auto"
        $bottom="auto"
        $right="-3.1vw"
        $rotate="rotate(180deg)"
      >
        <img src={frame} alt="Frame" />
      </FloatingWrapper>

      <FloatingWrapper
        $position="fixed"
        $top="auto"
        $left="auto"
        $bottom="-120px"
        $right="0"
      >
        <img
          src={login}
          alt="Dashboard"
          style={{
            height: "clamp(40vh, 65rem, 70vh)",

            minWidth: "40vw",

            objectFit: "contain",
            marginLeft: "2.5vw", // 4rem ≈ 2.5vw
            display: "block",
          }}
        />
      </FloatingWrapper>
    </StyledLogin.Right>
  );
}

export default RightSide;
