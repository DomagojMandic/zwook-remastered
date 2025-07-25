import StyledContentHeader from "./StyledContentHeader";
import useMoveBack from "../../hooks/useMoveBack";
import FeaturedButton from "../Buttons/FeaturedButton";
import SaveButton from "../Buttons/SaveButton";
import { useNavigate } from "react-router";

function ContentHeader({ title, type, showSaveButton = true }) {
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  function handleNavigate(type) {
    switch (type) {
      case "artist":
        navigate("/create/artist");
        break;
      case "album":
        navigate("/create/album");
        break;
      case "song":
        navigate("/create/song");
        break;
      default:
        return null;
    }
  }

  return (
    <StyledContentHeader>
      <StyledContentHeader.TopRow>
        <FeaturedButton onClick={moveBack} size="medium">
          Back
        </FeaturedButton>

        {showSaveButton && (
          <SaveButton size="medium" onClick={() => handleNavigate(type)}>
            {type === "artist" && "Create Artist"}
            {type === "album" && "Create Album"}
            {type === "song" && "Create Song"}
          </SaveButton>
        )}
      </StyledContentHeader.TopRow>
      <StyledContentHeader.Title>{title}</StyledContentHeader.Title>
    </StyledContentHeader>
  );
}

export default ContentHeader;
