import StyledContentHeader from "./StyledContentHeader";
import useMoveBack from "../../hooks/useMoveBack";
import FeaturedButton from "../Buttons/FeaturedButton";
import SaveButton from "../Buttons/SaveButton";

function ContentHeader({ title, createButtonText, onCreateClick }) {
  const moveBack = useMoveBack();

  return (
    <StyledContentHeader>
      <StyledContentHeader.TopRow>
        <FeaturedButton onClick={moveBack} size="medium">
          Back
        </FeaturedButton>
        {createButtonText && (
          <SaveButton onClick={onCreateClick} size="medium">
            {createButtonText}
          </SaveButton>
        )}
      </StyledContentHeader.TopRow>
      <StyledContentHeader.Title>{title}</StyledContentHeader.Title>
    </StyledContentHeader>
  );
}

export default ContentHeader;
