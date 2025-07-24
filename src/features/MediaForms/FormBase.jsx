import React from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 60dvh;
  max-width: 100%;
  margin: 1rem 3rem;
  padding: 2.5rem;
  background-color: var(--background-secondary-500);
  border-radius: 12px;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.07);
`;

/**

 */
const FormBase = ({ onSubmit, children, ...props }) => {
  return (
    <StyledForm onSubmit={onSubmit} {...props}>
      {children}
    </StyledForm>
  );
};

export default FormBase;
