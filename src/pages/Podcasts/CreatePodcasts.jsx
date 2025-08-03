import FeaturedButton from "../../ui/Buttons/FeaturedButton";
import SaveButton from "../../ui/Buttons/SaveButton";
import StyledFeaturedSection from "../../ui/FeaturedSection/StyledFeaturedSection";
import styled from "styled-components";

import formInputs from "../../data/podcastInputs";
import { createInput } from "../../services/podcastForm";
import FormUpload from "../../ui/SimpleComponents/FormUpload";
import { FILE_TYPE_CONFIGS } from "../../data/formUploadFormat";
import { useRef } from "react";

const StyledFormContainer = styled.div`
  background-color: var(--background-secondary-500);
  display: flex;
  flex-direction: column;
  flex-grow: ${(props) => props.$flexGrow || 0};
  font-size: clamp(1.2rem, 2vw, 1.6rem);
  border: 1px solid var(--border-primary-300);
  border-radius: 12px;
  width: clamp(35rem, 40vw, 52rem);
  height: clamp(35rem, 40vw, 52rem);
  max-height: 73rem;
  padding: 2rem 2.5rem;
  box-sizing: border-box;
  gap: 1.5rem;

  @media (max-width: 1230px) {
    flex-wrap: ${(props) => props.$flexWrap || "nowrap"};
  }
`;

// Used in podcastForm.jsx
export const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`;

function CreatePodcasts() {
  const fileInputRef = useRef(null);

  function handleFileInputClick(e) {
    e.preventDefault();

    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  return (
    <form>
      <StyledFeaturedSection style={{ marginTop: "1rem" }}>
        <StyledFeaturedSection.TitleWrapper>
          <StyledFeaturedSection.Title size="3.3rem">
            Create New Podcast
          </StyledFeaturedSection.Title>
          <StyledFeaturedSection.ButtonWrapper>
            <FeaturedButton size="large">Cancel</FeaturedButton>
            <SaveButton size="large">Create</SaveButton>
          </StyledFeaturedSection.ButtonWrapper>
        </StyledFeaturedSection.TitleWrapper>
        <StyledFeaturedSection.ItemWrapper wrap="wrap">
          <StyledFormContainer $flexGrow={5} $flexWrap="wrap">
            {formInputs.map(createInput)}
          </StyledFormContainer>
          <StyledFormContainer $flexShrink={2}>
            <FormUpload
              accept={FILE_TYPE_CONFIGS.image.accept}
              id="formImageUpload"
              ref={fileInputRef}
            />
            <SaveButton size="full" onClick={handleFileInputClick}>
              Upload Image
            </SaveButton>
          </StyledFormContainer>
        </StyledFeaturedSection.ItemWrapper>
      </StyledFeaturedSection>
    </form>
  );
}

export default CreatePodcasts;
