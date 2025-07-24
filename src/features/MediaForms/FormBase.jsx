import styled from "styled-components";

const StyledForm = styled.form`
  display: grid;
  grid-template-areas:
    "title        date"
    "type       navigateBtn"
    "description    upload"
    "submit       submit";
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  max-width: 960px;
  margin: 2rem auto;
  padding: 2.5rem;
  background-color: var(--background-secondary-500);
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.07);

  @media (max-width: 768px) {
    grid-template-areas:
      "title"
      "date"
      "type"
      "navigateBtn"
      "upload"
      "description"
      "submit";
    grid-template-columns: 1fr;
  }
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  grid-area: ${(props) => props.area};
  align-self: center;
`;

const FormBase = ({ onSubmit, children }) => {
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
};

export default FormBase;
