import { useState, useEffect, forwardRef } from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
import { IoCloudUploadOutline, IoClose } from "react-icons/io5";

const UploadContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const UploadWrapper = styled.div`
  position: relative;
  width: clamp(10rem, 30vw, 15rem);
  aspect-ratio: 1 / 1;
  border: 2px dashed var(--border-primary-300);
  border-radius: 50%;
  background-color: var(--background-primary-400);
  cursor: pointer;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  z-index: 0;
  &:hover {
    border-color: var(--background-surface-500);
  }
  &:hover div {
    opacity: 1;
  }
`;

const HiddenInput = styled.input.attrs({ type: "file", accept: "image/*" })`
  display: none;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
  font-size: 2.5rem;
  color: white;
  background-color: rgba(0, 0, 0, 0.25);
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 12.5rem;
  background: var(--border-primary-300);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 500;
  transform: translate(50%, -50%);
  &:hover {
    background: var(--background-surface-500);
  }
`;

const ImageUpload = forwardRef(function ImageUpload(
  {
    defaultValue, // URL profile image (user.cover_url)
    placeholder,
    disabled,
    name,
    control,
    rules,
  },
  ref
) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [initialImage, setInitialImage] = useState(defaultValue || null);

  // We use the useController for 3 different fields that will be derived from one input field.
  const hasNewImageController = useController({
    name: `HasNewImage`,
    control,
    defaultValue: false,
    rules,
  });

  const fileController = useController({
    name: `File`,
    control,
    defaultValue: null,
    rules,
  });

  useEffect(() => {
    setInitialImage(defaultValue || null);
  }, [defaultValue]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // We are settings 2 new properties via controller
      hasNewImageController.field.onChange(true);
      fileController.field.onChange(file);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }

    // Resetting the 2 properties via controller
    hasNewImageController.field.onChange(false);
    fileController.field.onChange(null);
  };

  const handleWrapperClick = () => {
    if (!disabled) {
      const input = document.getElementById(`${name || "image"}-upload`);
      if (input) {
        input.click();
      }
    }
  };

  const imageToShow = previewUrl || initialImage;
  const showRemoveButton = previewUrl && !disabled;

  return (
    <UploadContainer>
      <UploadWrapper onClick={handleWrapperClick}>
        <HiddenInput
          id={`${name || "image"}-upload`}
          ref={ref}
          onChange={handleFileChange}
          onBlur={hasNewImageController.field.onBlur}
          disabled={disabled}
        />
        {imageToShow && <PreviewImage src={imageToShow} alt="Image" />}
        <Overlay>
          <IoCloudUploadOutline />
        </Overlay>
        {!imageToShow && placeholder && (
          <div
            style={{
              position: "absolute",
              textAlign: "center",
              color: "#999",
              fontSize: "0.9rem",
            }}
          >
            {placeholder}
          </div>
        )}
      </UploadWrapper>
      {showRemoveButton && (
        <RemoveButton onClick={handleRemove}>
          <IoClose />
        </RemoveButton>
      )}
    </UploadContainer>
  );
});

export default ImageUpload;
