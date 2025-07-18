import StyledFeaturedCard from "./StyledFeaturedSection";

import useDragToScroll from "../../hooks/useDragToScroll";
import SkeletonCardComponent from "./SkeletonCardComponent";
import { useFeaturedSection } from "../../contexts/FeaturedSectionContext";

function FeaturedSection() {
  const { items, isLoading, isSuccess, title, buttons } = useFeaturedSection();

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

  /* 
  Used for rendering each item in the featured section when not loading 
  Because it is used for rendering dynamic types of media, it should always be the
  same format.
    */
  function renderFeaturedItem(item) {
    return (
      <StyledFeaturedCard.Item
        to={`/media/${item.type}/${item.id}`}
        key={`${item.type}-${item.id}`}
      >
        <StyledFeaturedCard.Figure>
          <StyledFeaturedCard.Image src={item.cover_url} alt={item.title} />
          <StyledFeaturedCard.ItemTitle>
            {/* Span is used to trigger the scroll animation */}
            <StyledFeaturedCard.AnimationSpan
              data-overflow={item.title.length > 19}
            >
              {item.title}
            </StyledFeaturedCard.AnimationSpan>
          </StyledFeaturedCard.ItemTitle>
        </StyledFeaturedCard.Figure>
      </StyledFeaturedCard.Item>
    );
  }

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
        {isSuccess && items?.map(renderFeaturedItem)}
      </StyledFeaturedCard.ItemWrapper>
    </StyledFeaturedCard>
  );
}

export default FeaturedSection;
