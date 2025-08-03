import useMoveBack from "../../hooks/useMoveBack";
import FeaturedButton from "../../ui/Buttons/FeaturedButton";
import StyledError from "./StyledError";

function ErrorPage({
  message = " Page not found. Please go back or check the URL",
}) {
  const moveBack = useMoveBack();
  return (
    <StyledError>
      <FeaturedButton onClick={moveBack}>Go Back</FeaturedButton>
      <StyledError.Message>{message} </StyledError.Message>
    </StyledError>
  );
}

export default ErrorPage;
