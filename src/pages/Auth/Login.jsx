import { useForm } from "react-hook-form";
import { Link } from "react-router";

import StyledLogin from "./StyledLogin";
import Logo from "../../ui/Logo/Logo";
import SaveButton from "../../ui/Buttons/SaveButton";
import StyledHorizontalLine from "../../ui/SimpleComponents/HorizontalLine";
import FeaturedButton from "../../ui/Buttons/FeaturedButton";
import RightSide from "./RightSide";

import FormBase, { FormRow } from "../../features/MediaForms/FormBase";
import FormInputWIcon from "../../ui/SimpleComponents/FormInputWIcon";

import { useAuth } from "../../contexts/AuthContext";
import { onError } from "../../utils/formErrors";
import { cleanString } from "../../helpers/helpers";

function Login() {
  const { register, handleSubmit } = useForm();
  const { formConfig, loginUser, user } = useAuth();
  const { form, layout, fields } = formConfig || {};

  function onSubmit(data) {
    const { email, password } = data;
    const cleanEmail = cleanString(email);

    loginUser({ cleanEmail, password });
  }

  return (
    <StyledLogin>
      <StyledLogin.Left>
        <FormBase
          $gridColumnAreas={layout.gridColumnAreas}
          $gridColumnAreasResponsive={layout.gridTemplateAreasResponsive}
          $width={layout.width}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <FormRow $area="logo">
            <Logo />
          </FormRow>

          <FormRow $area="register">
            <StyledLogin.WelcomeTitle>{form.title}</StyledLogin.WelcomeTitle>
            <StyledLogin.WelcomeText>
              {form.subtitle}{" "}
              <Link
                to={form.linkTo}
                style={{ color: "var(--text-primary-300)" }}
              >
                {form.linkText}
              </Link>
            </StyledLogin.WelcomeText>
          </FormRow>

          {/* Dinamički renderuj sva polja */}
          {fields.map((field) => {
            const { validation, name, icon, type, placeholder, area } = field;
            return (
              <FormRow key={name} $area={area}>
                <FormInputWIcon
                  icon={icon}
                  type={type}
                  placeholder={placeholder}
                  {...register(name, validation)}
                />
              </FormRow>
            );
          })}

          <FormRow $area="login">
            <SaveButton>{form.buttonText}</SaveButton>
          </FormRow>

          <FormRow $area="other" $direction="row" $alignItems="center">
            <StyledHorizontalLine />
            <p style={{ marginLeft: "1.5rem", marginRight: "1.5rem" }}>or</p>
            <StyledHorizontalLine />
          </FormRow>

          <FormRow $area="google">
            <FeaturedButton>{form.googleButtonText}</FeaturedButton>
          </FormRow>
        </FormBase>
      </StyledLogin.Left>
      <RightSide />
    </StyledLogin>
  );
}

export default Login;
