import styled from "styled-components";
import { forwardRef } from "react";

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledFormInputWIcon = styled.input`
  font-size: clamp(1.2rem, 2.5vw, 1.4rem);
  width: 100%;
  background-color: var(--background-secondary-500);
  color: var(--text-primary-300);
  outline: none;
  border: 1px solid var(--border-primary-300);
  border-radius: 8px;
  padding: clamp(0.8rem, 2vw, 1rem);
  padding-left: ${(props) =>
    props.$hasIcon ? "clamp(2.8rem, 6vw, 3.2rem)" : "clamp(0.8rem, 2vw, 1rem)"};
  transition: box-shadow 0.3s, border-color 0.3s;

  &:focus {
    border-color: var(--background-surface-500);
    box-shadow: 0 0 0 1px var(--background-surface-500);
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  left: clamp(0.8rem, 2vw, 1rem);
  color: var(--text-secondary-300);
  pointer-events: none;
  z-index: 1;
  display: flex;
  align-items: center;
`;

const FormInputWIcon = forwardRef(
  ({ type = "text", placeholder = "", id, icon: Icon, ...props }, ref) => {
    return (
      <InputWrapper>
        {Icon && (
          <IconWrapper>
            <Icon size={20} />
          </IconWrapper>
        )}
        <StyledFormInputWIcon
          ref={ref}
          type={type}
          placeholder={placeholder}
          id={id}
          $hasIcon={!!Icon}
          {...props}
        />
      </InputWrapper>
    );
  }
);

export default FormInputWIcon;
