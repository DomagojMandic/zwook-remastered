import StyledFeaturedCard from "../ui/FeaturedSection/StyledFeaturedSection";

/**
 * Function to render each featured item card - render props pattern
 * @param {object} item - The featured media item (album/artist/song)
 * @returns {JSX.Element} Featured card element
 */
export function renderFeaturedItem(item) {
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
