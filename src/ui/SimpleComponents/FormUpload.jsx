import styled from "styled-components";
import { IoCloudUploadOutline } from "react-icons/io5";
import { forwardRef } from "react";

const StyledFormUpload = styled.label`
  width: 100%;
  height: 100%;
  border: 1px solid var(--border-primary-300);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  color: var(--text-secondary-300);
  gap: 1rem;
  font-size: 1.5rem;
`;

StyledFormUpload.Input = styled.input.attrs((props) => ({
  type: "file",
  accept: props.accept || ".png, .jpg, .jpeg",
}))`
  display: none;
`;

StyledFormUpload.IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.2rem;
  height: 3.2rem;
  color: var(--text-secondary-300);
  font-size: 1.8rem;
  border-radius: 5px;
  padding: 0.5rem;
  border: 1px solid var(--border-primary-300);
`;

StyledFormUpload.Description = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-size: 1.4rem;
  color: var(--text-primary-300);
`;

const FormUpload = forwardRef(({ accept, id, ...props }, ref) => {
  return (
    <>
      <StyledFormUpload htmlFor={id} ref={ref}>
        <StyledFormUpload.Input accept={accept} id={id} {...props} />
        <StyledFormUpload.IconWrapper>
          <IoCloudUploadOutline />
        </StyledFormUpload.IconWrapper>
        <StyledFormUpload.Description>
          <span style={{ color: "var(--text-brand-500)" }}>
            Click to upload
          </span>
          or drag and drop
        </StyledFormUpload.Description>
        <p>SVG, PNG, JPEG, TIFF or GIF</p>
      </StyledFormUpload>
    </>
  );
});

export default FormUpload;
