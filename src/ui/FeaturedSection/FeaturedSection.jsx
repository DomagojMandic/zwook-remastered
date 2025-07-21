import StyledFeaturedCard from "./StyledFeaturedSection";

import useDragToScroll from "../../hooks/useDragToScroll";
import SkeletonCardComponent from "./SkeletonCardComponent";
import { useFeaturedSection } from "../../contexts/FeaturedSectionContext";

function FeaturedSection() {
  const { items, isLoading, isSuccess, title, buttons, renderItem } =
    useFeaturedSection();

  const ref = useDragToScroll();

  // Used for rendering skeleton cards before the data is loaded
  // This is a fixed number, but could be dynamic based on screen size
  const skeletonCount = 8;

  function renderSkeletonItems() {
    return Array.from({ length: skeletonCount }).map((_, index) => (
      <SkeletonCardComponent key={`skeleton-${index}`} />
    ));
  }

  console.log(items);

  return (
    <StyledFeaturedCard>
      <StyledFeaturedCard.TitleWrapper>
        <StyledFeaturedCard.Title>{title}</StyledFeaturedCard.Title>
        {buttons.length > 0 && (
          <StyledFeaturedCard.ButtonWrapper>
            {buttons.map((buttonComponent) => {
              return buttonComponent;
            })}
          </StyledFeaturedCard.ButtonWrapper>
        )}
      </StyledFeaturedCard.TitleWrapper>
      <StyledFeaturedCard.ItemWrapper ref={ref}>
        {isLoading && renderSkeletonItems()}
        {isSuccess && items?.map(renderItem)}
      </StyledFeaturedCard.ItemWrapper>
    </StyledFeaturedCard>
  );
}

export default FeaturedSection;
