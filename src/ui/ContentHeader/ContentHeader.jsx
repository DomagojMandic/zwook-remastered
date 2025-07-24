import StyledContentHeader from "./StyledContentHeader";
import useMoveBack from "../../hooks/useMoveBack";
import FeaturedButton from "../Buttons/FeaturedButton";
import SaveButton from "../Buttons/SaveButton";

function ContentHeader({ title, type, showSaveButton = true }) {
  const moveBack = useMoveBack();

  return (
    <StyledContentHeader>
      <StyledContentHeader.TopRow>
        <FeaturedButton onClick={moveBack} size="medium">
          Back
        </FeaturedButton>

        {showSaveButton && (
          <SaveButton size="medium">
            {type === "artist" && "Create Artist"}
            {type === "album" && "Create Album"}
          </SaveButton>
        )}
      </StyledContentHeader.TopRow>
      <StyledContentHeader.Title>{title}</StyledContentHeader.Title>
    </StyledContentHeader>
  );
}

export default ContentHeader;
