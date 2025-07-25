import styled from "styled-components";
import {
  IoCloudUploadOutline,
  IoClose,
  IoCheckmarkCircle,
} from "react-icons/io5";
import { useState } from "react";

const StyledFormUpload = styled.label`
  min-height: 12rem;
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
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--background-surface-500);
    background-color: var(--background-secondary-400);
  }

  &:hover span {
    color: var(--background-surface-500);
  }

  ${(props) =>
    props.$hasFile &&
    `
    border-color: var(--success-color, #22c55e);
    border-style: solid;
    background-color: var(--success-bg, rgba(34, 197, 94, 0.1));
  `}
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

  ${(props) =>
    props.$hasFile &&
    `
    background-color: var(--success-color, #22c55e);
    color: white;
  `}
`;

StyledFormUpload.LabelText = styled.span`
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--text-secondary-300);
  transition: all 0.3s ease;

  ${(props) =>
    props.$hasFile &&
    `
    color: var(--success-color, #22c55e);
  `}
`;

StyledFormUpload.Description = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary-400);
  text-align: center;
  margin: 0;
`;

const FilePreview = styled.div`
  min-height: 12rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  background-color: var(--background-secondary-300);
  border-radius: 12px;
  border: 2px solid var(--border-primary-300);

  ${(props) =>
    !props.$hasFile &&
    `
    border-style: dashed;
    opacity: 0.5;
  `}
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 7.8rem;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid var(--border-primary-300);
`;

const FileInfo = styled.div`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-align: center;
  width: 100%;
`;

const FileName = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--text-primary-300);
  margin: 0 0 0.5rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileSize = styled.p`
  font-size: 1rem;
  color: var(--text-secondary-400);
  margin: 0 0 1rem 0;
`;

const RemoveButton = styled.button`
  background: transparent;
  align-content: center;
  border: none;
  color: var(--text-secondary-400);
  font-size: 1.8rem;
  line-height: 1;
  cursor: pointer;
  padding: 0.5rem 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--background-secondary-500);
    color: var(--background-surface-500);
  }
`;

const EmptyPreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: var(--text-secondary-400);
  font-size: 1.1rem;
`;

function FormUploadMedia({
  accept,
  id = "upload",
  label = "Click to upload",
  description = "SVG, PNG, JPEG, TIFF or GIF",
  onChange,
  multiple = false,
  value,
}) {
  const [previewUrl, setPreviewUrl] = useState(null);

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Create preview URL for images
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    }

    // Call parent onChange
    onChange(e);
  };

  // Handle file removal
  const handleRemoveFile = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Clean up preview URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }

    // Create synthetic event to clear the file
    const syntheticEvent = {
      target: {
        files: [],
      },
    };
    onChange(syntheticEvent);
  };

  const hasFile = value && value.name;
  const isImage = hasFile && value.type.startsWith("image/");

  return (
    <>
      <StyledFormUpload htmlFor={id} $hasFile={hasFile}>
        <StyledFormUpload.Input
          id={id}
          accept={accept}
          onChange={handleFileChange}
          multiple={multiple}
        />

        <StyledFormUpload.IconWrapper $hasFile={hasFile}>
          {hasFile ? <IoCheckmarkCircle /> : <IoCloudUploadOutline />}
        </StyledFormUpload.IconWrapper>

        <StyledFormUpload.LabelText $hasFile={hasFile}>
          {hasFile
            ? "File uploaded successfully!"
            : `${label} or drag and drop`}
        </StyledFormUpload.LabelText>

        {!hasFile && (
          <StyledFormUpload.Description>
            {description}
          </StyledFormUpload.Description>
        )}
      </StyledFormUpload>

      <FilePreview $hasFile={hasFile}>
        {hasFile ? (
          <>
            {isImage && previewUrl && (
              <PreviewImage src={previewUrl} alt="Preview" />
            )}

            <FileInfo>
              <FileName title={value.name}>{value.name}</FileName>
              <FileSize>{formatFileSize(value.size)}</FileSize>
            </FileInfo>

            <RemoveButton type="button" onClick={handleRemoveFile}>
              <IoClose />
            </RemoveButton>
          </>
        ) : (
          <EmptyPreview>
            <IoCloudUploadOutline size={48} />
            <span>File preview will appear here</span>
          </EmptyPreview>
        )}
      </FilePreview>
    </>
  );
}

export default FormUploadMedia;
