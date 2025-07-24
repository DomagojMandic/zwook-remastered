// FormUploadMedia.jsx
import styled from "styled-components";
import { IoCloudUploadOutline } from "react-icons/io5";
import PropTypes from "prop-types";

const StyledFormUpload = styled.label`
  width: 100%;
  padding: 2rem;
  border: 2px dashed var(--border-primary-300);
  border-radius: 12px;
  background-color: var(--background-primary-400);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease;

  &:hover {
    border-color: var(--background-surface-500);
    background-color: var(--background-secondary-400);
  }

  &:hover span {
    color: var(--background-surface-500);
  }
`;

StyledFormUpload.Input = styled.input.attrs((props) => ({
  type: "file",
  accept: props.accept || ".png, .jpg, .jpeg",
  "aria-label": "Upload file",
}))`
  display: none;
`;

StyledFormUpload.IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background-secondary-300);
  color: var(--text-secondary-300);
  font-size: 2rem;
  border-radius: 50%;
  width: 4.5rem;
  height: 4.5rem;
`;

StyledFormUpload.LabelText = styled.span`
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--text-secondary-300);
  transition: all 0.3s ease;
`;

StyledFormUpload.Description = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary-400);
  text-align: center;
  margin: 0;
`;

function FormUploadMedia({
  accept,
  id = "upload",
  label = "Click to upload",
  description = "SVG, PNG, JPEG, TIFF or GIF",
  onChange,
  multiple = false,
}) {
  return (
    <StyledFormUpload htmlFor={id}>
      <StyledFormUpload.Input
        id={id}
        accept={accept}
        onChange={onChange}
        multiple={multiple}
      />
      <StyledFormUpload.IconWrapper>
        <IoCloudUploadOutline />
      </StyledFormUpload.IconWrapper>
      <StyledFormUpload.LabelText>
        {label} or drag and drop
      </StyledFormUpload.LabelText>
      <StyledFormUpload.Description>{description}</StyledFormUpload.Description>
    </StyledFormUpload>
  );
}

export default FormUploadMedia;
