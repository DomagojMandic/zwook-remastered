import styled from "styled-components";

const gridColumnAreas = `"title        date"
    "type         navigateBtn"
    "description  description"
    "upload       upload"
    "submit       submit"`;

const StyledForm = styled.form`
  display: grid;
  grid-template-areas: ${(props) => props.$gridColumnAreas || gridColumnAreas};
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto auto auto auto;
  gap: 1.5rem;
  width: ${(props) => props.$width || "min(90%, 850px)"};
  margin-inline: auto;
  padding: 2.5rem;
  background-color: var(--background-secondary-500);
  border: 1px solid var(--border-primary-300);

  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.07);

  @media (max-width: 768px) {
    grid-template-areas: ${(props) =>
      props.$gridColumnAreasResponsive ||
      `"title"
      "date"
      "type"
      "navigateBtn"
      "description"
      "upload"
      "submit"`};
    grid-template-columns: 1fr;
    grid-template-rows: repeat(7, auto);
  }
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.$direction ? props.$direction : "column"};
  gap: 0.5rem;
  grid-area: ${(props) => props.$area};
  align-items: ${(props) => (props.$alignItems ? props.$alignItems : "")};
  align-self: center;
  ${(props) => {
    switch (props.$area) {
      case "description":
      case "submit":
        return `align-self: stretch;`;
      case "logo":
        return `
          align-self: center;
          align-items: center; 
          justify-content: center; 
        `;
      default:
        return `align-self: center;`;
    }
  }}
`;

export const UploadRow = styled.div`
  grid-area: upload;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const FormBase = ({
  onSubmit,
  children,
  $gridColumnAreas,
  $width,
  $gridColumnAreasResponsive,
}) => {
  return (
    <StyledForm
      onSubmit={onSubmit}
      $gridColumnAreas={$gridColumnAreas}
      $width={$width}
      $gridColumnAreasResponsive={$gridColumnAreasResponsive}
    >
      {children}
    </StyledForm>
  );
};

export default FormBase;
