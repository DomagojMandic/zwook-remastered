import StyledBanner from "./StyledBanner";
import { TfiArrowTopRight } from "react-icons/tfi";

function Banner() {
  return (
    <StyledBanner
      to="/home"
      $backgroundImage="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80"
    >
      <StyledBanner.Container>
        <StyledBanner.Icon size="4rem">
          <TfiArrowTopRight />
        </StyledBanner.Icon>
        <StyledBanner.Title>Welcome to Zwook</StyledBanner.Title>
        <StyledBanner.Description>
          Discover the best content and connect with others.
        </StyledBanner.Description>
      </StyledBanner.Container>
    </StyledBanner>
  );
}

export default Banner;
