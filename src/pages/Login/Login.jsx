import styled from "styled-components";
import MockCard from "../../ui/SimpleComponents/MockCard";
import StyledLogin from "./StyledLogin";

import ozzyOsbourne from "../../assets/register-login/ozzy-osbourne.jpg";
import threeDaysGrace from "../../assets/register-login/three-days-grace.jpg";
import frame from "../../assets/register-login/Frame.png";
import login from "../../assets/register-login/login.jpg";
import Logo from "../../ui/Logo/Logo";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import FormBase, { FormRow } from "../../features/MediaForms/FormBase";
import FormInput from "../../ui/SimpleComponents/FormInput";
import FormInputWIcon from "../../ui/SimpleComponents/FormInputWIcon";

import { useForm } from "react-hook-form";
import { Link } from "react-router";
import SaveButton from "../../ui/Buttons/SaveButton";
import StyledHorizontalLine from "../../ui/SimpleComponents/HorizontalLine";
import FeaturedButton from "../../ui/Buttons/FeaturedButton";

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

const gridColumnAreas = `"logo logo"
"register register"
"email email"
"password password"
"login login"
"other other"
"google google"`;

const gridTemplateAreasResponsive = `"logo"
"register"
"email"
"password"
"login"
"other"
"google"`;

function Login() {
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <StyledLogin>
      <StyledLogin.Left>
        <FormBase
          $gridColumnAreas={gridColumnAreas}
          $gridColumnAreasResponsive={gridTemplateAreasResponsive}
          $width="max(320px, 50%)"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormRow $area="logo">
            <Logo />
          </FormRow>
          <FormRow $area="register">
            <StyledLogin.WelcomeTitle>Welcome Back</StyledLogin.WelcomeTitle>
            <StyledLogin.WelcomeText>
              Don't have an account yet ?{" "}
              <Link
                to="/"
                style={{
                  color: "var(--text-primary-300)",
                }}
              >
                Sign Up
              </Link>
            </StyledLogin.WelcomeText>
          </FormRow>
          <FormRow $area="email">
            <FormInputWIcon
              icon={MdEmail}
              type="email"
              placeholder={`Email`}
              {...register("email", { required: true })}
            />
          </FormRow>
          <FormRow $area="password">
            <FormInputWIcon
              icon={RiLockPasswordFill}
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
          </FormRow>
          <FormRow $area="login">
            <SaveButton>Login</SaveButton>
          </FormRow>
          <FormRow $area="other" $direction="row" $alignItems="center">
            <StyledHorizontalLine />
            <p style={{ marginLeft: "1.5rem", marginRight: "1.5rem" }}>or</p>
            <StyledHorizontalLine />
          </FormRow>
          <FormRow $area="google">
            <FeaturedButton>Authorize with Google</FeaturedButton>
          </FormRow>
        </FormBase>
      </StyledLogin.Left>

      {/* Right side is only for the aesthetic */}
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
    </StyledLogin>
  );
}

export default Login;
